/**
 * Unit Tests - Quest Module
 * Tests für Quest Management (UC06-UC08)
 */

describe('Quest Module - Quest Management', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
        // Erstelle Test User
        if (typeof UserModel !== 'undefined') {
            UserModel.create('test@example.com', 'password123', 'Test User');
            UserModel.authenticate('test@example.com', 'password123');
        }
    });
    
    // Test 1: getActiveQuests() - Aktive Quests abrufen
    it('sollte aktive Quests abrufen können', () => {
        const active_quests = QuestModel.getActiveQuests();
        
        expect(active_quests).toBeTruthy();
        expect(Array.isArray(active_quests)).toBeTruthy();
    });
    
    // Test 2: acceptQuest() - Quest akzeptieren
    it('sollte Quest akzeptieren können', () => {
        const quests = QuestModel.getActiveQuests();
        const quest_to_accept = quests[0];
        
        if (quest_to_accept) {
            const user = UserModel.getCurrentUser();
            QuestModel.acceptQuest(user.id, quest_to_accept.id);
            
            const updated_user = DB.findUser(user.id);
            expect(updated_user.active_quest_id).toBe(quest_to_accept.id);
        }
    });
    
    // Test 3: getActiveQuestForUser() - Aktive Quest des Users
    it('sollte aktive Quest des Users abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            QuestModel.acceptQuest(user.id, quests[0].id);
            const active_quest = QuestModel.getActiveQuestForUser(user.id);
            
            expect(active_quest).toBeTruthy();
            expect(active_quest.id).toBe(quests[0].id);
        }
    });
    
    // Test 4: completeQuest() - Quest abschließen
    it('sollte Quest abschließen können', () => {
        const user = UserModel.getCurrentUser();
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            const quest_id = quests[0].id;
            QuestModel.acceptQuest(user.id, quest_id);
            QuestModel.completeQuest(user.id, quest_id);
            
            const updated_user = DB.findUser(user.id);
            expect(updated_user.quest_history).toContain(quest_id);
        }
    });
    
    // Test 5: getCompletedQuests() - Abgeschlossene Quests
    it('sollte abgeschlossene Quests abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            QuestModel.acceptQuest(user.id, quests[0].id);
            QuestModel.completeQuest(user.id, quests[0].id);
            
            const completed_quests = QuestModel.getCompletedQuests(user.id);
            expect(completed_quests.length).toBeGreaterThan(0);
        }
    });
    
    // Test 6: getQuestById() - Quest nach ID suchen
    it('sollte Quest nach ID finden können', () => {
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            const quest = QuestModel.getQuestById(quests[0].id);
            expect(quest).toBeTruthy();
            expect(quest.id).toBe(quests[0].id);
        }
    });
    
    // Test 7: getQuestProgress() - Quest-Fortschritt
    it('sollte Quest-Fortschritt abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            QuestModel.acceptQuest(user.id, quests[0].id);
            const progress = QuestModel.getQuestProgress(user.id, quests[0].id);
            
            expect(progress).toBeTruthy();
            expect(progress.status).toBe('active');
        }
    });
    
    // Test 8: createCustomQuest() - Custom Quest erstellen
    it('sollte Custom Quest erstellen können', () => {
        const user = UserModel.getCurrentUser();
        const new_quest = QuestModel.createCustomQuest(
            user.id,
            'Meine Custom Quest',
            'Beschreibung',
            100
        );
        
        expect(new_quest).toBeTruthy();
        expect(new_quest.title).toBe('Meine Custom Quest');
        expect(new_quest.xp_reward).toBe(100);
    });
    
    // Test 9: getAllQuests() - Alle Quests abrufen
    it('sollte alle Quests abrufen können', () => {
        const all_quests = QuestModel.getAllQuests();
        
        expect(Array.isArray(all_quests)).toBeTruthy();
        expect(all_quests.length).toBeGreaterThan(0);
    });
    
    // Test 10: getQuestDifficulty() - Quest-Schwierigkeit
    it('sollte Quest-Schwierigkeit abrufen können', () => {
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            const difficulty = QuestModel.getQuestDifficulty(quests[0].id);
            expect(['easy', 'medium', 'hard']).toContain(difficulty);
        }
    });
    
    // Test 11: getQuestsByCategory() - Quests nach Kategorie filtern
    it('sollte Quests nach Kategorie filtern können', () => {
        const category_quests = QuestModel.getQuestsByCategory('JavaScript');
        
        expect(Array.isArray(category_quests)).toBeTruthy();
    });
    
    // Test 12: abandonQuest() - Quest aufgeben
    it('sollte Quest aufgeben können', () => {
        const user = UserModel.getCurrentUser();
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            QuestModel.acceptQuest(user.id, quests[0].id);
            QuestModel.abandonQuest(user.id, quests[0].id);
            
            const updated_user = DB.findUser(user.id);
            expect(updated_user.active_quest_id).toBeNull();
        }
    });
    
    // Test 13: getAvailableQuestCount() - Verfügbare Quests zählen
    it('sollte Anzahl verfügbarer Quests zurückgeben', () => {
        const count = QuestModel.getAvailableQuestCount();
        
        expect(count).toBeGreaterThan(0);
    });
    
    // Test 14: canAcceptQuest() - Quest annehmen möglich?
    it('sollte prüfen ob Quest angenommen werden kann', () => {
        const user = UserModel.getCurrentUser();
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            const can_accept = QuestModel.canAcceptQuest(user.id, quests[0].id);
            expect(typeof can_accept).toBe('boolean');
        }
    });
    
    // Test 15: getQuestReward() - Quest-Belohnung abrufen
    it('sollte Quest-Belohnung abrufen können', () => {
        const quests = QuestModel.getActiveQuests();
        
        if (quests.length > 0) {
            const reward = QuestModel.getQuestReward(quests[0].id);
            expect(reward).toBeGreaterThan(0);
        }
    });
});
