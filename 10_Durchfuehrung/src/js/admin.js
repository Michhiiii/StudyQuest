/**
 * Admin Management System (UC13-15)
 * Verwaltet Quests, Game Rules und User-Konten
 */

const AdminSystem = {
    /**
     * UC13: Quest CRUD Operations
     */

    createQuest(title, description, difficulty, xp_reward = null) {
        const quest_id = 'quest_' + Date.now();
        
        // Berechne XP basierend auf Difficulty
        const rules = DB.getGameRules();
        const xp_map = {
            easy: rules.xp_per_quest_easy,
            medium: rules.xp_per_quest_medium,
            hard: rules.xp_per_quest_hard
        };

        const quest = {
            id: quest_id,
            title,
            description,
            difficulty,
            xp_reward: xp_reward || xp_map[difficulty] || 100,
            status: 'available',
            created_at: new Date().toISOString()
        };

        const quests = DB.getAllQuests();
        quests.push(quest);
        DB.set(DB.STORE_QUESTS, quests);

        console.log(`✓ Quest erstellt: ${title}`);
        return quest;
    },

    updateQuest(questId, updates) {
        const quests = DB.getAllQuests();
        const quest = quests.find(q => q.id === questId);
        if (!quest) throw new Error('Quest nicht gefunden');

        if (updates.title) quest.title = updates.title;
        if (updates.description) quest.description = updates.description;
        if (updates.difficulty) quest.difficulty = updates.difficulty;
        if (updates.xp_reward) quest.xp_reward = updates.xp_reward;
        if (updates.status) quest.status = updates.status;

        DB.set(DB.STORE_QUESTS, quests);

        console.log(`✓ Quest aktualisiert: ${quest.title}`);
        return quest;
    },

    deleteQuest(questId) {
        const quests = DB.getAllQuests();
        const filtered = quests.filter(q => q.id !== questId);
        DB.set(DB.STORE_QUESTS, filtered);

        console.log(`✓ Quest gelöscht: ${questId}`);
        return true;
    },

    getAllQuests() {
        return DB.getAllQuests();
    },

    /**
     * UC14: Game Rules Configuration
     */

    getGameRules() {
        return DB.getGameRules();
    },

    updateGameRules(updates) {
        const rules = DB.getGameRules();

        // Nur bestimmte Felder dürfen geändert werden
        if (updates.xp_per_quest_easy !== undefined) rules.xp_per_quest_easy = updates.xp_per_quest_easy;
        if (updates.xp_per_quest_medium !== undefined) rules.xp_per_quest_medium = updates.xp_per_quest_medium;
        if (updates.xp_per_quest_hard !== undefined) rules.xp_per_quest_hard = updates.xp_per_quest_hard;
        if (updates.xp_per_minute_timer !== undefined) rules.xp_per_minute_timer = updates.xp_per_minute_timer;
        if (updates.level_threshold !== undefined) rules.level_threshold = updates.level_threshold;
        if (updates.max_level !== undefined) rules.max_level = updates.max_level;

        DB.set(DB.STORE_RULES, rules);

        console.log('✓ Game Rules aktualisiert');
        return rules;
    },

    /**
     * UC15: User Management
     */

    getAllUsers() {
        const users = DB.get(DB.STORE_USERS) || [];
        return users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            level: u.level,
            total_xp_earned: u.total_xp_earned,
            is_admin: u.is_admin || false,
            is_active: u.is_active !== false,
            created_at: u.created_at
        })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    getUserCount() {
        return this.getAllUsers().length;
    },

    getActiveUserCount() {
        return this.getAllUsers().filter(u => u.is_active).length;
    },

    getAdminCount() {
        return this.getAllUsers().filter(u => u.is_admin).length;
    },

    toggleAdminRole(userId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');
        
        const is_admin = !user.is_admin;
        user.is_admin = is_admin;
        user.updated_at = new Date().toISOString();
        DB.saveUser(user);

        console.log(`✓ Admin-Rolle ${is_admin ? 'hinzugefügt' : 'entfernt'}: ${user.email}`);
        return user;
    },

    toggleUserActive(userId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');
        
        const is_active = !user.is_active;
        user.is_active = is_active;
        user.updated_at = new Date().toISOString();
        DB.saveUser(user);

        console.log(`✓ User ${is_active ? 'aktiviert' : 'deaktiviert'}: ${user.email}`);
        return user;
    },

    deleteUser(userId) {
        const users = DB.get(DB.STORE_USERS) || [];
        const filtered = users.filter(u => u.id !== userId);
        DB.set(DB.STORE_USERS, filtered);

        console.log(`✓ User gelöscht: ${userId}`);
        return true;
    },

    /**
     * UC11: Achievement Management
     */
    getAllAchievements() {
        // Gebe alle benutzerdefinierten und vordefinierten Achievements zurück
        return Object.values(AchievementSystem.ACHIEVEMENTS);
    },

    createAchievement(key, title, description, icon) {
        // Füge neues Achievement zu AchievementSystem.ACHIEVEMENTS hinzu
        const achievement = {
            key,
            title,
            description,
            icon,
            unlock_condition: () => false, // Neue Achievements müssen manuell freigeschalten werden
            unlock_type: 'never', // Typ der Freischalts-Bedingung
            unlock_value: null // Wert für die Bedingung (z.B. Anzahl Quests)
        };

        AchievementSystem.ACHIEVEMENTS[key] = achievement;
        
        // Speichere in DB unter eigenem Store
        const custom_achievements = DB.get(DB.STORE_CUSTOM_ACHIEVEMENTS) || {};
        custom_achievements[key] = achievement;
        DB.set(DB.STORE_CUSTOM_ACHIEVEMENTS, custom_achievements);

        console.log(`✓ Achievement erstellt: ${title}`);
        return achievement;
    },

    createAchievementWithCondition(key, title, description, icon, unlockType, unlockValue = null) {
        // Erstelle Achievement mit Freischalt-Bedingung
        const unlock_condition = this._buildUnlockCondition(unlockType, unlockValue);
        
        const achievement = {
            key,
            title,
            description,
            icon,
            unlock_condition,
            unlock_type: unlockType,
            unlock_value: unlockValue
        };

        AchievementSystem.ACHIEVEMENTS[key] = achievement;
        
        const custom_achievements = DB.get(DB.STORE_CUSTOM_ACHIEVEMENTS) || {};
        custom_achievements[key] = achievement;
        DB.set(DB.STORE_CUSTOM_ACHIEVEMENTS, custom_achievements);

        console.log(`✓ Achievement mit Bedingung erstellt: ${title}`);
        return achievement;
    },

    /**
     * Erstelle Unlock-Bedingung basierend auf Typ
     */
    _buildUnlockCondition(unlockType, unlockValue) {
        switch(unlockType) {
            case 'immediate':
                return () => true; // Sofort freigeschalten
            
            case 'quest_count':
                return (stats) => stats.completedQuests >= (unlockValue || 1);
            
            case 'level':
                return (stats, user) => user.level >= (unlockValue || 1);
            
            case 'xp':
                return (stats, user) => user.total_xp_earned >= (unlockValue || 100);
            
            case 'never':
            default:
                return () => false; // Keine automatische Freischaltung
        }
    },

    /**
     * Gib Unlock-Bedingungen-Typen zurück
     */
    getUnlockConditionTypes() {
        return [
            { key: 'never', label: 'Niemals (nur manuell)', icon: '🔒' },
            { key: 'immediate', label: 'Sofort freigeschalten', icon: '⭐' },
            { key: 'quest_count', label: 'Nach X Quests', icon: '📋' },
            { key: 'level', label: 'Nach Level X', icon: '📈' },
            { key: 'xp', label: 'Nach X XP', icon: '💰' }
        ];
    },

    updateAchievement(key, updates) {
        const achievement = AchievementSystem.ACHIEVEMENTS[key];
        if (!achievement) throw new Error('Achievement nicht gefunden');

        if (updates.title) achievement.title = updates.title;
        if (updates.description) achievement.description = updates.description;
        if (updates.icon) achievement.icon = updates.icon;
        
        // Aktualisiere Unlock-Bedingung falls Typ oder Wert geändert
        if (updates.unlock_type) {
            achievement.unlock_type = updates.unlock_type;
            achievement.unlock_value = updates.unlock_value || null;
            achievement.unlock_condition = this._buildUnlockCondition(updates.unlock_type, updates.unlock_value);
        }

        // Speichere Update in Custom-Store falls es ein custom Achievement ist
        const custom_achievements = DB.get(DB.STORE_CUSTOM_ACHIEVEMENTS) || {};
        if (custom_achievements[key]) {
            custom_achievements[key] = achievement;
            DB.set(DB.STORE_CUSTOM_ACHIEVEMENTS, custom_achievements);
        }

        console.log(`✓ Achievement aktualisiert: ${achievement.title}`);
        return achievement;
    },

    deleteAchievement(key) {
        // Nur custom Achievements können gelöscht werden
        const custom_achievements = DB.get(DB.STORE_CUSTOM_ACHIEVEMENTS) || {};
        if (!custom_achievements[key]) {
            throw new Error('Dieses Achievement kann nicht gelöscht werden (Vordefiniert)');
        }

        delete AchievementSystem.ACHIEVEMENTS[key];
        delete custom_achievements[key];
        DB.set(DB.STORE_CUSTOM_ACHIEVEMENTS, custom_achievements);

        console.log(`✓ Achievement gelöscht: ${key}`);
        return true;
    },

    isCustomAchievement(key) {
        const custom_achievements = DB.get(DB.STORE_CUSTOM_ACHIEVEMENTS) || {};
        return !!custom_achievements[key];
    }
};
