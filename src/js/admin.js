/**
 * Admin Management System (UC13-15)
 * Verwaltet Quests, Game Rules und User-Konten
 */

const AdminSystem = {
    /**
     * UC13: Quest CRUD Operations
     */

    createQuest(title, description, difficulty, xp_reward = null) {
        const questId = 'quest_' + Date.now();
        
        // Berechne XP basierend auf Difficulty
        const rules = DB.getGameRules();
        const xpMap = {
            easy: rules.xp_per_quest_easy,
            medium: rules.xp_per_quest_medium,
            hard: rules.xp_per_quest_hard
        };

        const quest = {
            id: questId,
            title,
            description,
            difficulty,
            xp_reward: xp_reward || xpMap[difficulty] || 100,
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
        
        const isAdmin = !user.is_admin;
        user.is_admin = isAdmin;
        user.updated_at = new Date().toISOString();
        DB.saveUser(user);

        console.log(`✓ Admin-Rolle ${isAdmin ? 'hinzugefügt' : 'entfernt'}: ${user.email}`);
        return user;
    },

    toggleUserActive(userId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');
        
        const isActive = !user.is_active;
        user.is_active = isActive;
        user.updated_at = new Date().toISOString();
        DB.saveUser(user);

        console.log(`✓ User ${isActive ? 'aktiviert' : 'deaktiviert'}: ${user.email}`);
        return user;
    },

    deleteUser(userId) {
        const users = DB.get(DB.STORE_USERS) || [];
        const filtered = users.filter(u => u.id !== userId);
        DB.set(DB.STORE_USERS, filtered);

        console.log(`✓ User gelöscht: ${userId}`);
        return true;
    }
};
