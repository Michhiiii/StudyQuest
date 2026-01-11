# StudyQuest - Implementation

## Projekt-Übersicht

**StudyQuest** ist eine gamifizierte Web-App für Lernverwaltung und Motivation. Diese Implementierung zeigt die praktische Umsetzung der dokumentierten Anforderungen aus dem Software Development Plan.

**Status**: ✅ VOLLSTÄNDIG - Alle 15 Use Cases implementiert
- ✅ User Authentication (UC01-UC03)
- ✅ Quest System (UC04-UC05)
- ✅ Timer & XP-Bonus (UC06)
- ✅ Notenverwaltung (UC07)
- ✅ Dashboard (UC08)
- ✅ Notifications (UC09)
- ✅ Achievements & Badges (UC11)
- ✅ Leaderboard & Streaks (UC12)
- ✅ Quest-Katalog (UC13)
- ✅ Game Rules (UC14)
- ✅ Admin Panel (UC15)

---

## Implementierte Use Cases

### UC01-UC03: Authentication & User Management

**Dateien**: `js/user.js`, `js/auth.js`, `js/db.js`

- **Registrierung**: Neue User mit Email/Password
- **Login**: Authentifizierung mit Session
- **Profil**: Benutzer-Daten verwalten
- **Password Hashing**: Vereinfachtes System (Base64, sollte bcrypt sein in Production)

**Testdaten**: 
```
Email: test@example.com
Password: password123
```

### UC04-UC05: Quest System
**Dateien**: `js/quest.js`, `js/app.js`, `js/ui.js`

**UC04 - Quest starten**:
- User wählt Quest aus verfügbarem Katalog
- Quest wird als "aktiv" markiert
- Pro User nur eine aktive Quest gleichzeitig

**UC05 - Quest abschließen**:
- Atomare Transaktion: XP-Vergabe + Level-Berechnung
- Doppel-Schutz gegen mehrfache Completion
- Learning Session wird im Audit-Trail gespeichert
- Level-Up mit automatischer Berechnung

**XP-System** (UC14: Game Rules):
- Easy: 50 XP
- Medium: 100 XP  
- Hard: 150 XP
- Level-Threshold: 500 XP pro Level

### UC08: Dashboard
**Dateien**: `js/ui.js`, `css/dashboard.css`

- Benutzer-Statistiken (Level, XP, abgeschlossene Quests)
- XP Progress-Bar mit Level-Fortschritt
- Aktive Quest Info & Quick-Actions
- Letzte 5 Learning Sessions anzeigen
- Achievement-Galerie mit 11 verschiedenen Badges
- Links zu Leaderboard & Admin-Panel (für Admins)

### UC06: Timer-System
**Dateien**: `js/quest.js`, `js/ui.js`

- Countdown-Timer für Quest-Durchführung
- XP-Bonus für schnelle Completion (<10 min: +25%)
- Zeitmessung wird im Audit-Trail gespeichert
- Kann zur Effizienz-Achievement beitragen

### UC07: Notenverwaltung
**Dateien**: `js/grade.js`, `js/ui.js`, `css/style.css`

- CRUD-Operationen für Schulnoten
- CSV-Import/Export Funktionalität
- Tabellarische Darstellung mit Editierbarkeit
- Verknüpfung mit Learning Sessions

### UC09: Notifications
**Dateien**: `js/notification.js`, `js/ui.js`, `css/style.css`

- Quest-Completion Benachrichtigungen
- Level-Up Alerts
- Achievement-Unlock Benachrichtigungen
- Notification Bell mit Dropdown-Liste
- Toast-Nachrichten für Echtzeit-Feedback

### UC11: Achievements & Badges
**Dateien**: `js/achievement.js`, `js/ui.js`, `css/style.css`

11 verschiedene Badges mit Unlock-Bedingungen:
- **Quest-basiert**: Quest Starters (1), Warriors (5), Masters (10), Legends (25)
- **Level-basiert**: Novice (L2), Intermediate (L5), Elite (L10)
- **Speed**: Speedster (<10 min), Efficiency Expert (5 Quests <10 min)
- **XP**: Collector (500 XP), Hoarder (2000 XP)
- **Timer**: Enthusiast (5 Timer-Sessions)

