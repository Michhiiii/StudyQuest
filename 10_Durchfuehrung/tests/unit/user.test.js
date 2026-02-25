/**
 * Unit Tests - User Model
 * Tests für User Management und Authentication Logic
 */

describe('User Model - User Management', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
    });
    
    // Test 1: create() - User erstellen
    it('sollte neuen User erstellen können', () => {
        const new_user = UserModel.create('test@example.com', 'password123', 'Test User');
        
        expect(new_user).toBeTruthy();
        expect(new_user.email).toBe('test@example.com');
        expect(new_user.name).toBe('Test User');
        expect(new_user.id).toBeTruthy();
    });
    
    // Test 2: create() - User-Eigenschaften
    it('sollte User mit korrekten Standard-Eigenschaften erstellen', () => {
        const new_user = UserModel.create('test@example.com', 'password123', 'Test User');
        
        expect(new_user.level).toBe(1);
        expect(new_user.xp).toBe(0);
        expect(new_user.avatar).toBe('👤');
        expect(new_user.is_active).toBeTruthy();
    });
    
    // Test 3: create() - Validierung: Fehlende Email
    it('sollte Error werfen wenn Email fehlt', () => {
        expect(() => {
            UserModel.create('', 'password123', 'Test User');
        }).toThrow('Email');
    });
    
    // Test 4: create() - Validierung: Ungültige Email
    it('sollte Error werfen bei ungültiger Email', () => {
        expect(() => {
            UserModel.create('invalid-email', 'password123', 'Test User');
        }).toThrow('Ungültige Email');
    });
    
    // Test 5: create() - Validierung: Zu kurzes Passwort
    it('sollte Error werfen wenn Passwort zu kurz ist', () => {
        expect(() => {
            UserModel.create('test@example.com', '12345', 'Test User');
        }).toThrow('mindestens 6 Zeichen');
    });
    
    // Test 6: create() - Validierung: Duplikat Email
    it('sollte Error werfen wenn Email bereits existiert', () => {
        UserModel.create('test@example.com', 'password123', 'Test User');
        
        expect(() => {
            UserModel.create('test@example.com', 'password456', 'Another User');
        }).toThrow('Email existiert bereits');
    });
    
    // Test 7: create() - Erster User ist Admin
    it('sollte ersten User als Admin erstellen', () => {
        const first_user = UserModel.create('first@example.com', 'password123', 'First User');
        
        expect(first_user.is_admin).toBeTruthy();
    });
    
    // Test 8: create() - Zweiter User ist kein Admin
    it('sollte zweiten User nicht als Admin erstellen', () => {
        UserModel.create('first@example.com', 'password123', 'First User');
        const second_user = UserModel.create('second@example.com', 'password123', 'Second User');
        
        expect(second_user.is_admin).toBeFalsy();
    });
    
    // Test 9: authenticate() - Erfolgreicher Login
    it('sollte User authentifizieren können', () => {
        UserModel.create('test@example.com', 'password123', 'Test User');
        const authenticated_user = UserModel.authenticate('test@example.com', 'password123');
        
        expect(authenticated_user).toBeTruthy();
        expect(authenticated_user.email).toBe('test@example.com');
    });
    
    // Test 10: authenticate() - Falsches Passwort
    it('sollte Error werfen bei falschem Passwort', () => {
        UserModel.create('test@example.com', 'password123', 'Test User');
        
        expect(() => {
            UserModel.authenticate('test@example.com', 'wrongpassword');
        }).toThrow('Email oder Passwort falsch');
    });
    
    // Test 11: authenticate() - Nicht existierende Email
    it('sollte Error werfen wenn User nicht existiert', () => {
        expect(() => {
            UserModel.authenticate('nonexistent@example.com', 'password123');
        }).toThrow('Email oder Passwort falsch');
    });
    
    // Test 12: authenticate() - Setzt aktuellen User
    it('sollte aktuellen User in Session setzen', () => {
        UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.authenticate('test@example.com', 'password123');
        
        const current_user = UserModel.getCurrentUser();
        expect(current_user).toBeTruthy();
        expect(current_user.email).toBe('test@example.com');
    });
    
    // Test 13: getCurrentUser() - Aktuellen User abrufen
    it('sollte aktuellen User abrufen können', () => {
        const created_user = UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.authenticate('test@example.com', 'password123');
        
        const current_user = UserModel.getCurrentUser();
        expect(current_user.id).toBe(created_user.id);
    });
    
    // Test 14: getCurrentUser() - Null wenn nicht eingeloggt
    it('sollte null zurückgeben wenn kein User eingeloggt ist', () => {
        const current_user = UserModel.getCurrentUser();
        expect(current_user).toBeNull();
    });
    
    // Test 15: logout() - Logout durchführen
    it('sollte User ausloggen können', () => {
        UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.authenticate('test@example.com', 'password123');
        UserModel.logout();
        
        const current_user = UserModel.getCurrentUser();
        expect(current_user).toBeNull();
    });
    
    // Test 16: updateProfile() - Profil aktualisieren
    it('sollte User-Profil aktualisieren können', () => {
        const user = UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.authenticate('test@example.com', 'password123');
        
        UserModel.updateProfile({ name: 'Updated Name', avatar: '👨' });
        const updated_user = UserModel.getCurrentUser();
        
        expect(updated_user.name).toBe('Updated Name');
        expect(updated_user.avatar).toBe('👨');
    });
    
    // Test 17: getProfile() - Profil abrufen
    it('sollte User-Profil abrufen können', () => {
        const user = UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.authenticate('test@example.com', 'password123');
        
        const profile = UserModel.getProfile();
        expect(profile.email).toBe('test@example.com');
        expect(profile.name).toBe('Test User');
    });
    
    // Test 18: addXP() - XP hinzufügen
    it('sollte XP zu User hinzufügen können', () => {
        const user = UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.addXP(user.id, 100);
        
        const updated_user = DB.findUser(user.id);
        expect(updated_user.xp).toBe(100);
    });
    
    // Test 19: getLevel() - Level berechnen
    it('sollte User-Level aus XP berechnen können', () => {
        const user = UserModel.create('test@example.com', 'password123', 'Test User');
        const level = UserModel.getLevel(0);
        
        expect(level).toBe(1);
    });
    
    // Test 20: changePassword() - Passwort ändern
    it('sollte Passwort ändern können', () => {
        UserModel.create('test@example.com', 'password123', 'Test User');
        UserModel.authenticate('test@example.com', 'password123');
        UserModel.changePassword('password123', 'newpassword456');
        UserModel.logout();
        
        // Neues Passwort sollte funktionieren
        const authenticated_user = UserModel.authenticate('test@example.com', 'newpassword456');
        expect(authenticated_user).toBeTruthy();
    });
});
