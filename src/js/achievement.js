/**
 * Achievement System (UC11)
 * Meilensteine und Badges basierend auf Spieleraktivität
 */

const AchievementSystem = {
    // Vordefinierte Achievements mit Unlock-Bedingungen
    ACHIEVEMENTS: {
        quest_starter: {
            key: 'quest_starter',
            title: '🎯 Quest Starters',
            description: '1 Quest abgeschlossen',
            icon: '🎯',
            unlock_condition: (stats) => stats.completedQuests >= 1
        },
        quest_warrior: {
            key: 'quest_warrior',
            title: '⚔️ Quest Warrior',
            description: '5 Quests abgeschlossen',
            icon: '⚔️',
            unlock_condition: (stats) => stats.completedQuests >= 5
        },
        quest_master: {
            key: 'quest_master',
            title: '👑 Quest Master',
            description: '10 Quests abgeschlossen',
            icon: '👑',
            unlock_condition: (stats) => stats.completedQuests >= 10
        },
        quest_legend: {
            key: 'quest_legend',
            title: '🏆 Quest Legend',
            description: '25 Quests abgeschlossen',
            icon: '🏆',
            unlock_condition: (stats) => stats.completedQuests >= 25
        },
        novice_student: {
            key: 'novice_student',
            title: '📚 Novice Student',
            description: 'Level 2 erreicht',
            icon: '📚',
            unlock_condition: (stats, user) => user.level >= 2
        },
        intermediate_scholar: {
            key: 'intermediate_scholar',
            title: '🎓 Intermediate Scholar',
            description: 'Level 5 erreicht',
            icon: '🎓',
            unlock_condition: (stats, user) => user.level >= 5
        },
        elite_scholar: {
            key: 'elite_scholar',
            title: '⭐ Elite Scholar',
            description: 'Level 10 erreicht',
            icon: '⭐',
            unlock_condition: (stats, user) => user.level >= 10
        },
        speedster: {
            key: 'speedster',
            title: '⚡ Speedster',
            description: 'Quest in unter 10 Minuten mit Timer abgeschlossen',
            icon: '⚡',
            unlock_condition: (stats) => stats.quickCompletions >= 1
        },
        efficiency_expert: {
            key: 'efficiency_expert',
            title: '🚀 Efficiency Expert',
            description: '5 Quests in unter 10 Minuten abgeschlossen',
            icon: '🚀',
            unlock_condition: (stats) => stats.quickCompletions >= 5
        },
        xp_collector: {
            key: 'xp_collector',
            title: '💰 XP Collector',
            description: '500 XP gesammelt',
            icon: '💰',
            unlock_condition: (stats, user) => user.total_xp_earned >= 500
        },
        xp_hoarder: {
            key: 'xp_hoarder',
            title: '💎 XP Hoarder',
            description: '2000 XP gesammelt',
            icon: '💎',
            unlock_condition: (stats, user) => user.total_xp_earned >= 2000
        },
        timer_enthusiast: {
            key: 'timer_enthusiast',
            title: '⏱️ Timer Enthusiast',
            description: '5 Quests mit Timer abgeschlossen',
            icon: '⏱️',
            unlock_condition: (stats) => stats.timerCompletions >= 5
        }
    },

    /**
     * Prüft alle Unlock-Bedingungen für einen User
     * Wird nach Quest-Abschluss oder Level-Up aufgerufen
     */
    checkAndUnlock(userId, user, stats) {
        const newlyUnlocked = [];

        Object.values(this.ACHIEVEMENTS).forEach(achievement => {
            // Prüfe ob Achievement bereits freigeschaltet
            if (DB.hasAchievement(userId, achievement.key)) {
                return;
            }

            // Prüfe Unlock-Bedingung
            if (achievement.unlock_condition(stats, user)) {
                const unlockedAchievement = {
                    id: 'achievement_' + userId + '_' + achievement.key + '_' + Date.now(),
                    user_id: userId,
                    key: achievement.key,
                    title: achievement.title,
                    icon: achievement.icon,
                    description: achievement.description,
                    unlocked_at: new Date().toISOString()
                };

                DB.saveAchievement(unlockedAchievement);
                newlyUnlocked.push(unlockedAchievement);

                console.log(`✓ Achievement freigeschalten: ${achievement.title}`);
            }
        });

        return newlyUnlocked;
    },

    /**
     * Holt alle freigeschalteten Achievements für einen User
     */
    getUnlocked(userId) {
        return DB.getAchievementsForUser(userId);
    },

    /**
     * Holt Anzahl freigeschalteter Achievements
     */
    getUnlockedCount(userId) {
        return DB.getUnlockedAchievementCount(userId);
    },

    /**
     * Holt alle möglichen Achievements (für Fortschrittsanzeige)
     */
    getAllAvailable() {
        return Object.values(this.ACHIEVEMENTS);
    },

    /**
     * Helper: Generiert Progress-Text für Tooltip
     */
    _getProgressText(userId, achievementKey, stats) {
        const achievement = this.ACHIEVEMENTS[achievementKey];
        if (!achievement) return 'Unbekanntes Achievement';

        const user = DB.findUser(userId);

        // Persönliche Progress-Messages für jedes Achievement
        switch(achievementKey) {
            case 'quest_starter':
                return `📋 ${stats.completedQuests}/1 Quests`;
            case 'quest_warrior':
                return `📋 ${stats.completedQuests}/5 Quests`;
            case 'quest_master':
                return `📋 ${stats.completedQuests}/10 Quests`;
            case 'quest_legend':
                return `📋 ${stats.completedQuests}/25 Quests`;
            case 'novice_student':
                return `📈 Level ${user.level}/2`;
            case 'intermediate_scholar':
                return `📈 Level ${user.level}/5`;
            case 'elite_scholar':
                return `📈 Level ${user.level}/10`;
            case 'speedster':
                return `⚡ ${stats.quickCompletions}/1 Schnell`;
            case 'efficiency_expert':
                return `⚡ ${stats.quickCompletions}/5 Schnell`;
            case 'xp_collector':
                return `💰 ${user.total_xp_earned}/500 XP`;
            case 'xp_hoarder':
                return `💰 ${user.total_xp_earned}/2000 XP`;
            case 'timer_enthusiast':
                return `⏱️ ${stats.timerCompletions}/5 Timer`;
            default:
                return achievement.description;
        }
    }
};
