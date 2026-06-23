/**
 * Main App Controller
 * Zentrale Anwendungslogik und Router
 * Implementiert das Projekt basierend auf dem Software Development Plan
 */

const app = {
    /**
     * Initialisiert die Anwendung
     */
    init() {
        console.log('🚀 StudyQuest App startet...');
        console.log('Projekt: Gamifizierte Lern- & Notenverwaltung');
        console.log('Basierend auf Software Development Plan - Document/Prozesse & Vorgehensmodelle/SoftwareDevelopmentPlan.md');
        
        // DB initialisieren
        DB.init();

        // Prüfe ob User eingeloggt ist
        const current_user = UserModel.getCurrentUser();
        
        if (current_user) {
            this.showDashboard();
        } else {
            this.showAuthPage();
        }

        this._setupGlobalNavigation();
        console.log('✓ App bereit');
    },

    /**
     * Zeigt Auth-Seite (Login/Register)
     */
    showAuthPage() {
        document.getElementById('navbar').classList.add('hidden');
        AuthUI.showAuthPage();
    },

    /**
     * Zeigt Dashboard
     */
    showDashboard() {
        const user = UserModel.getCurrentUser();
        if (!user) {
            this.showAuthPage();
            return;
        }

        document.getElementById('navbar').classList.remove('hidden');
        this._updateAdminButtonVisibility();
        UI.showDashboard();
    },

    /**
     * Zeigt Quest-Übersichts-Seite
     */
    showQuestPage() {
        const user = UserModel.getCurrentUser();
        if (!user) {
            this.showAuthPage();
            return;
        }

        UI.showQuestPage();
    },

    /**
     * Zeigt Notenverwaltung (UC07)
     */
    showGradesPage() {
        const user = UserModel.getCurrentUser();
        if (!user) { this.showAuthPage(); return; }
        UI.showGradesPage();
    },

    /**
     * UC12: Zeigt Leaderboard & Streaks
     */
    showLeaderboardPage() {
        const user = UserModel.getCurrentUser();
        if (!user) { this.showAuthPage(); return; }
        UI.showLeaderboardPage();
    },

    /**
     * UC13-15: Zeigt Admin Panel
     */
    showAdminPage() {
        const user = UserModel.getCurrentUser();
        if (!user || !UserModel.isAdmin(user.id)) {
            this.showDashboard();
            return;
        }
        UI.showAdminPage();
    },

    /**
     * Zeigt Seite für aktive Quest
     */
    showActiveQuestPage() {
        const user = UserModel.getCurrentUser();
        if (!user) {
            this.showAuthPage();
            return;
        }

        UI.showActiveQuestPage();
    },

    /**
     * Startet eine Quest
     */
    startQuest(questId) {
        const user = UserModel.getCurrentUser();
        if (!user) {
            alert('Bitte logge dich zuerst ein');
            return;
        }

        try {
            QuestSystem.startQuest(user.id, questId);
            this.showActiveQuestPage();
        } catch (error) {
            alert('❌ ' + error.message);
        }
    },

    /**
     * Setzt Quest fort (wenn bereits aktiv)
     */
    continueQuest(questId) {
        const user = UserModel.getCurrentUser();
        if (!user) {
            alert('Bitte logge dich zuerst ein');
            return;
        }

        const user_obj = DB.findUser(user.id);
        if (user_obj.active_quest_id === questId) {
            this.showActiveQuestPage();
        } else {
            this.startQuest(questId);
        }
    },

    /**
     * Logout
     */
    logout() {
        if (confirm('Möchtest du dich wirklich abmelden?')) {
            UserModel.logout();
            this.showAuthPage();
        }
    },

    /**
     * Private Helper: Setup globale Navigation
     */
    _setupGlobalNavigation() {
        document.getElementById('nav-dashboard')?.addEventListener('click', () => {
            this.showDashboard();
        });

        document.getElementById('nav-quests')?.addEventListener('click', () => {
            this.showQuestPage();
        });

        document.getElementById('nav-admin')?.addEventListener('click', () => {
            this.showAdminPage();
        });

        document.getElementById('nav-logout')?.addEventListener('click', () => {
            this.logout();
        });

        // UC13-15: Update Admin-Button Visibility
        this._updateAdminButtonVisibility();

        // UC09: Notification Events - Ein zentraler Handler
        document.addEventListener('click', (e) => {
            const bell_btn = e.target.closest('#nav-notifications-bell');
            const clear_btn = e.target.closest('#clear-notifications-btn');
            const notif_item = e.target.closest('.notification-item');
            const dropdown = document.getElementById('notification-dropdown');

            // Bell click - toggle dropdown
            if (bell_btn) {
                console.log('Bell clicked');
                e.stopPropagation();
                if (dropdown) {
                    dropdown.classList.toggle('hidden');
                    if (!dropdown.classList.contains('hidden')) {
                        this._updateNotificationList();
                    }
                }
                return;
            }

            // Clear button
            if (clear_btn) {
                console.log('Clear clicked');
                e.stopPropagation();
                const user = UserModel.getCurrentUser();
                if (user) {
                    NotificationModel.markAllAsRead(user.id);
                    this._updateNotificationList();
                    this._updateNotificationBadge();
                }
                return;
            }

            // Notification item click
            if (notif_item) {
                console.log('Notif item clicked');
                e.stopPropagation();
                const notif_id = notif_item.getAttribute('data-notif-id');
                if (notif_id) {
                    this._markNotificationAsRead(notif_id);
                }
                return;
            }

            // Close dropdown when clicking outside
            if (dropdown && !dropdown.classList.contains('hidden')) {
                const is_inside = e.target.closest('#notification-dropdown') || e.target.closest('#nav-notifications-bell');
                if (!is_inside) {
                    dropdown.classList.add('hidden');
                }
            }
        }, true); // useCapture = true für höhere Priorität
    },

    /**
     * UC09: Update Notification List im Dropdown
     */
    _updateNotificationList() {
        const user = UserModel.getCurrentUser();
        if (!user) return;

        const notifications = NotificationModel.getAll(user.id).slice(0, 5);
        const list_div = document.getElementById('notification-list');

        if (notifications.length === 0) {
            list_div.innerHTML = '<div class="notification-empty">Keine Benachrichtigungen</div>';
            return;
        }

        list_div.innerHTML = notifications.map(notif => {
            const time = new Date(notif.created_at).toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="notification-item ${!notif.is_read ? 'unread' : ''}" 
                     data-notif-id="${notif.id}">
                    <div class="notification-message">${notif.message}</div>
                    <div class="notification-time">${time}</div>
                </div>
            `;
        }).join('');
    },

    /**
     * UC09: Mark Notification as Read
     */
    _markNotificationAsRead(notificationId) {
        NotificationModel.markAsRead(notificationId);
        const user = UserModel.getCurrentUser();
        if (user) {
            this._updateNotificationList();
            this._updateNotificationBadge();
        }
    },

    /**
     * UC13-15: Update Admin-Button Visibility
     */
    _updateAdminButtonVisibility() {
        const user = UserModel.getCurrentUser();
        const admin_btn = document.getElementById('nav-admin');
        
        if (user && UserModel.isAdmin(user.id)) {
            admin_btn?.classList.remove('hidden');
        } else {
            admin_btn?.classList.add('hidden');
        }
    },

    /**
     * UC09: Update Badge mit Anzahl ungelesener Notifications
     */
    _updateNotificationBadge() {
        const user = UserModel.getCurrentUser();
        if (!user) return;

        const unread_count = NotificationModel.countUnread(user.id);
        const badge = document.getElementById('notification-badge');

        if (unread_count > 0) {
            badge.textContent = unread_count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
};

/**
 * Starte App wenn DOM bereit ist
 */
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    
    // UC09: Update notification badge periodisch (jede 5 Sekunden)
    setInterval(() => {
        app._updateNotificationBadge();
    }, 5000);
});
