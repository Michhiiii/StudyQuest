/**
 * Unit Tests - DB Module
 * Tests für die Database Layer / LocalStorage Manager
 */

// Mock LocalStorage für Tests
class MockLocalStorage {
    constructor() {
        this.store = {};
    }
    
    setItem(key, value) {
        this.store[key] = value;
    }
    
    getItem(key) {
        return this.store[key] || null;
    }
    
    removeItem(key) {
        delete this.store[key];
    }
    
    clear() {
        this.store = {};
    }
}

// Simuliere localStorage für Tests
if (typeof localStorage === 'undefined') {
    global.localStorage = new MockLocalStorage();
}

describe('DB Module - Database Layer', () => {
    
    // Cleanup vor jedem Test
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
    });
    
    // Test 1: init() - Initialisierung
    it('sollte Datenbank initialisieren', () => {
        expect(localStorage.getItem('users')).toBeTruthy();
        expect(localStorage.getItem('quests')).toBeTruthy();
    });
    
    // Test 2: set() - Speichern
    it('sollte Daten speichern können', () => {
        const test_data = { id: 1, name: 'Test' };
        DB.set('test_key', test_data);
        expect(localStorage.getItem('test_key')).toBeTruthy();
    });
    
    // Test 3: get() - Abrufen
    it('sollte gespeicherte Daten abrufen können', () => {
        const test_data = { id: 1, name: 'Test User' };
        DB.set('test_key', test_data);
        const retrieved_data = DB.get('test_key');
        expect(retrieved_data).toEqual(test_data);
    });
    
    // Test 4: get() - Null wenn nicht existiert
    it('sollte null zurückgeben wenn Key nicht existiert', () => {
        const result = DB.get('non_existent_key');
        expect(result).toBeNull();
    });
    
    // Test 5: delete() - Löschen
    it('sollte Daten löschen können', () => {
        DB.set('test_key', { data: 'test' });
        DB.delete('test_key');
        expect(localStorage.getItem('test_key')).toBeNull();
    });
    
    // Test 6: findUser() - User nach ID suchen
    it('sollte User nach ID finden können', () => {
        const test_user = {
            id: 'user_123',
            email: 'test@example.com',
            name: 'Test User'
        };
        const users = [test_user];
        DB.set(DB.STORE_USERS, users);
        
        const found_user = DB.findUser('user_123');
        expect(found_user).toEqual(test_user);
    });
    
    // Test 7: findUser() - null wenn nicht gefunden
    it('sollte null zurückgeben wenn User nicht existiert', () => {
        const users = [];
        DB.set(DB.STORE_USERS, users);
        
        const found_user = DB.findUser('non_existent_id');
        expect(found_user).toBeUndefined();
    });
    
    // Test 8: findUserByEmail() - User nach Email suchen
    it('sollte User nach Email finden können', () => {
        const test_user = {
            id: 'user_123',
            email: 'test@example.com',
            name: 'Test User'
        };
        const users = [test_user];
        DB.set(DB.STORE_USERS, users);
        
        const found_user = DB.findUserByEmail('test@example.com');
        expect(found_user).toEqual(test_user);
    });
    
    // Test 9: saveUser() - Neuen User speichern
    it('sollte neuen User speichern können', () => {
        const new_user = {
            id: 'user_new_123',
            email: 'new@example.com',
            name: 'New User'
        };
        
        DB.set(DB.STORE_USERS, []);
        DB.saveUser(new_user);
        
        const users = DB.get(DB.STORE_USERS);
        expect(users).toHaveLength(1);
        expect(users[0]).toEqual(new_user);
    });
    
    // Test 10: saveUser() - Existierenden User aktualisieren
    it('sollte existierenden User aktualisieren können', () => {
        const original_user = { id: 'user_123', email: 'test@example.com', name: 'Test' };
        const updated_user = { id: 'user_123', email: 'test@example.com', name: 'Updated' };
        
        DB.set(DB.STORE_USERS, [original_user]);
        DB.saveUser(updated_user);
        
        const users = DB.get(DB.STORE_USERS);
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Updated');
    });
    
    // Test 11: findQuest() - Quest nach ID suchen
    it('sollte Quest nach ID finden können', () => {
        const test_quest = {
            id: 'quest_001',
            title: 'Erste Quest',
            description: 'Lerne JavaScript'
        };
        const quests = [test_quest];
        DB.set(DB.STORE_QUESTS, quests);
        
        const found_quest = DB.findQuest('quest_001');
        expect(found_quest).toEqual(test_quest);
    });
    
    // Test 12: getAllQuests() - Alle Quests abrufen
    it('sollte alle Quests abrufen können', () => {
        const test_quests = [
            { id: 'quest_001', title: 'Quest 1' },
            { id: 'quest_002', title: 'Quest 2' }
        ];
        DB.set(DB.STORE_QUESTS, test_quests);
        
        const all_quests = DB.getAllQuests();
        expect(all_quests).toHaveLength(2);
    });
    
    // Test 13: saveQuest() - Quest speichern
    it('sollte neue Quest speichern können', () => {
        const new_quest = { id: 'quest_new', title: 'New Quest' };
        DB.set(DB.STORE_QUESTS, []);
        DB.saveQuest(new_quest);
        
        const quests = DB.get(DB.STORE_QUESTS);
        expect(quests).toHaveLength(1);
    });
    
    // Test 14: getCurrentUser() - Aktuellen User abrufen
    it('sollte aktuellen User abrufen können', () => {
        const current_user = { id: 'user_123', email: 'test@example.com' };
        DB.set(DB.STORE_CURRENT_USER, current_user);
        
        const retrieved_user = DB.getCurrentUser();
        expect(retrieved_user).toEqual(current_user);
    });
    
    // Test 15: Error Handling - Ungültiges JSON
    it('sollte bei ungültigem JSON null zurückgeben', () => {
        localStorage.setItem('bad_json', 'nicht valides json {]');
        const result = DB.get('bad_json');
        expect(result).toBeNull();
    });
});
