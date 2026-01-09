/**
 * Database Layer - LocalStorage Manager
 * Verwaltet alle Datenspeicherung (User, Quests, Sessions)
 * Basierend auf Analyseklassenmodell (Documents/Grobdesign/Analyseklassenmodell.md)
 */

const DB = {
    STORE_USERS: 'users',
    STORE_QUESTS: 'quests',
    STORE_SESSIONS: 'learning_sessions',
    STORE_RULES: 'game_rules',
    STORE_CURRENT_USER: 'current_user',

    /**
     * Initialisiert die Datenbank mit Default-Daten
     */
    init() {
        // Erstelle leere Stores falls nicht vorhanden
        if (!this.get(this.STORE_USERS)) {
            this.set(this.STORE_USERS, []);
        }
        if (!this.get(this.STORE_QUESTS)) {
            this.set(this.STORE_QUESTS, this._getDefaultQuests());
        }
        if (!this.get(this.STORE_SESSIONS)) {
            this.set(this.STORE_SESSIONS, []);
        }
        if (!this.get(this.STORE_RULES)) {
            this.set(this.STORE_RULES, this._getDefaultGameRules());
        }
        console.log('✓ Datenbank initialisiert');
    },

    /**
     * Speichert einen Wert in LocalStorage (JSON)
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('DB Set Error:', error);
            return false;
        }
    },

    /**
     * Lädt einen Wert aus LocalStorage
     */
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('DB Get Error:', error);
            return null;
        }
    },

    /**
     * Löscht einen Key aus LocalStorage
     */
    delete(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('DB Delete Error:', error);
            return false;
        }
    },

    /**
     * Findet einen User nach ID
     */
    findUser(userId) {
        const users = this.get(this.STORE_USERS) || [];
        return users.find(u => u.id === userId);
    },

    /**
     * Findet einen User nach Email
     */
    findUserByEmail(email) {
        const users = this.get(this.STORE_USERS) || [];
        return users.find(u => u.email === email);
    },

    /**
     * Speichert/Aktualisiert einen User
     */
    saveUser(user) {
        const users = this.get(this.STORE_USERS) || [];
        const index = users.findIndex(u => u.id === user.id);
        
        if (index >= 0) {
            users[index] = user;
        } else {
            users.push(user);
        }
        
        return this.set(this.STORE_USERS, users);
    },

    /**
     * Findet eine Quest nach ID
     */
    findQuest(questId) {
        const quests = this.get(this.STORE_QUESTS) || [];
        return quests.find(q => q.id === questId);
    },

    /**
     * Gibt alle Quests zurück
     */
    getAllQuests() {
        return this.get(this.STORE_QUESTS) || [];
    },

    /**
     * Speichert/Aktualisiert eine Quest
     */
    saveQuest(quest) {
        const quests = this.get(this.STORE_QUESTS) || [];
        const index = quests.findIndex(q => q.id === quest.id);
        
        if (index >= 0) {
            quests[index] = quest;
        } else {
            quests.push(quest);
        }
        
        return this.set(this.STORE_QUESTS, quests);
    },

    /**
     * Speichert eine Learning Session (UC05: Quest abschließen)
     */
    saveSession(session) {
        const sessions = this.get(this.STORE_SESSIONS) || [];
        sessions.push(session);
        return this.set(this.STORE_SESSIONS, sessions);
    },

    /**
     * Holt alle Sessions eines Users
     */
    getUserSessions(userId) {
        const sessions = this.get(this.STORE_SESSIONS) || [];
        return sessions.filter(s => s.user_id === userId);
    },

    /**
     * Default Game Rules (UC14: XP/Level Regeln)
     */
    getGameRules() {
        return this.get(this.STORE_RULES) || this._getDefaultGameRules();
    },

    /**
     * Default Quest Katalog (UC13: Quest-Verwaltung)
     */
    _getDefaultQuests() {
        return [
            {
                id: 'q001',
                title: 'JavaScript Basics',
                description: 'Lerne die Grundlagen von JavaScript',
                difficulty: 'easy',
                xp_reward: 50,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q002',
                title: 'DOM Manipulation',
                description: 'Beherrsche DOM-Änderungen',
                difficulty: 'medium',
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q003',
                title: 'Async JavaScript',
                description: 'Verstehe Promises und Async/Await',
                difficulty: 'hard',
                xp_reward: 150,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q004',
                title: 'API Integration',
                description: 'Nutze externe APIs',
                difficulty: 'medium',
                xp_reward: 120,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q005',
                title: 'Code Review Basics',
                description: 'Lerne Best Practices',
                difficulty: 'easy',
                xp_reward: 40,
                status: 'available',
                created_at: new Date().toISOString()
            }
        ];
    },

    /**
     * Default Game Rules (XP-Konfiguration)
     */
    _getDefaultGameRules() {
        return {
            xp_per_easy_quest: 50,
            xp_per_medium_quest: 100,
            xp_per_hard_quest: 150,
            xp_per_minute_timer: 10,
            level_threshold: 500, // XP needed per Level
            max_level: 50
        };
    },

    /**
     * Löscht alle Daten (für Testing/Reset)
     */
    clearAll() {
        localStorage.clear();
        this.init();
        console.log('✓ Datenbank geleert und zurückgesetzt');
    }
};

// Initialisiere DB beim Load
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
});