Fortschritts-Tooltips zeigen Completion-Status.

### UC12: Leaderboard & Streaks
**Dateien**: `js/leaderboard.js`, `js/ui.js`, `css/leaderboard.css`

- **Tägliche Streaks**: Automatische Verfolgung aktueller/bester Streaks
- **Ranking-Kriterien**: 4 verschiedene Sorten
  - Nach XP (Gesamt-Punkte)
  - Nach Level (Spieler-Stufe)
  - Nach Quests (Abgeschlossene Quests)
  - Nach Streak (Aktuelle Tagessträhne)
- **Top 10 Tabelle**: 🥇🥈🥉 Medaillen-Icons
- **Persönliche Rankings**: Zeige Rang des aktuellen Users in jeder Kategorie

### UC13: Quest-Katalog-Verwaltung
**Dateien**: `js/admin.js`, `js/ui.js`, `css/admin.css`

- **Erstellen**: Neue Quests mit Title, Beschreibung, Schwierigkeit
- **Editieren**: Quest-Eigenschaften ändern
- **Löschen**: Quests aus System entfernen
- XP-Werte werden automatisch basierend auf Schwierigkeit berechnet

### UC14: Game Rules Editor
**Dateien**: `js/admin.js`, `js/ui.js`, `css/admin.css`

Konfigurierbare Parameter:
- XP pro Quest-Schwierigkeit (Easy, Medium, Hard)
- Timer-Bonus-Prozentsatz
- XP-Schwellwert pro Level
- Maximales Level

### UC15: Admin-Benutzerverwaltung
**Dateien**: `js/admin.js`, `js/ui.js`, `css/admin.css`

- **Admin-Rolle**: Erteile/Entziehe Admin-Rechte
- **Aktivierung**: Aktiviere/deaktiviere Benutzerkonten
- **Löschen**: Entferne Benutzer komplett

Nur für Admin-Users zugänglich via ⚙️ Admin-Button in der Navbar.

---

## Architektur - Implementiert nach 3-Schichten-Modell

```
┌─────────────────────────────────────────┐
│  Presentation Layer (UI)                │
│  ├── index.html (Entry Point)           │
│  ├── css/ (Styling)                     │
│  └── js/ui.js (DOM Rendering)           │
├─────────────────────────────────────────┤
│  Application/Business Logic Layer       │
│  ├── js/user.js (User Management)       │
│  ├── js/quest.js (Quest Logic)          │
│  ├── js/auth.js (Auth Handler)          │
│  └── js/app.js (App Controller)         │
├─────────────────────────────────────────┤
│  Data/Persistence Layer                 │
│  └── js/db.js (LocalStorage Manager)    │
└─────────────────────────────────────────┘
```

### Modul-Übersicht

| Modul | Funktion | Use Cases |
|---|---|---|
| `db.js` | LocalStorage Persistenz | Alle UC |
| `user.js` | User Model & Business Logic | UC01-UC03, UC05, UC12 |
| `quest.js` | Quest System Logic | UC04-UC06, UC13-UC14 |
| `grade.js` | Grade Management | UC07 |
| `notification.js` | Notification System | UC09 |
| `achievement.js` | Badge & Achievement Logic | UC11 |
| `leaderboard.js` | Ranking & Streak System | UC12 |
| `admin.js` | Admin CRUD Operations | UC13-UC15 |
| `auth.js` | Auth UI Handler | UC01-UC03 |
| `ui.js` | Page Rendering (7 Pages) | Alle UC |
| `app.js` | Router & App Controller | Zentral |

---

## Wie man die App startet

### 1. Lokal öffnen mit VS Code Live Server
```bash
# Im VS Code:
1. File → Open Folder → src/
2. Right-Click auf index.html → "Open with Live Server"
```

Oder:
```bash
# Über Terminal (npm -g live-server)
cd src
live-server
```

### 2. Browser öffnet sich auf `http://localhost:5500`

---

## Test-Szenario durchgehen

