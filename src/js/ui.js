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
                    <div id="timer-controls">
                        ${activeTimer ? `
                            <div class="timer-display">Verstrichene Zeit: <span id="timer-elapsed">--:--:--</span></div>
                            <button id="stop-timer-btn" class="btn btn-success">⏹️ Timer stoppen & Abschluss</button>
                        ` : `
                            <button id="start-timer-btn" class="btn btn-primary">⏱️ Timer starten</button>
                        `}
                    </div>

                    <div class="mt-2">
                        <button id="complete-quest-btn" class="btn btn-secondary">
                            ✅ Sofort abschließen (ohne Timer)
                        </button>
                        <button id="cancel-quest-btn" class="btn btn-secondary">
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
    }
};
