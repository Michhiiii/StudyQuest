/**
 * Leaderboard System (UC12)
 * Zeigt Rankings aller User und persönliche Streaks
 */

const LeaderboardSystem = {
    /**
     * Holt alle User mit ihren Stats (für Leaderboard)
     */
    getAllUsersStats() {
        const users = DB.get(DB.STORE_USERS) || [];
        
        return users.map(user => {
            const sessions = DB.getUserSessions(user.id);
            const completedQuests = user.quest_history ? user.quest_history.length : 0;

            return {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                level: user.level,
                total_xp_earned: user.total_xp_earned,
                completedQuests,
                current_streak: user.current_streak || 0,
                best_streak: user.best_streak || 0,
                achievements: DB.getUnlockedAchievementCount(user.id)
            };
        }).sort((a, b) => b.total_xp_earned - a.total_xp_earned);
    },

    /**
     * Holt Rankings nach verschiedenen Kriterien
     */
    getRankings(criteria = 'xp') {
        const stats = this.getAllUsersStats();

        switch(criteria) {
            case 'xp':
                return stats.sort((a, b) => b.total_xp_earned - a.total_xp_earned);
            case 'level':
                return stats.sort((a, b) => {
                    if (b.level !== a.level) return b.level - a.level;
                    return b.total_xp_earned - a.total_xp_earned;
                });
            case 'quests':
                return stats.sort((a, b) => b.completedQuests - a.completedQuests);
            case 'streak':
                return stats.sort((a, b) => b.best_streak - a.best_streak);
            case 'achievements':
                return stats.sort((a, b) => b.achievements - a.achievements);
            default:
                return stats;
        }
    },

    /**
     * Holt Rang eines Users in einem Ranking
     */
    getUserRank(userId, criteria = 'xp') {
        const rankings = this.getRankings(criteria);
        const rank = rankings.findIndex(u => u.id === userId) + 1;
        return rank > 0 ? rank : null;
    },

    /**
     * Holt Top 10 Users
     */
    getTop10(criteria = 'xp') {
        return this.getRankings(criteria).slice(0, 10);
    },

    /**
     * Berechnet User-Statistiken für Übersicht
     */
    getUserStats(userId) {
        const user = DB.findUser(userId);
        if (!user) return null;

        return {
            name: user.name,
            avatar: user.avatar,
            level: user.level,
            total_xp_earned: user.total_xp_earned,
            completedQuests: user.quest_history ? user.quest_history.length : 0,
            current_streak: user.current_streak || 0,
            best_streak: user.best_streak || 0,
            achievements: DB.getUnlockedAchievementCount(userId),
            rank_xp: this.getUserRank(userId, 'xp'),
            rank_level: this.getUserRank(userId, 'level'),
            rank_quests: this.getUserRank(userId, 'quests'),
            rank_streak: this.getUserRank(userId, 'streak')
        };
    }
};