### 1. **Registrierung** (UC01)
- Tab: "Registrieren"
- Name: `Test User`
- Email: `test@example.com`
- Passwort: `password123` (2x)
- → Auto-Login zum Dashboard

### 3. **Dashboard anschauen** (UC08)
- Sehe: Level 1, 0 XP, 0 Quests completed
- Achievement-Galerie mit Badges
- Button: "Neue Quest starten"
- Button: "🏆 Leaderboard & Streaks"
- Button: (Nur für Admins) "⚙️ Admin Panel"

### 3. **Quest starten** (UC04)
- Button: "🚀 Neue Quest starten"
- Wähle: z.B. "JavaScript Basics" (easy, 50 XP)
- Timer-Countdown startet automatisch
- → Zur Quest-Detail-Seite

### 4. **Quest abschließen** (UC05)
- Button: "✅ Quest Abschließen"
- Erfolgs-Screen: "+50 XP" (ggf. +25% Bonus wenn Timer <10 min)
- Achievement-Check (falls Badges freigeschaltet werden)
- Auto-Redirect zum Dashboard nach 2s
- Jetzt: Level 1, 50 XP, 1 Quest completed ✅
- Streak: Heute 1 Tag (wächst bei nächster Quest morgen)

### 5. **Leaderboard & Streaks** (UC12)
- Button: "🏆 Leaderboard & Streaks" auf Dashboard
- Sehe: Persönliche Ränge in 4 Kategorien (XP, Level, Quests, Streak)
- Sehe: Top 10 Spieler-Ranking mit Medaillen 🥇🥈🥉
- Tägliche Streaks wachsen automatisch

### 6. **Admin-Features** (UC13-UC15, nur für erste User)
- Button: "⚙️ Admin Panel" auf Dashboard
- **Tab: Quests** - Neue Quests erstellen, existierende editieren/löschen
- **Tab: Game Rules** - XP-Werte, Level-Schwellwert, Max Level konfigurieren
- **Tab: Users** - Benutzern Admin-Rolle geben, Konten aktivieren/deaktivieren, Benutzer löschen

---

## Datenbankstruktur (LocalStorage)

```javascript
// users
[
  {
    id: "user_xyz",
    email: "test@example.com",
    password_hash: "...",
    name: "Test User",
    level: 1,
    xp: 0,
    total_xp_earned: 0,
    active_quest_id: "q001",
    quest_history: ["q001", "q002"]
  }
]

// quests
[
  {
    id: "q001",
    title: "JavaScript Basics",
    description: "Lerne die Grundlagen",
    difficulty: "easy",
    xp_reward: 50,
    status: "available"
  }
]

// learning_sessions (Audit Trail)
[
  {
    id: "session_xyz",
    user_id: "user_xyz",
    quest_id: "q001",
    xp_earned: 50,
    completed_at: "2024-01-09T10:30:00Z"
  }
]

// game_rules (Konfiguration)
{
  xp_per_easy_quest: 50,
  xp_per_medium_quest: 100,
  xp_per_hard_quest: 150,
  level_threshold: 500,
  max_level: 50
}
```

---

## Software Development Plan - Bezug

**Dokumentation**: `Documents/Prozesse & Vorgehensmodelle/SoftwareDevelopmentPlan.md`

Diese Implementierung folgt den Plan-Vorgaben:

| SDP-Punkt | Umsetzung |
|---|---|
| **Vorgehensmodell** | Scrum-inspiriert, iterativ aufgebaut |
| **Architektur** | 3-Schichten-Modell (Presentation, Application, Data) |
| **Anforderungen** | UC01-UC05, UC08, UC14 implementiert |
| **Klassenmodell** | User, Quest, LearningSession, GameRule Entities |
| **Tech-Stack** | Vanilla HTML/CSS/JS, LocalStorage DB |
| **Testing** | Manuell testbar durch UI |

**Meilenstein-Mapping**:
- M4 (19.12): Sprint 1 → Login, Noten (Basis), Dashboard ✅
- M5 (31.01): Sprint 2 → Gamification-Basis (Quest-System) ✅

