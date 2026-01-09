/**
 * UI Components & Rendering
 * Baut Dashboard, Quest-Seiten und andere Views auf
 */

const UI = {
    /**
     * Zeigt Dashboard (UC08)
     */
    showDashboard() {
        const user = UserModel.getCurrentUser();
        if (!user) {
            app.showAuthPage();
            return;
        }

        const stats = QuestSystem.getQuestStats(user.id);
        const rules = DB.getGameRules();
        const xpToNextLevel = (user.level * rules.level_threshold) - user.total_xp_earned;

        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1>Willkommen, ${user.name}! 👋</h1>
                    <p class="subtitle">Dein Lernfortschritt</p>
                </div>

                <!-- User Stats -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">🎖️</div>
                        <div class="stat-content">
                            <div class="stat-value">Level ${user.level}</div>
                            <div class="stat-label">Aktuelles Level</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-content">
                            <div class="stat-value">${user.total_xp_earned}</div>
                            <div class="stat-label">Gesamt XP</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-value">${stats.completedQuests}</div>
                            <div class="stat-label">Quests abgeschlossen</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <div class="stat-value">${xpToNextLevel}</div>
                            <div class="stat-label">XP zum nächsten Level</div>
                        </div>
                    </div>
                </div>

                <!-- XP Progress Bar -->
                <div class="progress-section">
                    <h3>Level-Fortschritt</h3>
                    <div class="progress-bar">
                        <div 
                            class="progress-fill" 
                            style="width: ${(user.xp / rules.level_threshold * 100)}%"
                        ></div>
                    </div>
                    <p class="progress-text">
                        ${user.xp} / ${rules.level_threshold} XP
                    </p>
                </div>

                <!-- Active Quest Info -->
                ${user.active_quest_id ? `
                    <div class="active-quest-card">
                        <h3>⚡ Quest in Bearbeitung</h3>
                        <p id="active-quest-info"></p>
                        <button id="go-to-quest-btn" class="btn btn-secondary">
                            Zur Quest
                        </button>
                    </div>
                ` : ''}

                <!-- Actions -->
                <div class="actions-section">
                    <h3>Was möchtest du tun?</h3>
                    <div class="action-buttons">
                        <button id="start-quest-btn" class="btn btn-primary">
                            🚀 Neue Quest starten
                        </button>
                        <button id="view-quests-btn" class="btn btn-secondary">
                            📋 Alle Quests anschauen
                        </button>
                    </div>
                </div>

                <!-- Recent Sessions -->
                ${stats.recentSessions.length > 0 ? `
                    <div class="recent-section">
                        <h3>Letzte Aktivitäten</h3>
                        <div class="session-list">
                            ${stats.recentSessions.map(s => `
                                <div class="session-item">
                                    <span class="session-quest" id="session-quest-${s.quest_id}"></span>
                                    <span class="session-xp">+${s.xp_earned} XP</span>
                                    <span class="session-time">${new Date(s.completed_at).toLocaleDateString('de-DE')}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this._attachDashboardListeners();
        this._updateActiveQuestInfo();
    },

    /**
     * Zeigt Quest-Seite
     */
    showQuestPage() {
        const user = UserModel.getCurrentUser();
        if (!user) return;

        const quests = QuestSystem.getAvailableQuests();

        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="quest-container">
                <div class="quest-header">
                    <h1>Verfügbare Quests 🚀</h1>
                    <p class="subtitle">Wähle eine Quest und beginne zu lernen</p>
                </div>

                <div class="quests-grid">
                    ${quests.map(quest => {
                        const questInfo = QuestSystem.getQuestInfoForUser(user.id, quest.id);
                        const difficultyEmoji = {
                            easy: '🟢',
                            medium: '🟡',
                            hard: '🔴'
                        }[quest.difficulty] || '⚪';

                        return `
                            <div class="quest-card ${questInfo.isCompleted ? 'completed' : ''} ${questInfo.isActive ? 'active' : ''}">
                                <div class="quest-header-inner">
                                    <h3>${quest.title}</h3>
                                    <span class="difficulty-badge">
                                        ${difficultyEmoji} ${quest.difficulty}
                                    </span>
                                </div>
                                <p class="quest-description">${quest.description}</p>
                                <div class="quest-footer">
                                    <span class="xp-reward">⭐ ${questInfo.xpReward} XP</span>
                                    ${questInfo.isCompleted ? `
                                        <span class="completed-badge">✅ Abgeschlossen</span>
                                    ` : questInfo.isActive ? `
                                        <button class="btn btn-secondary btn-small" 
                                                onclick="app.continueQuest('${quest.id}')">
                                            Weitermachen
                                        </button>
                                    ` : `
                                        <button class="btn btn-primary btn-small" 
                                                onclick="app.startQuest('${quest.id}')">
                                            Starten
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <div class="back-to-dashboard">
                    <button id="back-dashboard-btn" class="btn btn-secondary">
                        ← Zurück zum Dashboard
                    </button>
                </div>
            </div>
        `;

        document.getElementById('back-dashboard-btn')?.addEventListener('click', () => {
            app.showDashboard();
        });
    },

    /**
     * Zeigt aktive Quest-Seite
     */
    showActiveQuestPage() {
        const user = UserModel.getCurrentUser();
        if (!user || !user.active_quest_id) return;

        const quest = DB.findQuest(user.active_quest_id);
        if (!quest) return;

        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="quest-detail-container">
                <div class="quest-detail-header">
                    <h1>${quest.title}</h1>
                    <p class="quest-description">${quest.description}</p>
                </div>

                <div class="quest-info">
                    <div class="info-item">
                        <span class="info-label">Schwierigkeit:</span>
                        <span class="info-value">${quest.difficulty}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">XP Belohnung:</span>
                        <span class="info-value">⭐ ${QuestSystem._calculateXPReward(quest)} XP</span>
                    </div>
                </div>

                <div class="quest-actions">
                    <p class="action-prompt">Hast du diese Quest abgeschlossen?</p>
                    <button id="complete-quest-btn" class="btn btn-success">
                        ✅ Quest Abschließen
                    </button>
                    <button id="cancel-quest-btn" class="btn btn-secondary">
                        ❌ Abbrechen
                    </button>
                </div>

                <div id="quest-result" class="quest-result"></div>
            </div>
        `;

        document.getElementById('complete-quest-btn')?.addEventListener('click', () => {
            this._completeQuestAndShow();
        });

        document.getElementById('cancel-quest-btn')?.addEventListener('click', () => {
            app.showDashboard();
        });
    },

    /**
     * Private Helper: Komplettiert Quest und zeigt Erfolgs-Screen
     */
    _completeQuestAndShow() {
        const user = UserModel.getCurrentUser();
        if (!user || !user.active_quest_id) return;

        try {
            const result = QuestSystem.completeQuest(user.id, user.active_quest_id);
            
            const resultDiv = document.getElementById('quest-result');
            resultDiv.innerHTML = `
                <div class="success-message">
                    <h2>🎉 Quest Abgeschlossen!</h2>
                    <p class="result-text">Glückwunsch, ${user.name}!</p>
                    <div class="reward-info">
                        <div class="reward-item">
                            <span class="reward-icon">⭐</span>
                            <span class="reward-text">+${result.xpEarned} XP</span>
                        </div>
                        ${result.leveledUp ? `
                            <div class="reward-item level-up">
                                <span class="reward-icon">🎖️</span>
                                <span class="reward-text">Level ${result.newLevel}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;

            // Nach 2 Sekunden zum Dashboard
            setTimeout(() => app.showDashboard(), 2000);
        } catch (error) {
            const resultDiv = document.getElementById('quest-result');
            resultDiv.innerHTML = `<div class="error-message">❌ ${error.message}</div>`;
        }
    },

    /**
     * Private Helper: Updated aktive Quest Info auf Dashboard
     */
    _updateActiveQuestInfo() {
        const user = UserModel.getCurrentUser();
        if (!user || !user.active_quest_id) return;

        const infoDiv = document.getElementById('active-quest-info');
        if (!infoDiv) return;

        const quest = DB.findQuest(user.active_quest_id);
        if (quest) {
            infoDiv.textContent = `"${quest.title}" - ${quest.description}`;
        }
    },

    /**
     * Private Helper: Dashboard Event Listener
     */
    _attachDashboardListeners() {
        document.getElementById('start-quest-btn')?.addEventListener('click', () => {
            app.showQuestPage();
        });

        document.getElementById('view-quests-btn')?.addEventListener('click', () => {
            app.showQuestPage();
        });

        document.getElementById('go-to-quest-btn')?.addEventListener('click', () => {
            app.showActiveQuestPage();
        });
    }
};
