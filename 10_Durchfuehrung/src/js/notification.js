/**
 * Notification System (UC09)
 * Trigger bei Events: Quest Completion, Level-Up, Achievements unlock
 */

const NotificationModel = {
    /**
     * Erstellt und speichert eine Notification
     */
    create(userId, type, message, data = {}) {
        const notification = {
            id: this._generateId(),
            user_id: userId,
            type, // 'quest_completed', 'level_up', 'achievement', 'info'
            message,
            data,
            is_read: false,
            created_at: new Date().toISOString()
        };
        DB.saveNotification(notification);
        return notification;
    },

    /**
     * Trigger: Quest completed (UC05)
     */
    notifyQuestCompleted(userId, questTitle, xpEarned) {
        return this.create(userId, 'quest_completed', `🎯 Quest "${questTitle}" abgeschlossen! +${xpEarned} XP`, {
            quest_title: questTitle,
            xp_earned: xpEarned
        });
    },

    /**
     * Trigger: Level up
     */
    notifyLevelUp(userId, newLevel) {
        return this.create(userId, 'level_up', `🎉 Level ${newLevel} erreicht!`, {
            new_level: newLevel
        });
    },

    /**
     * Trigger: Achievement unlocked (UC11)
     */
    notifyAchievementUnlocked(userId, achievementName) {
        return this.create(userId, 'achievement', `⭐ Achievement "${achievementName}" freigeschaltet!`, {
            achievement_name: achievementName
        });
    },

    /**
     * Holt alle Notifications eines Users
     */
    getAll(userId) {
        return DB.getNotificationsForUser(userId);
    },

    /**
     * Holt nur ungelesene
     */
    getUnread(userId) {
        const all = DB.getNotificationsForUser(userId);
        return all.filter(n => !n.is_read);
    },

    /**
     * Zählt ungelesene
     */
    countUnread(userId) {
        return DB.getUnreadNotificationsForUser(userId);
    },

    /**
     * Markiert als gelesen
     */
    markAsRead(notificationId) {
        return DB.markNotificationAsRead(notificationId);
    },

    /**
     * Markiert alle als gelesen
     */
    markAllAsRead(userId) {
        const all = this.getAll(userId);
        all.forEach(n => {
            if (!n.is_read) {
                this.markAsRead(n.id);
            }
        });
    },

    _generateId() {
        return 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
};
