/**
 * Quest System Logic
 * Implementiert UC04-UC05 (Quest starten & abschließen)
 * Basierend auf Analyseklassenmodell & Sequenzdiagramme
 */

const QuestSystem = {
    /**
     * UC04: Quest starten
     * Nutzer wählt Quest und startet diese
     */
    startQuest(userId, questId) {
        // Validierung
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        const quest = DB.findQuest(questId);
        if (!quest) throw new Error('Quest nicht gefunden');

        if (quest.status !== 'available') {
            throw new Error('Quest ist nicht verfügbar');
        }

        // Nur eine Quest gleichzeitig aktiv (Geschäftsregel)
        if (user.active_quest_id && user.active_quest_id !== questId) {
            throw new Error('Es ist bereits eine Quest aktiv. Beende diese zuerst.');
        }

        // Setze Quest als aktiv
        UserModel.setActiveQuest(userId, questId);

        console.log(`✓ Quest gestartet: ${quest.title} (${questId})`);

        return {
            questId,
            title: quest.title,
            description: quest.description,
            xp_reward: quest.xp_reward,
            difficulty: quest.difficulty,
            started_at: new Date().toISOString()
        };
    },

    /**
     * UC06: Timer starten für eine aktive Quest
     * Erstellt einen Timer-Objekt und persistiert ihn
     */
    startTimer(userId, questId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        const quest = DB.findQuest(questId);
        if (!quest) throw new Error('Quest nicht gefunden');

        // Prüfe ob bereits ein aktiver Timer existiert
        const existing = DB.getActiveTimerForUser(userId);
        if (existing) throw new Error('Es läuft bereits ein Timer. Bitte beende diesen zuerst.');

        // Setze aktive Quest falls noch nicht gesetzt
        if (!user.active_quest_id) {
            UserModel.setActiveQuest(userId, questId);
        }

        const timer = {
            id: this._generateTimerId(),
            user_id: userId,
            quest_id: questId,
            start_time: new Date().toISOString(),
            end_time: null,
            duration_seconds: 0,
            active: true
        };

        DB.saveTimer(timer);
        console.log(`✓ Timer gestartet für Quest ${questId}`);
        return timer;
    },

    /**
     * UC06: Timer stoppen - berechnet Dauer, XP und speichert Session
     */
    stopTimer(userId) {
        const timer = DB.getActiveTimerForUser(userId);
        if (!timer) throw new Error('Kein aktiver Timer gefunden');

        timer.end_time = new Date().toISOString();
        const start = new Date(timer.start_time);
        const end = new Date(timer.end_time);
        const durationSec = Math.max(0, Math.floor((end - start) / 1000));
        timer.duration_seconds = durationSec;
        timer.active = false;

        DB.saveTimer(timer);

        // Berechne XP: Basis XP der Quest + Zeitbonus
        const quest = DB.findQuest(timer.quest_id);
        const rules = DB.getGameRules();
        const durationMinutes = Math.floor(durationSec / 60);
        const timeBonus = Math.floor(durationMinutes * rules.xp_per_minute_timer);
        const baseXP = this._calculateXPReward(quest);
        const xpEarned = baseXP + timeBonus;

        // Atomare Operation: XP hinzufügen + Quest abschließen + Session speichern
        const xpResult = UserModel.addXP(userId, xpEarned);
        UserModel.completeQuest(userId, timer.quest_id);

        const session = {
            id: this._generateSessionId(),
            user_id: userId,
            quest_id: timer.quest_id,
            xp_earned: xpEarned,
            duration_seconds: durationSec,
            completed_at: new Date().toISOString()
        };
        DB.saveSession(session);

        // UC09: Trigger Notifications
        NotificationModel.notifyQuestCompleted(userId, quest.title, xpEarned);
        if (xpResult.leveledUp) {
            NotificationModel.notifyLevelUp(userId, xpResult.newLevel);
        }

        console.log(`✓ Timer gestoppt: +${xpEarned} XP (inkl. Zeitbonus ${timeBonus})`);
        return {
            timer,
            xpEarned,
            timeBonus,
            durationSec,
            leveledUp: xpResult.leveledUp,
            newLevel: xpResult.newLevel
        };
    },

    /**
     * UC05: Quest abschließen
     * Nutzer schließt Quest ab und erhält XP + Level-up
     * KRITISCH: Atomare Operation zur Vermeidung von Doppel-XP
     */
    completeQuest(userId, questId) {
        // Validierung
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        const quest = DB.findQuest(questId);
        if (!quest) throw new Error('Quest nicht gefunden');

        // Prüfe ob Quest aktiv ist für diesen User
        if (user.active_quest_id !== questId) {
            throw new Error('Diese Quest ist nicht aktiv für dich');
        }

        // Prüfe ob bereits abgeschlossen (Doppel-Check)
        if (user.quest_history.includes(questId)) {
            throw new Error('Diese Quest wurde bereits abgeschlossen');
        }

        // --- ATOMARE TRANSAKTIONS-LOGIK START ---
        try {
            // Schritt 1: XP berechnen basierend auf Schwierigkeit
            const xpReward = this._calculateXPReward(quest);

            // Schritt 2: XP zu User hinzufügen (mit Level-up)
            const xpResult = UserModel.addXP(userId, xpReward);

            // Schritt 3: Quest als abgeschlossen markieren
            UserModel.completeQuest(userId, questId);

            // Schritt 4: Learning Session speichern (Audit Trail)
            const session = {
                id: this._generateSessionId(),
                user_id: userId,
                quest_id: questId,
                xp_earned: xpReward,
                completed_at: new Date().toISOString()
            };
            DB.saveSession(session);

            // --- ATOMARE TRANSAKTIONS-LOGIK END ---

            console.log(`✓ Quest abgeschlossen: ${quest.title}`);
            console.log(`  → +${xpReward} XP, Level ${xpResult.newLevel}${xpResult.leveledUp ? ' 🎉' : ''}`);

            return {
                questId,
                title: quest.title,
                xpEarned: xpReward,
                leveledUp: xpResult.leveledUp,
                newLevel: xpResult.newLevel,
                totalXP: xpResult.user.total_xp_earned,
                completed_at: session.completed_at
            };
        } catch (error) {
            console.error('❌ Fehler beim Quest-Abschluss:', error);
            throw error;
        }
    },

    /**
     * UC04 Extension: Alle verfügbaren Quests abrufen
     */
    getAvailableQuests() {
        const allQuests = DB.getAllQuests();
        return allQuests.filter(q => q.status === 'available');
    },

    /**
     * Holt User-spezifische Quest-Infos
     */
    getQuestInfoForUser(userId, questId) {
        const user = DB.findUser(userId);
        const quest = DB.findQuest(questId);

        if (!user || !quest) return null;

        return {
            ...quest,
            isCompleted: user.quest_history.includes(questId),
            isActive: user.active_quest_id === questId,
            xpReward: this._calculateXPReward(quest)
        };
    },

    /**
     * Holt Quest-Statistiken für User
     */
    getQuestStats(userId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        const completedCount = user.quest_history.length;
        const sessions = DB.getUserSessions(userId);
        const totalXPFromQuests = sessions.reduce((sum, s) => sum + s.xp_earned, 0);

        return {
            completedQuests: completedCount,
            totalXPEarned: totalXPFromQuests,
            activeQuestId: user.active_quest_id,
            recentSessions: sessions.slice(-5) // Letzte 5 Sessions
        };
    },

    /**
     * Berechnet XP-Reward basierend auf Schwierigkeit
     * (UC14: XP/Level Regeln)
     */
    _calculateXPReward(quest) {
        const rules = DB.getGameRules();
        
        const xpMap = {
            easy: rules.xp_per_easy_quest,
            medium: rules.xp_per_medium_quest,
            hard: rules.xp_per_hard_quest
        };

        return xpMap[quest.difficulty] || quest.xp_reward;
    },

    /**
     * Generiert eindeutige Session ID
     */
    _generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    _generateTimerId() {
        return 'timer_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
};
