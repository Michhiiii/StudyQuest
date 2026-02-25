/**
 * Unit Tests - UI Module
 * Tests für UI-Komponenten und Event-Handling
 */

describe('UI Module - User Interface Components', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
        // Erstelle Mock DOM Element
        if (typeof document === 'undefined') {
            global.document = {
                getElementById: function(id) {
                    return { id: id, innerHTML: '', classList: {}, appendChild: function() {}, addEventListener: function() {} };
                },
                querySelector: function(selector) {
                    return { textContent: '', innerHTML: '', classList: {} };
                },
                querySelectorAll: function(selector) {
                    return [];
                }
            };
        }
        // Erstelle Test User
        if (typeof UserModel !== 'undefined') {
            UserModel.create('test@example.com', 'password123', 'Test User');
            UserModel.authenticate('test@example.com', 'password123');
        }
    });
    
    // Test 1: renderDashboard() - Dashboard rendern
    it('sollte Dashboard rendern können', () => {
        const result = UIModule.renderDashboard();
        
        expect(result).toBeTruthy();
    });
    
    // Test 2: renderQuestList() - Quest-Liste rendern
    it('sollte Quest-Liste rendern können', () => {
        const quests = QuestModel.getActiveQuests();
        const result = UIModule.renderQuestList(quests);
        
        expect(result).toBeTruthy();
    });
    
    // Test 3: renderLeaderboard() - Leaderboard rendern
    it('sollte Leaderboard rendern können', () => {
        const ranking = LeaderboardModel.getRankingByXP();
        const result = UIModule.renderLeaderboard(ranking);
        
        expect(result).toBeTruthy();
    });
    
    // Test 4: renderUserProfile() - Benutzerprofil rendern
    it('sollte Benutzerprofil rendern können', () => {
        const user = UserModel.getCurrentUser();
        const result = UIModule.renderUserProfile(user);
        
        expect(result).toBeTruthy();
    });
    
    // Test 5: showNotification() - Benachrichtigung anzeigen
    it('sollte Benachrichtigung anzeigen können', () => {
        const result = UIModule.showNotification('Test Titel', 'Test Nachricht', 'success');
        
        expect(result).toBeTruthy();
    });
    
    // Test 6: showError() - Fehler anzeigen
    it('sollte Fehler anzeigen können', () => {
        const result = UIModule.showError('Ein Fehler ist aufgetreten');
        
        expect(result).toBeTruthy();
    });
    
    // Test 7: showLoading() - Ladeanzeige anzeigen
    it('sollte Ladeanzeige anzeigen können', () => {
        UIModule.showLoading();
        const is_loading = UIModule.isLoading();
        
        expect(is_loading).toBeTruthy();
    });
    
    // Test 8: hideLoading() - Ladeanzeige verstecken
    it('sollte Ladeanzeige verstecken können', () => {
        UIModule.showLoading();
        UIModule.hideLoading();
        const is_loading = UIModule.isLoading();
        
        expect(is_loading).toBeFalsy();
    });
    
    // Test 9: formatDate() - Datum formatieren
    it('sollte Datum formatieren können', () => {
        const date = new Date('2026-02-06');
        const formatted = UIModule.formatDate(date);
        
        expect(typeof formatted).toBe('string');
        expect(formatted.length).toBeGreaterThan(0);
    });
    
    // Test 10: formatXP() - XP formatieren
    it('sollte XP formatieren können', () => {
        const formatted = UIModule.formatXP(1500);
        
        expect(typeof formatted).toBe('string');
        expect(formatted).toContain('1500');
    });
    
    // Test 11: getEmoji() - Emoji für Achievement abrufen
    it('sollte Emoji für Achievement abrufen können', () => {
        const emoji = UIModule.getEmoji('achievement');
        
        expect(typeof emoji).toBe('string');
    });
    
    // Test 12: updateUserStats() - Benutzerstatistiken aktualisieren
    it('sollte Benutzerstatistiken aktualisieren können', () => {
        const user = UserModel.getCurrentUser();
        UIModule.updateUserStats(user);
        
        // Keine Exception sollte geworfen werden
        expect(true).toBeTruthy();
    });
    
    // Test 13: renderAchievements() - Achievements rendern
    it('sollte Achievements rendern können', () => {
        const achievements = AchievementModel.getAllAchievements();
        const result = UIModule.renderAchievements(achievements);
        
        expect(result).toBeTruthy();
    });
    
    // Test 14: renderGradeChart() - Notendiagramm rendern
    it('sollte Notendiagramm rendern können', () => {
        const user = UserModel.getCurrentUser();
        const result = UIModule.renderGradeChart(user.id);
        
        expect(result).toBeTruthy();
    });
    
    // Test 15: showConfirmDialog() - Bestätigungsdialog anzeigen
    it('sollte Bestätigungsdialog anzeigen können', () => {
        const result = UIModule.showConfirmDialog(
            'Bestätigung',
            'Sind Sie sicher?'
        );
        
        expect(result).toBeTruthy();
    });
});
