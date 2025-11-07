'========================================
' UC09: Benachrichtigungen & Reminder verwalten
'========================================
@startuml UC09_Notifications
actor User as "Studierende:r"
participant NotificationView
participant NotificationController
participant NotificationService

User -> NotificationView: Einstellungen öffnen
NotificationView -> NotificationController: updateSettings(UserID, settings)
NotificationController -> NotificationService: saveSettings(UserID, settings)
NotificationService --> NotificationController: Bestätigung
NotificationController -> NotificationView: Einstellungen gespeichert
NotificationView -> User: Zeige aktuelle Einstellungen
@enduml

'========================================
' UC10: Noten importieren oder exportieren
'========================================
@startuml UC10_ImportExport
actor User as "Studierende:r"
participant GradeView
participant GradeController
participant GradeManager
participant FileService

User -> GradeView: Import/Export starten
GradeView -> GradeController: importExportGrades(file)
GradeController -> FileService: verarbeiteDatei(file)
FileService -> GradeManager: updateGrades(UserID, Daten)
GradeManager --> GradeController: Bestätigung
GradeController -> GradeView: Zeige aktualisierte Noten
GradeView -> User: Import/Export abgeschlossen
@enduml

'========================================
' UC11: Achievements / Badges freischalten
'========================================
@startuml UC11_Badges
actor User as "Studierende:r"
participant Progress
participant BadgeService
participant Dashboard

User -> Progress: prüfeMeilensteine(UserID)
Progress -> BadgeService: neueBadges(UserID)
BadgeService --> Progress: Badge freigeschaltet
Progress -> Dashboard: aktualisiereBadges(UserID)
Dashboard -> User: Zeige neue Badges
@enduml

'========================================
' UC12: Leaderboard & Streaks anzeigen
'========================================
@startuml UC12_Leaderboard
actor User as "Studierende:r"
participant Dashboard
participant LeaderboardService
participant Progress

User -> Dashboard: Leaderboard öffnen
Dashboard -> LeaderboardService: ladeRangliste()
LeaderboardService -> Progress: holeXP(UserID)
Progress --> LeaderboardService: XP-Status
LeaderboardService --> Dashboard: Rangliste + Streaks
Dashboard -> User: Zeige Rangliste & Streaks
@enduml

'========================================
' UC13: Quest-Katalog verwalten (Admin)
'========================================
@startuml UC13_QuestCatalog
actor Admin
participant QuestController
participant QuestRepository
participant QuestView

Admin -> QuestView: Quest erstellen / bearbeiten / löschen
QuestView -> QuestController: updateQuest(questData)
QuestController -> QuestRepository: saveQuest(questData)
QuestRepository --> QuestController: Bestätigung
QuestController -> QuestView: Quest-Katalog aktualisiert
QuestView -> Admin: Zeige aktualisierten Katalog
@enduml

'========================================
' UC14: XP- und Levelregeln konfigurieren (Admin)
'========================================
@startuml UC14_XPLevelConfig
actor Admin
participant ConfigView
participant ConfigController
participant GamificationEngine

Admin -> ConfigView: Regeln bearbeiten
ConfigView -> ConfigController: saveRules(rules)
ConfigController -> GamificationEngine: updateRules(rules)
GamificationEngine --> ConfigController: Bestätigung
ConfigController -> ConfigView: Regeln gespeichert
ConfigView -> Admin: Zeige aktualisierte Regeln
@enduml

'========================================
' UC15: Benutzerkonten administrieren (Admin)
'========================================
@startuml UC15_UserManagement
actor Admin
participant UserController
participant UserRepository
participant AdminView

Admin -> AdminView: Benutzerkonto auswählen / ändern
AdminView -> UserController: updateUserStatus(UserID, action)
UserController -> UserRepository: applyChanges(UserID, action)
UserRepository --> UserController: Bestätigung
UserController -> AdminView: Kontostatus aktualisiert
AdminView -> Admin: Zeige aktueller Kontostatus
@enduml
