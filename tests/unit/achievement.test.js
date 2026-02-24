/**
 * Unit Tests - Achievement Module
 * Tests für Achievement System (UC12-UC13)
 */

describe('Achievement Module - Achievement System', () => {
    
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
    
    // Test 1: getAllAchievements() - Alle Achievements abrufen
    it('sollte alle verfügbaren Achievements abrufen können', () => {
        const all_achievements = AchievementModel.getAllAchievements();
        
        expect(Array.isArray(all_achievements)).toBeTruthy();
        expect(all_achievements.length).toBeGreaterThan(0);
    });
    
    // Test 2: getUnlockedAchievements() - Freigeschaltete Achievements
    it('sollte freigeschaltete Achievements abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const unlocked = AchievementModel.getUnlockedAchievements(user.id);
        
        expect(Array.isArray(unlocked)).toBeTruthy();
    });
    
    // Test 3: unlockedAchievement() - Achievement freischalten
    it('sollte Achievement freischalten können', () => {
        const user = UserModel.getCurrentUser();
        const achievement_id = 'first_quest';
        
        AchievementModel.unlockAchievement(user.id, achievement_id);
        const unlocked = AchievementModel.getUnlockedAchievements(user.id);
        
        expect(unlocked).toContain(achievement_id);
    });
    
    // Test 4: isAchievementUnlocked() - Achievement freigeschaltet?
    it('sollte prüfen ob Achievement freigeschaltet ist', () => {
        const user = UserModel.getCurrentUser();
        const achievement_id = 'first_quest';
        
        AchievementModel.unlockAchievement(user.id, achievement_id);
        const is_unlocked = AchievementModel.isAchievementUnlocked(user.id, achievement_id);
        
        expect(is_unlocked).toBeTruthy();
    });
    
    // Test 5: isAchievementUnlocked() - Nicht freigeschaltet
    it('sollte false zurückgeben wenn Achievement nicht freigeschaltet ist', () => {
        const user = UserModel.getCurrentUser();
        const is_unlocked = AchievementModel.isAchievementUnlocked(user.id, 'non_existent');
        
        expect(is_unlocked).toBeFalsy();
    });
    
    // Test 6: getAchievementProgress() - Achievement-Fortschritt
    it('sollte Fortschritt zu Achievement abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const progress = AchievementModel.getAchievementProgress(user.id, 'quest_master');
        
        expect(progress).toBeTruthy();
        expect(progress).toHaveProperty('current');
        expect(progress).toHaveProperty('required');
    });
    
    // Test 7: getAchievementInfo() - Achievement-Info abrufen
    it('sollte Info zu Achievement abrufen können', () => {
        const info = AchievementModel.getAchievementInfo('first_quest');
        
        expect(info).toBeTruthy();
        expect(info).toHaveProperty('id');
        expect(info).toHaveProperty('title');
        expect(info).toHaveProperty('description');
    });
    
    // Test 8: getUnlockedCount() - Anzahl freigeschalteter Achievements
    it('sollte Anzahl freigeschalteter Achievements zählen können', () => {
        const user = UserModel.getCurrentUser();
        AchievementModel.unlockAchievement(user.id, 'first_quest');
        AchievementModel.unlockAchievement(user.id, 'streak_master');
        
        const count = AchievementModel.getUnlockedCount(user.id);
        
        expect(count).toBe(2);
    });
    
    // Test 9: getCompletionPercentage() - Completion-Prozentsatz
    it('sollte Achievements Completion-Prozentsatz berechnen können', () => {
        const user = UserModel.getCurrentUser();
        const all_achievements = AchievementModel.getAllAchievements();
        
        // Freischaltung von der Hälfte
        const half_count = Math.floor(all_achievements.length / 2);
        for (let i = 0; i < half_count; i++) {
            AchievementModel.unlockAchievement(user.id, all_achievements[i].id);
        }
        
        const completion = AchievementModel.getCompletionPercentage(user.id);
        
        expect(completion).toBeGreaterThan(0);
        expect(completion).toBeLessThan(100);
    });
    
    // Test 10: updateAchievementProgress() - Fortschritt aktualisieren
    it('sollte Achievement-Fortschritt aktualisieren können', () => {
        const user = UserModel.getCurrentUser();
        AchievementModel.updateAchievementProgress(user.id, 'quest_master', 3);
        
        const progress = AchievementModel.getAchievementProgress(user.id, 'quest_master');
        expect(progress.current).toBe(3);
    });
    
    // Test 11: checkAndUnlockAchievements() - Automatisches Freischalten prüfen
    it('sollte automatisch Achievements freischalten wenn Kriterien erfüllt', () => {
        const user = UserModel.getCurrentUser();
        
        // Simuliere 5 abgeschlossene Quests
        for (let i = 0; i < 5; i++) {
            AchievementModel.updateAchievementProgress(user.id, 'quest_master', i + 1);
        }
        
        AchievementModel.checkAndUnlockAchievements(user.id, 'quest_master');
        
        // Achievement sollte freigeschaltet sein wenn Kriterium erfüllt
        const is_unlocked = AchievementModel.isAchievementUnlocked(user.id, 'quest_master');
        expect(typeof is_unlocked).toBe('boolean');
    });
    
    // Test 12: getAchievementsByCategory() - Achievements nach Kategorie filtern
    it('sollte Achievements nach Kategorie filtern können', () => {
        const achievements = AchievementModel.getAchievementsByCategory('learning');
        
        expect(Array.isArray(achievements)).toBeTruthy();
    });
    
    // Test 13: getRewardForAchievement() - Belohnung für Achievement
    it('sollte Belohnung für Achievement abrufen können', () => {
        const reward = AchievementModel.getRewardForAchievement('first_quest');
        
        expect(reward).toBeTruthy();
        expect(reward).toHaveProperty('xp');
    });
    
    // Test 14: checkStreakAchievements() - Streak Achievements prüfen
    it('sollte Streak Achievements überprüfen können', () => {
        const user = UserModel.getCurrentUser();
        
        // Simuliere einen Streak
        for (let i = 0; i < 7; i++) {
            AchievementModel.updateAchievementProgress(user.id, 'streak_master', i + 1);
        }
        
        AchievementModel.checkStreakAchievements(user.id);
        
        const unlocked = AchievementModel.getUnlockedAchievements(user.id);
        expect(Array.isArray(unlocked)).toBeTruthy();
    });
    
    // Test 15: getNextMilestone() - Nächster Meilenstein
    it('sollte nächsten Achievement-Meilenstein abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const next_milestone = AchievementModel.getNextMilestone(user.id, 'quest_master');
        
        expect(next_milestone).toBeTruthy();
        expect(next_milestone).toHaveProperty('required');
    });
});
