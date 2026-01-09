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
        const currentUser = UserModel.getCurrentUser();
        
        if (currentUser) {
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

        const userObj = DB.findUser(user.id);
        if (userObj.active_quest_id === questId) {
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

        document.getElementById('nav-profile')?.addEventListener('click', () => {
            alert('Profil-Seite noch nicht implementiert');
        });

        document.getElementById('nav-logout')?.addEventListener('click', () => {
            this.logout();
        });
    }
};

/**
 * Starte App wenn DOM bereit ist
 */
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
