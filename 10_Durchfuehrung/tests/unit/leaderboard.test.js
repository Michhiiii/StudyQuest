/**
 * Unit Tests - Leaderboard Module
 * Tests für Leaderboard/Ranking System (UC11)
 */

describe('Leaderboard Module - Ranking System', () => {
    
    beforeEach(() => {
        localStorage.clear();
        if (typeof DB !== 'undefined') {
            DB.init();
        }
        // Erstelle mehrere Test User
        if (typeof UserModel !== 'undefined') {
            UserModel.create('user1@example.com', 'password123', 'User One');
            UserModel.create('user2@example.com', 'password123', 'User Two');
            UserModel.create('user3@example.com', 'password123', 'User Three');
        }
    });
    
    // Test 1: getLeaderboard() - Leaderboard abrufen
    it('sollte Leaderboard abrufen können', () => {
        const leaderboard = LeaderboardModel.getLeaderboard();
        
        expect(Array.isArray(leaderboard)).toBeTruthy();
        expect(leaderboard.length).toBeGreaterThan(0);
    });
    
    // Test 2: getRankingByXP() - Ranking nach XP sortieren
    it('sollte Ranking nach XP abrufen können', () => {
        const ranking = LeaderboardModel.getRankingByXP();
        
        expect(Array.isArray(ranking)).toBeTruthy();
        // XP sollte absteigend sortiert sein
        if (ranking.length > 1) {
            expect(ranking[0].total_xp_earned).toBeGreaterThan(0);
        }
    });
    
    // Test 3: getRankingByLevel() - Ranking nach Level sortieren
    it('sollte Ranking nach Level abrufen können', () => {
        const ranking = LeaderboardModel.getRankingByLevel();
        
        expect(Array.isArray(ranking)).toBeTruthy();
    });
    
    // Test 4: getUserRank() - Benutzer-Position abrufen
    it('sollte Position eines Users abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const rank = LeaderboardModel.getUserRank(user.id, 'xp');
        
        expect(rank).toBeGreaterThan(0);
    });
    
    // Test 5: getTopUsers() - Top User abrufen
    it('sollte Top User abrufen können', () => {
        const top_users = LeaderboardModel.getTopUsers(5);
        
        expect(Array.isArray(top_users)).toBeTruthy();
        expect(top_users.length).toBeLessThanOrEqual(5);
    });
    
    // Test 6: getTopUsers() - Begrenzte Anzahl
    it('sollte Top User auf angeforderte Anzahl begrenzen', () => {
        const top_users = LeaderboardModel.getTopUsers(3);
        
        expect(top_users.length).toBeLessThanOrEqual(3);
    });
    
    // Test 7: getUserPosition() - Position relativ zu anderen Users
    it('sollte Position eines Users im Leaderboard zeigen', () => {
        const user = UserModel.getCurrentUser();
        const position = LeaderboardModel.getUserPosition(user.id);
        
        expect(position).toBeGreaterThan(0);
    });
    
    // Test 8: getStreakLeaderboard() - Streak Leaderboard
    it('sollte Streak Leaderboard abrufen können', () => {
        const streak_lb = LeaderboardModel.getStreakLeaderboard();
        
        expect(Array.isArray(streak_lb)).toBeTruthy();
    });
    
    // Test 9: getAchievementLeaderboard() - Achievement Leaderboard
    it('sollte Achievement Leaderboard abrufen können', () => {
        const achievement_lb = LeaderboardModel.getAchievementLeaderboard();
        
        expect(Array.isArray(achievement_lb)).toBeTruthy();
    });
    
    // Test 10: comparePlayers() - Zwei Spieler vergleichen
    it('sollte zwei Spieler vergleichen können', () => {
        const users = DB.get(DB.STORE_USERS);
        
        if (users && users.length >= 2) {
            const comparison = LeaderboardModel.comparePlayers(users[0].id, users[1].id);
            
            expect(comparison).toBeTruthy();
            expect(comparison).toHaveProperty('player1');
            expect(comparison).toHaveProperty('player2');
        }
    });
    
    // Test 11: getStatistics() - Leaderboard-Statistiken
    it('sollte Leaderboard-Statistiken abrufen können', () => {
        const stats = LeaderboardModel.getStatistics();
        
        expect(stats).toBeTruthy();
        expect(stats).toHaveProperty('total_users');
        expect(stats).toHaveProperty('average_xp');
        expect(stats).toHaveProperty('average_level');
    });
    
    // Test 12: getNearbyPlayers() - Spieler in der Nähe (Ranking)
    it('sollte Spieler in der Nähe abrufen können', () => {
        const user = UserModel.getCurrentUser();
        const nearby = LeaderboardModel.getNearbyPlayers(user.id, 3);
        
        expect(Array.isArray(nearby)).toBeTruthy();
    });
    
    // Test 13: updateLeaderboard() - Leaderboard aktualisieren
    it('sollte Leaderboard aktualisieren können', () => {
        const user = UserModel.getCurrentUser();
        UserModel.addXP(user.id, 100);
        
        LeaderboardModel.updateLeaderboard();
        
        const ranking = LeaderboardModel.getRankingByXP();
        expect(ranking).toBeTruthy();
    });
    
    // Test 14: getMonthlyLeaderboard() - Monatliches Leaderboard
    it('sollte monatliches Leaderboard abrufen können', () => {
        const monthly_lb = LeaderboardModel.getMonthlyLeaderboard();
        
        expect(Array.isArray(monthly_lb)).toBeTruthy();
    });
    
    // Test 15: getWeeklyLeaderboard() - Wöchentliches Leaderboard
    it('sollte wöchentliches Leaderboard abrufen können', () => {
        const weekly_lb = LeaderboardModel.getWeeklyLeaderboard();
        
        expect(Array.isArray(weekly_lb)).toBeTruthy();
    });
});
