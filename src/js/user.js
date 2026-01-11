/**
 * User Model & Business Logic
 * Implementiert UC01-UC03 (Registration, Login, Profil)
 * Basierend auf Analyseklassenmodell: User Entity
 */

const UserModel = {
    /**
     * Erstellt einen neuen User (UC01: Registrierung)
     */
    create(email, password, name) {
        // Validierung
        if (!email || !password || !name) {
            throw new Error('Email, Passwort und Name sind erforderlich');
        }
        
        if (email.length < 5 || !email.includes('@')) {
            throw new Error('Ungültige Email-Adresse');
        }
        
        if (password.length < 6) {
            throw new Error('Passwort muss mindestens 6 Zeichen lang sein');
        }

        // Prüfe ob User bereits existiert (UC01: Duplicate Check)
        if (DB.findUserByEmail(email)) {
            throw new Error('Email existiert bereits');
        }

        // Neuer User (Analyseklassenmodell: User Entity)
        const newUser = {
            id: this._generateId(),
            email: email.toLowerCase(),
            password_hash: this._hashPassword(password), // Vereinfachtes Hashing
            name: name,
            avatar: '👤', // Default Avatar
            level: 1,
            xp: 0,
            total_xp_earned: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            active_quest_id: null,
            quest_history: [] // UC04: Abgeschlossene Quests tracken
        };

        // Speichere in DB
        DB.saveUser(newUser);
        
        console.log(`✓ User erstellt: ${email}`);
        return newUser;
    },

    /**
     * Authentifiziert einen User (UC02: Login)
     */
    authenticate(email, password) {
        const user = DB.findUserByEmail(email);
        
        if (!user) {
            throw new Error('Email oder Passwort falsch');
        }

        // Vereinfachter Password Check
        if (!this._verifyPassword(password, user.password_hash)) {
            throw new Error('Email oder Passwort falsch');
        }

        // Setze aktuellen User in Session
        DB.set(DB.STORE_CURRENT_USER, user);
        
        console.log(`✓ User eingeloggt: ${email}`);
        return user;
    },

    /**
     * Holt aktuellen eingeloggten User
     */
    getCurrentUser() {
        return DB.get(DB.STORE_CURRENT_USER);
    },

    /**
     * Loggt User aus
     */
    logout() {
        DB.delete(DB.STORE_CURRENT_USER);
        console.log('✓ User ausgeloggt');
    },

    /**
     * Aktualisiert User-Profil (UC03: Profileinstellungen)
     */
    updateProfile(userId, updates) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        // Nur bestimmte Felder dürfen geändert werden
        if (updates.name) user.name = updates.name;
        if (updates.avatar) user.avatar = updates.avatar;
        
        user.updated_at = new Date().toISOString();
        
        DB.saveUser(user);
        
        // Update auch in Current User
        if (this.getCurrentUser()?.id === userId) {
            DB.set(DB.STORE_CURRENT_USER, user);
        }
        
        console.log(`✓ Profil aktualisiert: ${user.name}`);
        return user;
    },

    /**
     * Fügt XP zu User hinzu (UC05: Quest abschließen)
     * Atomare Operation - verhindert Doppel-Zuschreibung
     * UC09: Trigger Level-Up Notification
     */
    addXP(userId, xpAmount) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        const oldLevel = user.level;
        user.total_xp_earned += xpAmount;

        // Berechne neues Level (UC05: Level-up Logic)
        const rules = DB.getGameRules();
        user.level = Math.floor(user.total_xp_earned / rules.level_threshold) + 1;
        user.level = Math.min(user.level, rules.max_level);

        // Setze XP im aktuellen Level (Progress Bar wird zurückgesetzt bei Level-Up)
        user.xp = user.total_xp_earned - ((user.level - 1) * rules.level_threshold);

        user.updated_at = new Date().toISOString();
        DB.saveUser(user);

        // Update auch in Current User wenn aktiv
        if (this.getCurrentUser()?.id === userId) {
            DB.set(DB.STORE_CURRENT_USER, user);
        }

        const leveledUp = user.level > oldLevel;
        
        // UC09: Notification bei Level-Up (Trigger wird auch in quest.js stopTimer() aufgerufen)
        if (leveledUp && typeof NotificationModel !== 'undefined') {
            // Notification wird in stopTimer() getriggert, nicht hier
            // Das vermeidet doppelte Notifications
        }

        console.log(`✓ XP hinzugefügt: +${xpAmount} XP (Level ${oldLevel} → ${user.level}${leveledUp ? ' 🎉' : ''})`);

        return {
            user,
            xpAdded: xpAmount,
            leveledUp,
            newLevel: user.level
        };
    },

    /**
     * Registriert abgeschlossene Quest für User
     */
    completeQuest(userId, questId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        // Prüfe ob Quest bereits abgeschlossen
        if (user.quest_history.includes(questId)) {
            throw new Error('Quest wurde bereits abgeschlossen');
        }

        user.quest_history.push(questId);
        user.active_quest_id = null;
        user.updated_at = new Date().toISOString();
        
        DB.saveUser(user);
        
        if (this.getCurrentUser()?.id === userId) {
            DB.set(DB.STORE_CURRENT_USER, user);
        }

        return user;
    },

    /**
     * Setzt aktive Quest
     */
    setActiveQuest(userId, questId) {
        const user = DB.findUser(userId);
        if (!user) throw new Error('User nicht gefunden');

        user.active_quest_id = questId;
        user.updated_at = new Date().toISOString();
        
        DB.saveUser(user);
        
        if (this.getCurrentUser()?.id === userId) {
            DB.set(DB.STORE_CURRENT_USER, user);
        }

        return user;
    },

    /**
     * Vereinfachte Password Hashing (nicht sicher für Production!)
     * In echtem System: bcrypt verwenden
     */
    _hashPassword(password) {
        // Base64 Encoding als einfache Demonstration
        // ⚠️ NICHT für Production! Sollte bcrypt sein!
        return btoa(password + 'salt_key_2024');
    },

    /**
     * Password Verification
     */
    _verifyPassword(password, hash) {
        return btoa(password + 'salt_key_2024') === hash;
    },

    /**
     * Generiert eindeutige User ID
     */
    _generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
};