---

## Weitere Implementierungen ✅ ALLE ABGESCHLOSSEN

Alle 15 Use Cases sind vollständig implementiert:

- ✅ **UC06**: Timer-System für Learning Sessions mit XP-Bonus
- ✅ **UC07**: Grade Management (CRUD für Noten)  
- ✅ **UC09**: Notifications (Bell, Dropdown, Toast)
- ✅ **UC10**: Grade Im/Export (CSV)  
- ✅ **UC11**: Achievements & Badges (11 verschiedene Typen)
- ✅ **UC12**: Leaderboard & Streaks (4 Ranking-Kriterien)
- ✅ **UC13**: Admin Quest-Katalog (Create, Edit, Delete)
- ✅ **UC14**: Game Rules Editor (XP-Werte konfigurierbar)
- ✅ **UC15**: Admin Benutzerverwaltung (Rollen, Aktivierung, Löschen)  

---

## Code-Highlights

### 1. Atomare Quest-Completion (UC05)
```javascript
// quest.js - completeQuest()
// Verhindert Doppel-XP durch sequenzielle Atomare Operation:
1. XP berechnen
2. XP zu User hinzufügen (mit Level-Logik)
3. Quest als abgeschlossen markieren
4. Learning Session ins Audit-Trail speichern
5. Achievements checken & Timer-Bonus anrechnen
```

### 2. Rollenbasiertes Session-Management (UC01-UC03)
```javascript
// user.js - getCurrentUser()
// Aktuelle Session in DB.STORE_CURRENT_USER gespeichert
// Auto-Logout bei Browser Close (SessionStorage simuliert)
// Admin-Flag für UC13-UC15
```

### 3. Tägliche Streak-Verfolgung (UC12)
```javascript
// user.js - updateStreak()
// Automatische Erkennung:
- Gleicher Tag: Streak bleibt
- Nächster Tag: Streak +1, best_streak aktualisiert
- Später: Streak auf 1 zurückgesetzt
```

### 4. Achievement Unlock System (UC11)
```javascript
// achievement.js - checkAndUnlock()
// Prüft 11 verschiedene Bedingungen:
- Quest-basiert (1, 5, 10, 25 Quests)
- Level-basiert (Level 2, 5, 10)
- Speed (Quest <10 min)
- XP (500, 2000 XP)
- Timer (5 Sessions)
// Gibt neu freigeschaltete Badges zurück
```

### 5. Router Pattern mit Admin-Kontrolle (app.js)
```javascript
app.showDashboard()      // UC08 - mit Achievements
app.showQuestPage()      // UC04 - Quest-Auswahl
app.showActiveQuestPage()// UC05 - Quest-Detail mit Timer
app.showLeaderboardPage()// UC12 - Rankings & Streaks
app.showAdminPage()      // UC13-UC15 - Nur für Admins
```

---

## Fehlerbehebung

### "User nicht gefunden"
→ Stellen Sie sicher, dass Sie eingeloggt sind

### "Diese Quest ist nicht aktiv"
→ Sie haben diese Quest nicht gestartet. Gehen Sie zurück und starten Sie sie first.

### "Email existiert bereits"
→ Verwenden Sie eine andere Email-Adresse zur Registrierung

### Daten verschwunden nach Reload
→ Browser LocalStorage wurde gelöscht. Das ist normal - Daten sind im Browser.
→ Bei Produktiv-Version: echte Datenbank verwenden (z.B. Firebase, PostgreSQL)

---

## Sicherheitshinweise ⚠️

**Diese Implementation ist für Lernzwecke!**

Production-Anforderungen:
- ❌ Password Hashing: Aktuell Base64 - MUSS bcrypt sein
- ❌ HTTPS erforderlich
- ❌ CSRF-Protection
- ❌ Rate-Limiting für Auth
- ❌ Echte Datenbank statt LocalStorage
- ❌ Backend-Validierung (aktuell nur Frontend)

---

## Kontakt & Feedback

Projekt: StudyQuest  
Semester: WS 2024/25  
Fach: Software Engineering  
Datum: Januar 2026
