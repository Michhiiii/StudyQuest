/**
 * Database Layer - LocalStorage Manager
 * Verwaltet alle Datenspeicherung (User, Quests, Sessions)
 * Basierend auf Analyseklassenmodell (Documents/Grobdesign/Analyseklassenmodell.md)
 */

const DB = {
    STORE_USERS: 'users',
    STORE_QUESTS: 'quests',
    STORE_SESSIONS: 'learning_sessions',
    STORE_TIMERS: 'timers',
    STORE_GRADES: 'grades',
    STORE_NOTIFICATIONS: 'notifications',
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
        if (!this.get(this.STORE_TIMERS)) {
            this.set(this.STORE_TIMERS, []);
        }
        if (!this.get(this.STORE_GRADES)) {
            this.set(this.STORE_GRADES, []);
        }
        if (!this.get(this.STORE_NOTIFICATIONS)) {
            this.set(this.STORE_NOTIFICATIONS, []);
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
     * Grades store methods
     */
    getGradesForUser(userId) {
        const grades = this.get(this.STORE_GRADES) || [];
        return grades.filter(g => g.user_id === userId);
    },

    saveGrade(grade) {
        const grades = this.get(this.STORE_GRADES) || [];
        const index = grades.findIndex(g => g.id === grade.id);
        if (index >= 0) grades[index] = grade; else grades.push(grade);
        return this.set(this.STORE_GRADES, grades);
    },

    deleteGrade(gradeId) {
        const grades = this.get(this.STORE_GRADES) || [];
        const idx = grades.findIndex(g => g.id === gradeId);
        if (idx >= 0) {
            grades.splice(idx, 1);
            return this.set(this.STORE_GRADES, grades);
        }
        return false;
    },

    importGrades(gradesArray) {
        const grades = this.get(this.STORE_GRADES) || [];
        const merged = grades.concat(gradesArray);
        return this.set(this.STORE_GRADES, merged);
    },

    /**
     * Timer-Store Methoden
     */
    saveTimer(timer) {
        const timers = this.get(this.STORE_TIMERS) || [];
        const index = timers.findIndex(t => t.id === timer.id);
        if (index >= 0) timers[index] = timer; else timers.push(timer);
        return this.set(this.STORE_TIMERS, timers);
    },

    getActiveTimerForUser(userId) {
        const timers = this.get(this.STORE_TIMERS) || [];
        return timers.find(t => t.user_id === userId && t.active === true) || null;
    },

    getTimersForUser(userId) {
        const timers = this.get(this.STORE_TIMERS) || [];
        return timers.filter(t => t.user_id === userId);
    },

    clearTimer(timerId) {
        const timers = this.get(this.STORE_TIMERS) || [];
        const idx = timers.findIndex(t => t.id === timerId);
        if (idx >= 0) {
            timers.splice(idx, 1);
            return this.set(this.STORE_TIMERS, timers);
        }
        return false;
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
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q005',
                title: 'Code Review Basics',
                description: 'Lerne Best Practices',
                difficulty: 'easy',
                xp_reward: 50,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q006',
                title: 'Git & Version Control',
                description: 'Beherrsche Git Workflows und Branching',
                difficulty: 'easy',
                xp_reward: 50,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q007',
                title: 'CSS Flexbox Meister',
                description: 'Perfektioniere dein CSS Flexbox Wissen',
                difficulty: 'medium',
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q008',
                title: 'Array Methods Profi',
                description: 'Beherrsche map, filter, reduce und mehr',
                difficulty: 'medium',
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q009',
                title: 'REST API Design',
                description: 'Lerne die Prinzipien von RESTful APIs',
                difficulty: 'hard',
                xp_reward: 150,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q010',
                title: 'Testing & Debugging',
                description: 'Schreibe Tests und debugge effektiv',
                difficulty: 'medium',
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q011',
                title: 'Performance Optimization',
                description: 'Optimiere deine JavaScript-Performance',
                difficulty: 'hard',
                xp_reward: 150,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q012',
                title: 'Reguläre Ausdrücke',
                description: 'Meistere Regex für Pattern Matching',
                difficulty: 'medium',
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q013',
                title: 'Security Best Practices',
                description: 'Lerne Web-Sicherheit und Datenschutz',
                difficulty: 'hard',
                xp_reward: 150,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q014',
                title: 'Mobile Responsive Design',
                description: 'Erstelle responsive Designs für alle Geräte',
                difficulty: 'medium',
                xp_reward: 100,
                status: 'available',
                created_at: new Date().toISOString()
            },
            {
                id: 'q015',
                title: 'Closure & Scope',
                description: 'Verstehe JavaScript Closures und Scope',
                difficulty: 'hard',
                xp_reward: 150,
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
    },

    /**
     * Notifications store methods (UC09)
     */
    saveNotification(notification) {
        const notes = this.get(this.STORE_NOTIFICATIONS) || [];
        notes.push(notification);
        return this.set(this.STORE_NOTIFICATIONS, notes);
    },

    getNotificationsForUser(userId) {
        const notes = this.get(this.STORE_NOTIFICATIONS) || [];
        return notes.filter(n => n.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    getUnreadNotificationsForUser(userId) {
        const notes = this.get(this.STORE_NOTIFICATIONS) || [];
        return notes.filter(n => n.user_id === userId && !n.is_read).length;
    },

    markNotificationAsRead(notificationId) {
        const notes = this.get(this.STORE_NOTIFICATIONS) || [];
        const note = notes.find(n => n.id === notificationId);
        if (note) {
            note.is_read = true;
            return this.set(this.STORE_NOTIFICATIONS, notes);
        }
        return false;
    }
};

// Initialisiere DB beim Load
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
});
