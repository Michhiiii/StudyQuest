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
                            <button id="manage-grades-btn" class="btn btn-secondary">
                                🧾 Noten verwalten
                            </button>
                            <button id="view-leaderboard-btn" class="btn btn-secondary">
                                🏆 Leaderboard & Streaks
                            </button>
                    </div>
                </div>

                <!-- UC11: Achievements Gallery -->
                <div class="achievements-section">
                    <h3>🏆 Achievements (${AchievementSystem.getUnlockedCount(user.id)} / ${AchievementSystem.getAllAvailable().length})</h3>
                    <div class="achievements-grid">
                        ${AchievementSystem.getUnlocked(user.id).map(ach => `
                            <div class="achievement-badge unlocked" data-tooltip="✓ Freigeschalten">
                                <div class="achievement-icon">${ach.icon}</div>
                                <div class="achievement-title">${ach.title}</div>
                            </div>
                        `).join('')}
                        ${AchievementSystem.getAllAvailable().filter(avail => 
                            !DB.hasAchievement(user.id, avail.key)
                        ).map(ach => {
                            const tooltip = AchievementSystem._getProgressText(user.id, ach.key, stats);
                            return `
                                <div class="achievement-badge locked" data-tooltip="${tooltip}">
                                    <div class="achievement-icon">🔒</div>
                                    <div class="achievement-title">${ach.title}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Recent Sessions -->
                ${stats.recentSessions.length > 0 ? `
                    <div class="recent-section">
                        <h3>Letzte Aktivitäten</h3>
                        <div class="session-list">
                            ${stats.recentSessions.map(s => {
                                const questTitle = DB.findQuest(s.quest_id)?.title || 'Unbekannte Quest';
                                return `
                                    <div class="session-item">
                                        <span class="session-quest">${questTitle}</span>
                                        <span class="session-xp">+${s.xp_earned} XP</span>
                                        <span class="session-time">${new Date(s.completed_at).toLocaleDateString('de-DE')}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this._attachDashboardListeners();
        this._updateActiveQuestInfo();
    },

    /**
     * UC12: Zeigt Leaderboard & Streaks
     */
    showLeaderboardPage() {
        const user = UserModel.getCurrentUser();
        if (!user) { app.showAuthPage(); return; }

        const appDiv = document.getElementById('app');
        const userStats = LeaderboardSystem.getUserStats(user.id);
        const top10 = LeaderboardSystem.getTop10('xp');

        appDiv.innerHTML = `
            <div class="leaderboard-container">
                <div class="leaderboard-header">
                    <h1>🏆 Leaderboard & Streaks</h1>
                    <p class="subtitle">Deine Position und tägliche Lern-Streaks</p>
                </div>

                <!-- Persönliche Streak-Info -->
                <div class="streak-card">
                    <div class="streak-item">
                        <div class="streak-icon">🔥</div>
                        <div class="streak-content">
                            <div class="streak-title">Aktuelle Serie</div>
                            <div class="streak-value">${userStats.current_streak} Tage</div>
                        </div>
                    </div>
                    <div class="streak-item">
                        <div class="streak-icon">⭐</div>
                        <div class="streak-content">
                            <div class="streak-title">Beste Serie</div>
                            <div class="streak-value">${userStats.best_streak} Tage</div>
                        </div>
                    </div>
                </div>

                <!-- Persönliche Rankings -->
                <div class="rankings-card">
                    <h3>📊 Deine Rankings</h3>
                    <div class="rankings-grid">
                        <div class="ranking-item">
                            <div class="ranking-icon">⭐</div>
                            <div class="ranking-label">XP Rang</div>
                            <div class="ranking-value">#${userStats.rank_xp}</div>
                        </div>
                        <div class="ranking-item">
                            <div class="ranking-icon">📈</div>
                            <div class="ranking-label">Level Rang</div>
                            <div class="ranking-value">#${userStats.rank_level}</div>
                        </div>
                        <div class="ranking-item">
                            <div class="ranking-icon">✅</div>
                            <div class="ranking-label">Quests Rang</div>
                            <div class="ranking-value">#${userStats.rank_quests}</div>
                        </div>
                        <div class="ranking-item">
                            <div class="ranking-icon">🔥</div>
                            <div class="ranking-label">Streak Rang</div>
                            <div class="ranking-value">#${userStats.rank_streak}</div>
                        </div>
                    </div>
                </div>

                <!-- Top 10 Leaderboard -->
                <div class="leaderboard-table-card">
                    <h3>🥇 Top 10 Spieler (nach XP)</h3>
                    <div class="leaderboard-table">
                        <div class="table-header">
                            <div class="header-rank">Platz</div>
                            <div class="header-player">Spieler</div>
                            <div class="header-stat">Level</div>
                            <div class="header-stat">XP</div>
                            <div class="header-stat">Quests</div>
                            <div class="header-stat">Streak</div>
                        </div>
                        ${top10.map((u, idx) => {
                            const isCurrentUser = u.id === user.id;
                            return `
                                <div class="table-row ${isCurrentUser ? 'highlight' : ''}">
                                    <div class="cell-rank">${this._getMedalEmoji(idx + 1)} ${idx + 1}</div>
                                    <div class="cell-player">
                                        <span class="player-avatar">${u.avatar}</span>
                                        <span class="player-name">${u.name}${isCurrentUser ? ' (Du)' : ''}</span>
                                    </div>
                                    <div class="cell-stat">${u.level}</div>
                                    <div class="cell-stat">${u.total_xp_earned}</div>
                                    <div class="cell-stat">${u.completedQuests}</div>
                                    <div class="cell-stat">🔥 ${u.best_streak}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Back Button -->
                <div class="action-buttons">
                    <button id="back-to-dashboard-btn" class="btn btn-secondary">
                        ← Zurück zum Dashboard
                    </button>
                </div>
            </div>
        `;

        document.getElementById('back-to-dashboard-btn')?.addEventListener('click', () => {
            app.showDashboard();
        });
    },

    /**
     * Helper: Medal Emoji für Platzierungen
     */
    _getMedalEmoji(rank) {
        switch(rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '•';
        }
    },

    /**
     * Zeigt Notenverwaltung (UC07)
     */
    showGradesPage() {
        const user = UserModel.getCurrentUser();
        if (!user) { app.showAuthPage(); return; }

        const grades = GradeModel.getAll(user.id);

        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="grades-container">
                <div class="grades-header">
                    <h1>Notenverwaltung</h1>
                    <p class="subtitle">Noten hinzufügen, bearbeiten oder exportieren</p>
                </div>

                <div class="grades-actions">
                    <button id="add-grade-btn" class="btn btn-primary">➕ Note hinzufügen</button>
                    <button id="export-grades-btn" class="btn btn-secondary">⬇️ CSV exportieren</button>
                    <label class="btn btn-secondary" style="display:inline-block; margin-left:0.5rem;">
                        ⬆️ CSV importieren
                        <input id="import-csv-input" type="file" accept="text/csv" style="display:none" />
                    </label>
                </div>

                <div id="grades-list" class="grades-list">
                    <table class="grades-table" style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr>
                                <th style="text-align:left; padding:8px; border-bottom:1px solid #e5e7eb;">Note</th>
                                <th style="text-align:left; padding:8px; border-bottom:1px solid #e5e7eb;">Modul</th>
                                <th style="text-align:left; padding:8px; border-bottom:1px solid #e5e7eb;">Semester</th>
                                <th style="text-align:right; padding:8px; border-bottom:1px solid #e5e7eb;">Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${grades.map(g => `
                                <tr data-id="${g.id}">
                                    <td style="padding:8px; border-bottom:1px solid #f3f4f6;">${g.grade_value}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f3f4f6;">${g.module_name}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f3f4f6;">${g.semester || ''}</td>
                                    <td style="padding:8px; border-bottom:1px solid #f3f4f6; text-align:right;">
                                        <button class="btn btn-secondary btn-small edit-grade" data-id="${g.id}">Bearbeiten</button>
                                        <button class="btn btn-danger btn-small delete-grade" data-id="${g.id}">Löschen</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="back-to-dashboard">
                    <button id="back-dashboard-from-grades" class="btn btn-secondary">← Zurück</button>
                </div>
            </div>
        `;

        // Listeners
        document.getElementById('add-grade-btn')?.addEventListener('click', () => this._showAddGradeForm());
        document.getElementById('export-grades-btn')?.addEventListener('click', () => this._exportGrades(user.id));
        document.getElementById('import-csv-input')?.addEventListener('change', (e) => this._importGradesFromFile(e, user.id));
        document.getElementById('back-dashboard-from-grades')?.addEventListener('click', () => app.showDashboard());

        // Delegated handlers for edit/delete
        document.querySelectorAll('.edit-grade').forEach(btn => btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            this._showEditGradeForm(id);
        }));
        document.querySelectorAll('.delete-grade').forEach(btn => btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (confirm('Note wirklich löschen?')) {
                GradeModel.delete(id);
                this.showGradesPage();
            }
        }));
    },

    _showAddGradeForm() {
        const appDiv = document.getElementById('app');
        appDiv.insertAdjacentHTML('beforeend', `
            <div id="grade-form-modal" class="modal">
                <div class="modal-card">
                    <h3>Neue Note hinzufügen</h3>
                    <div class="form-group"><label>Modul</label><input id="g-module" type="text" /></div>
                    <div class="form-group"><label>Note</label><input id="g-value" type="number" step="0.01" /></div>
                    <div class="form-group"><label>Semester</label><input id="g-semester" type="text" /></div>
                    <div class="form-actions">
                        <button id="save-grade-btn" class="btn btn-primary">Speichern</button>
                        <button id="cancel-grade-btn" class="btn btn-secondary">Abbrechen</button>
                    </div>
                </div>
            </div>
        `);

        document.getElementById('cancel-grade-btn')?.addEventListener('click', () => document.getElementById('grade-form-modal')?.remove());
        document.getElementById('save-grade-btn')?.addEventListener('click', () => {
            const moduleName = document.getElementById('g-module').value.trim();
            const gradeValue = document.getElementById('g-value').value;
            const semester = document.getElementById('g-semester').value.trim();
            try {
                const user = UserModel.getCurrentUser();
                GradeModel.create(user.id, moduleName, gradeValue, semester);
                document.getElementById('grade-form-modal')?.remove();
                this.showGradesPage();
            } catch (err) { alert('❌ ' + err.message); }
        });
    },

    _showEditGradeForm(gradeId) {
        const user = UserModel.getCurrentUser();
        const grades = GradeModel.getAll(user.id);
        const g = grades.find(x => x.id === gradeId);
        if (!g) return alert('Note nicht gefunden');

        const appDiv = document.getElementById('app');
        appDiv.insertAdjacentHTML('beforeend', `
            <div id="grade-form-modal" class="modal">
                <div class="modal-card">
                    <h3>Note bearbeiten</h3>
                    <div class="form-group"><label>Modul</label><input id="g-module" type="text" value="${g.module_name}" /></div>
                    <div class="form-group"><label>Note</label><input id="g-value" type="number" step="0.01" value="${g.grade_value}" /></div>
                    <div class="form-group"><label>Semester</label><input id="g-semester" type="text" value="${g.semester || ''}" /></div>
                    <div class="form-actions">
                        <button id="update-grade-btn" class="btn btn-primary">Aktualisieren</button>
                        <button id="cancel-grade-btn" class="btn btn-secondary">Abbrechen</button>
                    </div>
                </div>
            </div>
        `);

        document.getElementById('cancel-grade-btn')?.addEventListener('click', () => document.getElementById('grade-form-modal')?.remove());
        document.getElementById('update-grade-btn')?.addEventListener('click', () => {
            const moduleName = document.getElementById('g-module').value.trim();
            const gradeValue = document.getElementById('g-value').value;
            const semester = document.getElementById('g-semester').value.trim();
            try {
                GradeModel.update(gradeId, { module_name: moduleName, grade_value: gradeValue, semester });
                document.getElementById('grade-form-modal')?.remove();
                this.showGradesPage();
            } catch (err) { alert('❌ ' + err.message); }
        });
    },

    _exportGrades(userId) {
        const csv = GradeModel.exportCSV(userId);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grades_export.csv';
        a.click();
        URL.revokeObjectURL(url);
    },

    _importGradesFromFile(e, userId) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = ev.target.result;
            const count = GradeModel.importCSV(userId, text);
            alert(`✅ ${count} Noten importiert`);
            this.showGradesPage();
        };
        reader.readAsText(file, 'utf-8');
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
        // Prüfe, ob bereits ein aktiver Timer für diesen User existiert
        const activeTimer = DB.getActiveTimerForUser(user.id);

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
                    <div id="timer-controls" class="timer-controls-section">
                        ${activeTimer ? `
                            <div class="timer-display">Verstrichene Zeit: <span id="timer-elapsed">--:--:--</span></div>
                            <button id="stop-timer-btn" class="btn btn-success btn-block">⏹️ Timer stoppen & Abschluss</button>
                        ` : `
                            <button id="start-timer-btn" class="btn btn-primary btn-block">⏱️ Timer starten</button>
                        `}
                    </div>

                    <div class="quest-action-buttons">
                        <button id="complete-quest-btn" class="btn btn-secondary btn-block">
                            ✅ Sofort abschließen (ohne Timer)
                        </button>
                        <button id="cancel-quest-btn" class="btn btn-secondary btn-block">
                            ❌ Abbrechen
                        </button>
                    </div>
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

        // Attach timer listeners (start/stop) if present
        this._attachActiveQuestTimerListeners(user, quest);
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
     * Helper: Formats seconds to HH:MM:SS
     */
    _formatTime(seconds) {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    },

    /**
     * Attach Timer listeners for active quest page
     */
    _attachActiveQuestTimerListeners(user, quest) {
        // Clear any existing interval
        if (this._activeTimerInterval) {
            clearInterval(this._activeTimerInterval);
            this._activeTimerInterval = null;
        }

        const startTimerBtn = document.getElementById('start-timer-btn');
        const stopTimerBtn = document.getElementById('stop-timer-btn');
        const elapsedSpan = document.getElementById('timer-elapsed');

        if (startTimerBtn) {
            startTimerBtn.addEventListener('click', () => {
                try {
                    QuestSystem.startTimer(user.id, quest.id);
                    UI.showActiveQuestPage();
                } catch (err) {
                    alert('❌ ' + err.message);
                }
            });
        }

        if (stopTimerBtn) {
            // Update elapsed immediately and every second
            const timer = DB.getActiveTimerForUser(user.id);
            if (timer && elapsedSpan) {
                const update = () => {
                    const start = new Date(timer.start_time);
                    const now = new Date();
                    const sec = Math.max(0, Math.floor((now - start) / 1000));
                    elapsedSpan.textContent = UI._formatTime(sec);
                };
                update();
                this._activeTimerInterval = setInterval(update, 1000);
            }

            stopTimerBtn.addEventListener('click', () => {
                try {
                    const res = QuestSystem.stopTimer(user.id);
                    const resultDiv = document.getElementById('quest-result');
                    resultDiv.innerHTML = `
                        <div class="success-message">
                            <h2>🎉 Quest Abgeschlossen!</h2>
                            <p class="result-text">+${res.xpEarned} XP (inkl. Zeitbonus ${res.timeBonus})</p>
                        </div>
                    `;
                    // Clear interval
                    if (this._activeTimerInterval) { clearInterval(this._activeTimerInterval); this._activeTimerInterval = null; }
                    setTimeout(() => app.showDashboard(), 2000);
                } catch (err) {
                    alert('❌ ' + err.message);
                }
            });
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

        document.getElementById('manage-grades-btn')?.addEventListener('click', () => {
            app.showGradesPage();
        });

        document.getElementById('view-leaderboard-btn')?.addEventListener('click', () => {
            app.showLeaderboardPage();
        });

        document.getElementById('go-to-quest-btn')?.addEventListener('click', () => {
            app.showActiveQuestPage();
        });
    },

    /**
     * UC13-15: Admin Panel
     */
    showAdminPage() {
        const user = UserModel.getCurrentUser();
        if (!user || !UserModel.isAdmin(user.id)) {
            app.showDashboard();
            return;
        }

        const quests = AdminSystem.getAllQuests();
        const rules = AdminSystem.getGameRules();
        const users = AdminSystem.getAllUsers();
        const achievements = AdminSystem.getAllAchievements();

        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="admin-container">
                <div class="admin-header">
                    <h1>⚙️ Admin Panel</h1>
                    <p class="subtitle">Verwalte Quests, Regeln, Achievements und Benutzer</p>
                </div>

                <!-- Admin Tabs -->
                <div class="admin-tabs">
                    <button class="admin-tab-btn active" data-tab="quests">📋 Quests (${quests.length})</button>
                    <button class="admin-tab-btn" data-tab="achievements">🏆 Achievements (${achievements.length})</button>
                    <button class="admin-tab-btn" data-tab="rules">⚙️ Regeln</button>
                    <button class="admin-tab-btn" data-tab="users">👥 Benutzer (${users.length})</button>
                </div>

                <!-- UC13: Quest Management Tab -->
                <div class="admin-tab-content active" id="tab-quests">
                    <div class="admin-section">
                        <h2>Quest-Katalog verwalten</h2>
                        <button id="create-quest-btn" class="btn btn-primary">+ Neue Quest erstellen</button>
                        <div id="quests-list" class="quests-list">
                            ${quests.map(q => `
                                <div class="quest-item">
                                    <div class="quest-info">
                                        <div class="quest-title">${q.title}</div>
                                        <div class="quest-desc">${q.description}</div>
                                        <div class="quest-meta">
                                            <span class="badge difficulty-${q.difficulty}">${q.difficulty}</span>
                                            <span class="badge">⭐ ${q.xp_reward} XP</span>
                                        </div>
                                    </div>
                                    <div class="quest-actions">
                                        <button class="btn btn-small btn-secondary" data-action="edit-quest" data-id="${q.id}">✏️ Bearbeiten</button>
                                        <button class="btn btn-small btn-danger" data-action="delete-quest" data-id="${q.id}">🗑️ Löschen</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- UC11: Achievements Management Tab -->
                <div class="admin-tab-content" id="tab-achievements">
                    <div class="admin-section">
                        <h2>Achievements verwalten</h2>
                        <button id="create-achievement-btn" class="btn btn-primary">+ Neues Achievement erstellen</button>
                        <div id="achievements-list" class="achievements-list">
                            ${achievements.map(ach => {
                                const isCustom = AdminSystem.isCustomAchievement(ach.key);
                                return `
                                    <div class="achievement-item">
                                        <div class="achievement-info">
                                            <div class="achievement-icon" style="font-size: 2em;">${ach.icon}</div>
                                            <div class="achievement-details">
                                                <div class="achievement-title">${ach.title}</div>
                                                <div class="achievement-desc">${ach.description}</div>
                                                <div class="achievement-key">ID: ${ach.key} ${isCustom ? '<span class="badge">Benutzerdefiniert</span>' : '<span class="badge">Vordefiniert</span>'}</div>
                                            </div>
                                        </div>
                                        <div class="achievement-actions">
                                            <button class="btn btn-small btn-secondary" data-action="edit-achievement" data-key="${ach.key}">✏️ Bearbeiten</button>
                                            ${isCustom ? `<button class="btn btn-small btn-danger" data-action="delete-achievement" data-key="${ach.key}">🗑️ Löschen</button>` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- UC14: Game Rules Tab -->
                <div class="admin-tab-content" id="tab-rules">
                    <div class="admin-section">
                        <h2>Spiel-Regeln konfigurieren</h2>
                        <form id="rules-form" class="rules-form">
                            <div class="form-group">
                                <label>XP für Easy-Quests:</label>
                                <input type="number" name="xp_per_quest_easy" value="${rules.xp_per_quest_easy}" min="10">
                            </div>
                            <div class="form-group">
                                <label>XP für Medium-Quests:</label>
                                <input type="number" name="xp_per_quest_medium" value="${rules.xp_per_quest_medium}" min="10">
                            </div>
                            <div class="form-group">
                                <label>XP für Hard-Quests:</label>
                                <input type="number" name="xp_per_quest_hard" value="${rules.xp_per_quest_hard}" min="10">
                            </div>
                            <div class="form-group">
                                <label>XP pro Minute Timer:</label>
                                <input type="number" name="xp_per_minute_timer" value="${rules.xp_per_minute_timer}" min="1">
                            </div>
                            <div class="form-group">
                                <label>XP für Level-Up:</label>
                                <input type="number" name="level_threshold" value="${rules.level_threshold}" min="100">
                            </div>
                            <div class="form-group">
                                <label>Max Level:</label>
                                <input type="number" name="max_level" value="${rules.max_level}" min="10">
                            </div>
                            <button type="submit" class="btn btn-primary">💾 Änderungen speichern</button>
                        </form>
                    </div>
                </div>

                <!-- UC15: User Management Tab -->
                <div class="admin-tab-content" id="tab-users">
                    <div class="admin-section">
                        <h2>Benutzer verwalten</h2>
                        <div class="user-stats">
                            <div class="user-stat-badge">
                                <span class="stat-label">Gesamt</span>
                                <span class="stat-value">${users.length}</span>
                            </div>
                            <div class="user-stat-badge active">
                                <span class="stat-label">Aktiv</span>
                                <span class="stat-value">${users.filter(u => u.is_active).length}</span>
                            </div>
                            <div class="user-stat-badge admin">
                                <span class="stat-label">Admins</span>
                                <span class="stat-value">${users.filter(u => u.is_admin).length}</span>
                            </div>
                        </div>

                        <div class="users-list">
                            <div class="users-header">
                                <div>Benutzer</div>
                                <div>Level</div>
                                <div>XP</div>
                                <div>Status</div>
                                <div>Admin</div>
                                <div>Aktionen</div>
                            </div>
                            ${users.map(u => `
                                <div class="user-row ${!u.is_active ? 'inactive' : ''}">
                                    <div class="user-name">${u.name} (${u.email})</div>
                                    <div>${u.level}</div>
                                    <div>${u.total_xp_earned}</div>
                                    <div>
                                        <span class="status-badge ${u.is_active ? 'active' : 'inactive'}">
                                            ${u.is_active ? '✓ Aktiv' : '✗ Inaktiv'}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="admin-badge ${u.is_admin ? 'yes' : 'no'}">
                                            ${u.is_admin ? '👑 Admin' : '—'}
                                        </span>
                                    </div>
                                    <div class="user-actions">
                                        <button class="btn btn-small" data-action="toggle-admin" data-id="${u.id}">
                                            ${u.is_admin ? '👤' : '👑'}
                                        </button>
                                        <button class="btn btn-small" data-action="toggle-active" data-id="${u.id}">
                                            ${u.is_active ? '🔒' : '🔓'}
                                        </button>
                                        <button class="btn btn-small btn-danger" data-action="delete-user" data-id="${u.id}">🗑️</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Back Button -->
                <div class="action-buttons">
                    <button id="back-to-dashboard-admin-btn" class="btn btn-secondary">← Zurück</button>
                </div>
            </div>
        `;

        this._attachAdminListeners();
    },

    /**
     * Admin Event Listeners
     */
    _attachAdminListeners() {
        // Tab Switching
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`tab-${tabName}`).classList.add('active');
            });
        });

        // Create Quest
        document.getElementById('create-quest-btn')?.addEventListener('click', () => {
            const title = prompt('Quest Titel:');
            if (!title) return;
            const description = prompt('Beschreibung:');
            if (!description) return;
            const difficulty = prompt('Schwierigkeit (easy/medium/hard):');
            if (!difficulty) return;

            AdminSystem.createQuest(title, description, difficulty);
            app.showAdminPage();
        });

        // Edit Quest
        document.querySelectorAll('[data-action="edit-quest"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const questId = btn.dataset.id;
                const quest = DB.findQuest(questId);
                if (!quest) return alert('Quest nicht gefunden');

                const title = prompt('Quest Titel:', quest.title);
                if (!title) return;
                const description = prompt('Beschreibung:', quest.description);
                if (!description) return;
                const difficulty = prompt('Schwierigkeit (easy/medium/hard):', quest.difficulty);
                if (!difficulty) return;

                AdminSystem.updateQuest(questId, { title, description, difficulty });
                app.showAdminPage();
            });
        });

        // Delete Quest
        document.querySelectorAll('[data-action="delete-quest"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const questId = btn.dataset.id;
                if (confirm('Quest wirklich löschen?')) {
                    AdminSystem.deleteQuest(questId);
                    app.showAdminPage();
                }
            });
        });

        // Rules Form
        document.getElementById('rules-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updates = Object.fromEntries(formData);
            
            // Convert to numbers
            Object.keys(updates).forEach(key => {
                updates[key] = parseInt(updates[key]);
            });

            AdminSystem.updateGameRules(updates);
            alert('✓ Regeln aktualisiert');
        });

        // User Management
        document.querySelectorAll('[data-action="toggle-admin"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.id;
                AdminSystem.toggleAdminRole(userId);
                app.showAdminPage();
            });
        });

        document.querySelectorAll('[data-action="toggle-active"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.id;
                AdminSystem.toggleUserActive(userId);
                app.showAdminPage();
            });
        });

        document.querySelectorAll('[data-action="delete-user"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.id;
                if (confirm('Benutzer wirklich löschen?')) {
                    AdminSystem.deleteUser(userId);
                    app.showAdminPage();
                }
            });
        });

        // Achievement Management
        document.getElementById('create-achievement-btn')?.addEventListener('click', () => {
            this._showCreateAchievementModal();
        });

        document.querySelectorAll('[data-action="edit-achievement"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.key;
                this._showEditAchievementModal(key);
            });
        });

        document.querySelectorAll('[data-action="delete-achievement"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.key;
                const ach = AchievementSystem.ACHIEVEMENTS[key];
                if (confirm(`Achievement "${ach.title}" wirklich löschen?`)) {
                    try {
                        AdminSystem.deleteAchievement(key);
                        app.showAdminPage();
                    } catch (err) {
                        alert('❌ ' + err.message);
                    }
                }
            });
        });

        document.getElementById('back-to-dashboard-admin-btn')?.addEventListener('click', () => {
            app.showDashboard();
        });
    },

    /**
     * Achievement Management Modals
     */
    _showCreateAchievementModal() {
        const unlockTypes = AdminSystem.getUnlockConditionTypes();
        const unlockTypeOptions = unlockTypes.map(t => `<option value="${t.key}">${t.icon} ${t.label}</option>`).join('');
        
        const appDiv = document.getElementById('app');
        appDiv.insertAdjacentHTML('beforeend', `
            <div id="achievement-modal" class="modal">
                <div class="modal-card" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
                    <h3>Neues Achievement erstellen</h3>
                    <div class="form-group">
                        <label>Achievement ID (Eindeutig):</label>
                        <input id="ach-key" type="text" placeholder="z.B. super_speedster" />
                    </div>
                    <div class="form-group">
                        <label>Titel:</label>
                        <input id="ach-title" type="text" placeholder="z.B. 🚀 Super Speedster" />
                    </div>
                    <div class="form-group">
                        <label>Beschreibung:</label>
                        <textarea id="ach-desc" placeholder="z.B. Quest in unter 5 Minuten abgeschlossen" style="width:100%; min-height:60px;"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Icon/Emoji:</label>
                        <input id="ach-icon" type="text" placeholder="z.B. 🚀" maxlength="2" />
                    </div>
                    <div class="form-group">
                        <label>Freischalt-Bedingung:</label>
                        <select id="ach-unlock-type" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem;">
                            ${unlockTypeOptions}
                        </select>
                    </div>
                    <div class="form-group" id="ach-value-group" style="display: none;">
                        <label id="ach-value-label">Wert:</label>
                        <input id="ach-unlock-value" type="number" min="1" placeholder="z.B. 10" />
                    </div>
                    <div class="form-actions">
                        <button id="save-achievement-btn" class="btn btn-primary">Erstellen</button>
                        <button id="cancel-achievement-btn" class="btn btn-secondary">Abbrechen</button>
                    </div>
                </div>
            </div>
        `);

        // Zeige/Verstecke Value-Input basierend auf Unlock-Type
        const unlockTypeSelect = document.getElementById('ach-unlock-type');
        const valueGroup = document.getElementById('ach-value-group');
        const valueLabel = document.getElementById('ach-value-label');
        
        const updateValueInput = () => {
            const selectedType = unlockTypeSelect.value;
            const type = unlockTypes.find(t => t.key === selectedType);
            
            if (['quest_count', 'level', 'xp'].includes(selectedType)) {
                valueGroup.style.display = 'block';
                if (selectedType === 'quest_count') valueLabel.textContent = 'Anzahl Quests:';
                else if (selectedType === 'level') valueLabel.textContent = 'Level:';
                else if (selectedType === 'xp') valueLabel.textContent = 'XP:';
            } else {
                valueGroup.style.display = 'none';
            }
        };
        
        unlockTypeSelect.addEventListener('change', updateValueInput);

        document.getElementById('cancel-achievement-btn')?.addEventListener('click', () => {
            document.getElementById('achievement-modal')?.remove();
        });

        document.getElementById('save-achievement-btn')?.addEventListener('click', () => {
            const key = document.getElementById('ach-key').value.trim();
            const title = document.getElementById('ach-title').value.trim();
            const desc = document.getElementById('ach-desc').value.trim();
            const icon = document.getElementById('ach-icon').value.trim();
            const unlockType = document.getElementById('ach-unlock-type').value;
            const unlockValue = document.getElementById('ach-unlock-value').value ? parseInt(document.getElementById('ach-unlock-value').value) : null;

            if (!key || !title || !desc || !icon) {
                alert('❌ Bitte alle Felder ausfüllen');
                return;
            }

            try {
                AdminSystem.createAchievementWithCondition(key, title, desc, icon, unlockType, unlockValue);
                document.getElementById('achievement-modal')?.remove();
                app.showAdminPage();
            } catch (err) {
                alert('❌ ' + err.message);
            }
        });
    },

    _showEditAchievementModal(key) {
        const ach = AchievementSystem.ACHIEVEMENTS[key];
        if (!ach) return alert('Achievement nicht gefunden');

        const unlockTypes = AdminSystem.getUnlockConditionTypes();
        const unlockTypeOptions = unlockTypes.map(t => `<option value="${t.key}" ${ach.unlock_type === t.key ? 'selected' : ''}>${t.icon} ${t.label}</option>`).join('');
        
        const appDiv = document.getElementById('app');
        appDiv.insertAdjacentHTML('beforeend', `
            <div id="achievement-modal" class="modal">
                <div class="modal-card" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
                    <h3>Achievement bearbeiten</h3>
                    <div class="form-group">
                        <label>Achievement ID (nur Anzeige):</label>
                        <input type="text" value="${key}" disabled />
                    </div>
                    <div class="form-group">
                        <label>Titel:</label>
                        <input id="ach-title" type="text" value="${ach.title}" />
                    </div>
                    <div class="form-group">
                        <label>Beschreibung:</label>
                        <textarea id="ach-desc" style="width:100%; min-height:60px;">${ach.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Icon/Emoji:</label>
                        <input id="ach-icon" type="text" value="${ach.icon}" maxlength="2" />
                    </div>
                    <div class="form-group">
                        <label>Freischalt-Bedingung:</label>
                        <select id="ach-unlock-type" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem;">
                            ${unlockTypeOptions}
                        </select>
                    </div>
                    <div class="form-group" id="ach-value-group" style="display: ${['quest_count', 'level', 'xp'].includes(ach.unlock_type) ? 'block' : 'none'};">
                        <label id="ach-value-label">Wert:</label>
                        <input id="ach-unlock-value" type="number" min="1" value="${ach.unlock_value || ''}" placeholder="z.B. 10" />
                    </div>
                    <div class="form-actions">
                        <button id="update-achievement-btn" class="btn btn-primary">Speichern</button>
                        <button id="cancel-achievement-btn" class="btn btn-secondary">Abbrechen</button>
                    </div>
                </div>
            </div>
        `);

        // Zeige/Verstecke Value-Input basierend auf Unlock-Type
        const unlockTypeSelect = document.getElementById('ach-unlock-type');
        const valueGroup = document.getElementById('ach-value-group');
        const valueLabel = document.getElementById('ach-value-label');
        
        const updateValueInput = () => {
            const selectedType = unlockTypeSelect.value;
            const type = unlockTypes.find(t => t.key === selectedType);
            
            if (['quest_count', 'level', 'xp'].includes(selectedType)) {
                valueGroup.style.display = 'block';
                if (selectedType === 'quest_count') valueLabel.textContent = 'Anzahl Quests:';
                else if (selectedType === 'level') valueLabel.textContent = 'Level:';
                else if (selectedType === 'xp') valueLabel.textContent = 'XP:';
            } else {
                valueGroup.style.display = 'none';
            }
        };
        
        unlockTypeSelect.addEventListener('change', updateValueInput);

        document.getElementById('cancel-achievement-btn')?.addEventListener('click', () => {
            document.getElementById('achievement-modal')?.remove();
        });

        document.getElementById('update-achievement-btn')?.addEventListener('click', () => {
            const title = document.getElementById('ach-title').value.trim();
            const desc = document.getElementById('ach-desc').value.trim();
            const icon = document.getElementById('ach-icon').value.trim();
            const unlockType = document.getElementById('ach-unlock-type').value;
            const unlockValue = document.getElementById('ach-unlock-value').value ? parseInt(document.getElementById('ach-unlock-value').value) : null;

            if (!title || !desc || !icon) {
                alert('❌ Bitte alle Felder ausfüllen');
                return;
            }

            try {
                AdminSystem.updateAchievement(key, { title, description: desc, icon, unlock_type: unlockType, unlock_value: unlockValue });
                document.getElementById('achievement-modal')?.remove();
                app.showAdminPage();
            } catch (err) {
                alert('❌ ' + err.message);
            }
        });
    }
};
