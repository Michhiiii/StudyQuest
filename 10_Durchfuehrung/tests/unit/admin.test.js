/**
 * Unit Tests - Admin Module
 * Tests für Admin-Funktionen (UC14-UC15)
 */

describe('Admin Module - Administration Functions', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
        // Erstelle Admin User
        if (typeof UserModel !== 'undefined') {
            const admin = UserModel.create('admin@example.com', 'password123', 'Admin User');
            UserModel.authenticate('admin@example.com', 'password123');
            
            // Erstelle normale User
            UserModel.create('user1@example.com', 'password123', 'User One');
            UserModel.create('user2@example.com', 'password123', 'User Two');
        }
    });
    
    // Test 1: isAdmin() - Admin-Prüfung
    it('sollte prüfen ob User Admin ist', () => {
        const user = UserModel.getCurrentUser();
        const is_admin = AdminModel.isAdmin(user.id);
        
        expect(typeof is_admin).toBe('boolean');
    });
    
    // Test 2: getAllUsers() - Alle User abrufen (nur für Admin)
    it('sollte alle User abrufen können (Admin-Funktion)', () => {
        const user = UserModel.getCurrentUser();
        const all_users = AdminModel.getAllUsers(user.id);
        
        expect(Array.isArray(all_users)).toBeTruthy();
        expect(all_users.length).toBeGreaterThan(0);
    });
    
    // Test 3: getUserDetails() - User-Details abrufen
    it('sollte Details eines Users abrufen können', () => {
        const users = DB.get(DB.STORE_USERS);
        
        if (users && users.length > 0) {
            const admin = UserModel.getCurrentUser();
            const user_details = AdminModel.getUserDetails(admin.id, users[0].id);
            
            expect(user_details).toBeTruthy();
            expect(user_details).toHaveProperty('email');
            expect(user_details).toHaveProperty('name');
        }
    });
    
    // Test 4: disableUser() - User deaktivieren
    it('sollte User deaktivieren können', () => {
        const admin = UserModel.getCurrentUser();
        const users = DB.get(DB.STORE_USERS);
        const target_user_id = users.find(u => !u.is_admin).id;
        
        AdminModel.disableUser(admin.id, target_user_id);
        
        const user_details = AdminModel.getUserDetails(admin.id, target_user_id);
        expect(user_details.is_active).toBeFalsy();
    });
    
    // Test 5: enableUser() - User aktivieren
    it('sollte deaktivierten User wieder aktivieren können', () => {
        const admin = UserModel.getCurrentUser();
        const users = DB.get(DB.STORE_USERS);
        const target_user_id = users.find(u => !u.is_admin).id;
        
        AdminModel.disableUser(admin.id, target_user_id);
        AdminModel.enableUser(admin.id, target_user_id);
        
        const user_details = AdminModel.getUserDetails(admin.id, target_user_id);
        expect(user_details.is_active).toBeTruthy();
    });
    
    // Test 6: resetUserPassword() - User-Passwort zurücksetzen
    it('sollte User-Passwort zurücksetzen können', () => {
        const admin = UserModel.getCurrentUser();
        const users = DB.get(DB.STORE_USERS);
        const target_user = users.find(u => !u.is_admin);
        
        const reset_password = AdminModel.resetUserPassword(admin.id, target_user.id);
        
        expect(reset_password).toBeTruthy();
        expect(typeof reset_password).toBe('string');
    });
    
    // Test 7: deleteUser() - User löschen
    it('sollte User löschen können', () => {
        const admin = UserModel.getCurrentUser();
        const users = DB.get(DB.STORE_USERS);
        const target_user_id = users.find(u => !u.is_admin).id;
        
        AdminModel.deleteUser(admin.id, target_user_id);
        
        const deleted_user = DB.findUser(target_user_id);
        expect(deleted_user).toBeUndefined();
    });
    
    // Test 8: getSystemStatistics() - System-Statistiken
    it('sollte System-Statistiken abrufen können', () => {
        const admin = UserModel.getCurrentUser();
        const stats = AdminModel.getSystemStatistics(admin.id);
        
        expect(stats).toBeTruthy();
        expect(stats).toHaveProperty('total_users');
        expect(stats).toHaveProperty('total_quests');
    });
    
    // Test 9: getActivityLog() - Activity Log abrufen
    it('sollte Activity Log abrufen können', () => {
        const admin = UserModel.getCurrentUser();
        const log = AdminModel.getActivityLog(admin.id);
        
        expect(Array.isArray(log)).toBeTruthy();
    });
    
    // Test 10: createAnnouncement() - Ankündigung erstellen
    it('sollte Ankündigung erstellen können', () => {
        const admin = UserModel.getCurrentUser();
        const announcement_id = AdminModel.createAnnouncement(
            admin.id,
            'Test Ankündigung',
            'Das ist eine Test-Ankündigung'
        );
        
        expect(announcement_id).toBeTruthy();
    });
    
    // Test 11: getAnnouncements() - Ankündigungen abrufen
    it('sollte alle Ankündigungen abrufen können', () => {
        const admin = UserModel.getCurrentUser();
        AdminModel.createAnnouncement(admin.id, 'Ankündigung 1', 'Text 1');
        AdminModel.createAnnouncement(admin.id, 'Ankündigung 2', 'Text 2');
        
        const announcements = AdminModel.getAnnouncements(admin.id);
        
        expect(Array.isArray(announcements)).toBeTruthy();
        expect(announcements.length).toBeGreaterThan(0);
    });
    
    // Test 12: deleteAnnouncement() - Ankündigung löschen
    it('sollte Ankündigung löschen können', () => {
        const admin = UserModel.getCurrentUser();
        const announcement_id = AdminModel.createAnnouncement(admin.id, 'Test', 'Text');
        
        AdminModel.deleteAnnouncement(admin.id, announcement_id);
        
        const announcements = AdminModel.getAnnouncements(admin.id);
        const found = announcements.find(a => a.id === announcement_id);
        expect(found).toBeUndefined();
    });
    
    // Test 13: grantAdminRole() - Admin-Rolle vergeben
    it('sollte Admin-Rolle an User vergeben können', () => {
        const admin = UserModel.getCurrentUser();
        const users = DB.get(DB.STORE_USERS);
        const target_user_id = users.find(u => !u.is_admin).id;
        
        AdminModel.grantAdminRole(admin.id, target_user_id);
        
        const updated_user = DB.findUser(target_user_id);
        expect(updated_user.is_admin).toBeTruthy();
    });
    
    // Test 14: revokeAdminRole() - Admin-Rolle entziehen
    it('sollte Admin-Rolle entziehen können', () => {
        const admin = UserModel.getCurrentUser();
        const users = DB.get(DB.STORE_USERS);
        const target_user_id = users.find(u => !u.is_admin).id;
        
        AdminModel.grantAdminRole(admin.id, target_user_id);
        AdminModel.revokeAdminRole(admin.id, target_user_id);
        
        const updated_user = DB.findUser(target_user_id);
        expect(updated_user.is_admin).toBeFalsy();
    });
    
    // Test 15: getAuditLog() - Audit Log abrufen
    it('sollte Audit Log abrufen können', () => {
        const admin = UserModel.getCurrentUser();
        const audit_log = AdminModel.getAuditLog(admin.id);
        
        expect(Array.isArray(audit_log)).toBeTruthy();
    });
});
