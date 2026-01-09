# StudyQuest - Implementation

## Projekt-Übersicht

**StudyQuest** ist eine gamifizierte Web-App für Lernverwaltung und Motivation. Diese Implementierung zeigt die praktische Umsetzung der dokumentierten Anforderungen aus dem Software Development Plan.

**Status**: MVP - Kern-Features implementiert
- ✅ User Authentication (UC01-UC03)
- ✅ Quest System (UC04-UC05)
- ✅ Dashboard (UC08)
- 🚧 Notenverwaltung (UC07)
- 🚧 Gamification (UC11-UC12)

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
| `user.js` | User Model & Business Logic | UC01-UC03, UC05 |
| `quest.js` | Quest System Logic | UC04-UC05, UC14 |
| `auth.js` | Auth UI Handler | UC01-UC03 |
| `ui.js` | Page Rendering | UC08 |
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

### 2. **Dashboard anschauen** (UC08)
- Sehe: Level 1, 0 XP, 0 Quests completed
- Button: "Neue Quest starten"

### 3. **Quest starten** (UC04)
- Button: "🚀 Neue Quest starten"
- Wähle: z.B. "JavaScript Basics" (easy, 50 XP)
- → Zur Quest-Detail-Seite

### 4. **Quest abschließen** (UC05)
- Button: "✅ Quest Abschließen"
- Erfolgs-Screen: "+50 XP"
- Auto-Redirect zum Dashboard nach 2s
- Jetzt: Level 1, 50 XP, 1 Quest completed ✅

### 5. **Multiple Quests**
- 10 Quests abschließen (z.B. 10 × Easy Quest = 500 XP)
- → Level UP zu Level 2 🎉

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

## Weitere Implementierungen (Future)

### Nicht implementiert (aber vorbereitet):

**UC06**: Timer-System für Learning Sessions  
**UC07**: Grade Management (CRUD für Noten)  
**UC09**: Notifications  
**UC10**: Grade Im/Export (CSV)  
**UC11**: Achievements & Badges  
**UC12**: Leaderboard & Streaks  
**UC13**: Admin Quest-Katalog  
**UC15**: Admin Benutzerverwaltung  

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
```

### 2. Rollenbasiertes Session-Management (UC01-UC03)
```javascript
// user.js - getCurrentUser()
// Aktuelle Session in DB.STORE_CURRENT_USER gespeichert
// Auto-Logout bei Browser Close (SessionStorage simuliert)
```

### 3. Router Pattern (app.js)
```javascript
app.showDashboard()      // UC08
app.showQuestPage()      // UC04 - Quest-Auswahl
app.showActiveQuestPage()// UC05 - Quest-Detail
app.startQuest()         // UC04 - Quest starten
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
