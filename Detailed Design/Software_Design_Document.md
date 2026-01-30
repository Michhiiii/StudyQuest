# Software Design Document (SDD) – StudyQuest

## Titel des Dokuments
**Software Design Document – StudyQuest**

**Projektname:**  
StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App

**Modul:**  
Software Engineering I – Praxis

**Projektzeitraum:**  
Wintersemester 2025 / 2026

**Version:**  
1.0

**Datum:**  
30.01.2026

**Author:innen:**  
- Michael Steer (Scrum Master)  
- Luke Engehardt (Product Owner)  
- Giuliana Carrano (Developer)  
- Paul Strasser (Developer)  
- Roman Faber (Developer)

**Betreuer / Prüfer:**  
Sascha Wanninger

**Freigabe durch autorisierte Person:**  
Michael Steer (Scrum Master)

---

## Changelog

| Version | Datum | Autor | Änderungsbeschreibung |
|---|---|---|---|
| 1.0 | 30.01.2026 | Giuliana Carrano | Erstfassung des SDD, basiert auf Requirements und Architektur-Dokumenten |
| 1.1 | 30.01.2026 | Giuliana Carrano | Formalia ergänzt: Kopfblatt, Autoren |
| 1.2 | 30.01.2026 | Giuliana Carrano | Distribution List und erweitertes Changelog ergänzt |

---

## Distribution List

| Name | Rolle | Kommentar / Zuständigkeit |
|---|---|---|
| Sascha Wanninger | Prüfer / Betreuer | Bewertung im Rahmen des Moduls |
| Michael Steer | Scrum Master | Koordination & Freigabe |
| Luke Engehardt | Product Owner | Anforderungen & Dokumentation |
| Giuliana Carrano | Developer | Erstellung und Pflege SDD |
| Paul Strasser | Developer | Technische Dokumentation |
| Roman Faber | Developer | Architektur & UML |

---

## 1. Zweck & Geltungsbereich
Dieses Dokument beschreibt das **Software-Design und die konkrete Implementierungsstruktur** der Anwendung *StudyQuest*.  
Es verbindet die **Anforderungen** und die **Softwarearchitektur-Dokumentation** mit einer detaillierten Beschreibung der Module, Schnittstellen, Datenmodelle und Algorithmen.

Zielgruppe sind Entwickler:innen, Tester:innen und Maintainer des Systems.

**Referenzen:**
- `Documents/Anforderungsanalyse/Requirements.md`
- `Documents/Softwarearchitektur/Softwarearchitektur.md`
- Quellcode: `src/`

**Hinweis zu Diagrammen:**  
Die im Rahmen des Software Design Documents relevanten UML-Diagramme (Analyseklassenmodell, Sequenzdiagramme und Komponentenübersicht) sind aus Gründen der Übersichtlichkeit in einem separaten Architektur-Dokument ausgelagert.  
Dieses SDD referenziert diese Diagramme explizit und baut inhaltlich auf ihnen auf.

---

## 2. Systemübersicht
*StudyQuest* ist eine **Single-Page-Web-App (SPA)**, umgesetzt mit **Vanilla JavaScript**.  
Die Anwendung ist offline-fähig und nutzt **LocalStorage** zur clientseitigen Persistenz.

Architekturansatz: **Dreischichtmodell**
- **Presentation Layer:** `index.html`, `css/`, `ui.js`
- **Application Layer:** `app.js`, fachliche Module
- **Data Layer:** `db.js` (Persistenzabstraktion)

### 2.1 Hauptziele
- Gamifizierte Lernverwaltung (Quests, XP, Level, Achievements)
- Einfache Notenverwaltung inkl. CSV Import/Export
- Offline-Nutzung ohne Backend

### 2.2 Referenzierte Architektur- und UML-Diagramme
Die folgenden Diagramme sind Bestandteil der Softwarearchitektur-Dokumentation:

- **Komponentenübersicht / Schichtenmodell**  
  → `Documents/Softwarearchitektur/Softwarearchitektur.md`, Abschnitt *Systemarchitektur*

- **UML-Analyseklassenmodell** (z. B. User, Quest, Grade, Achievement)  
  → `Documents/Softwarearchitektur/Softwarearchitektur.md`, Abschnitt *Analyseklassenmodell*

- **Sequenzdiagramme** (z. B. Login, Quest starten, Quest abschließen)  
  → `Documents/Softwarearchitektur/Softwarearchitektur.md`, Abschnitt *Sequenzdiagramme*

Diese Diagramme bilden die Grundlage für die folgenden Designentscheidungen.

---

## 3. Module & Verantwortlichkeiten
Die Zuordnung der Module zu Domänen- und Kontrollklassen sowie deren Interaktionen ist im UML-Analyseklassenmodell und den Sequenzdiagrammen dokumentiert  
(siehe `Documents/Softwarearchitektur/Softwarearchitektur.md`).

**Übersicht der Module (`src/js`):**

- `ui.js` – DOM-Rendering, View-Updates, Timer- und Notification-Anzeige
- `app.js` – Controller / Router, Initialisierung, Seitenwechsel
- `auth.js` – Registrierung, Login, Logout, Passwort-Reset (prototypisch)
- `user.js` – User-Logik (XP, Level, Rollen)
- `quest.js` – Quest-Lifecycle, Timer-Integration
- `grade.js` – CRUD für Noten, CSV Import/Export
- `achievement.js` – Prüfung und Vergabe von Achievements
- `leaderboard.js` – Ranking- und Streak-Berechnung
- `notification.js` – Erstellung und Verwaltung von Benachrichtigungen
- `admin.js` – Admin-Funktionen (Quest-Katalog, Regeln)
- `db.js` – Abstraktion der LocalStorage-Persistenz

---

## 4. Datenmodell (Domänenobjekte)

Persistenz erfolgt über LocalStorage, getrennt nach Stores:

- **User (`users`)**  
  `{ id, email, name, password_hash, role, xp, level, active_quest_id, achievements[], last_active }`

- **Quest (`quests`)**  
  `{ id, title, description, difficulty, xp_reward, status }`

- **LearningSession (`sessions`)**  
  `{ id, user_id, quest_id, xp_earned, started_at, ended_at }`

- **Grade (`grades`)**  
  `{ id, user_id, subject, value, semester }`

- **Achievement (`achievements`)**  
  `{ id, name, condition, unlocked_by[] }`

- **Notification (`notifications`)**  
  `{ id, user_id, message, read, created_at }`

- **GameRule (`game_rules`)**  
  `{ xp_per_difficulty, level_thresholds, max_level }`

- **Timer (`timers`)**  
  `{ id, user_id, quest_id, start_ts, remaining_s }`

---

## 5. Schnittstellen & API
Zentrale Modul-Schnittstellen:

- `db.get(store, id)` → Objekt  
- `db.save(store, obj)` → id
- `auth.register(email, password)` → `{ success, message }`
- `auth.login(email, password)` → `{ success, user }`
- `quest.startQuest(userId, questId)` → `{ success, timerId }`
- `quest.completeQuest(userId, questId)` → `{ xpAwarded, levelUp }`
- `leaderboard.getTop(n)` → `Array<UserRank>`
- `grade.importCSV(file)`
- `grade.exportCSV()`

Die Aufrufreihenfolgen entsprechen den modellierten Sequenzdiagrammen  
(siehe `Documents/Softwarearchitektur/Softwarearchitektur.md`).

---

## 6. Wichtige Algorithmen & Regeln
- **XP-Vergabe:**  
  Basiswert aus `game_rules.xp_per_difficulty` plus optionale Zeitboni.
- **Level-Up:**  
  Vergleich kumulierter XP mit `level_thresholds`.
- **Leaderboard:**  
  Sortierung nach XP (absteigend), Tie-Breaker `last_active`.
- **Streaks:**  
  Aufeinanderfolgende Tage mit mindestens einer LearningSession.

---

## 7. Nicht-funktionale Anforderungen & Sicherheit
- **Performance:** Dashboard- und Leaderboard-Ladezeit ≤ 2 s (Ziel).
- **Sicherheit:** Passwortspeicherung aktuell prototypisch; Empfehlung: Hashing + Backend.
- **XSS-Schutz:** Escaping aller User-Eingaben vor DOM-Rendering.
- **Datenschutz:** Keine sensiblen Daten im Klartext speichern.

---

## 8. Testkonzept
- **Unit Tests:** Fokus auf `db.js`, `quest.js`, `user.js`
- **Integration Tests:** UI-Flows (Login, Quest-Flow, CSV-Import)
- **Beispiel-Testfälle:**
  - UC01: Registrierung → neuer User im Store
  - UC04/05: Quest starten & abschließen → XP-Erhöhung
  - UC10: Fehlerhafter CSV-Import → keine Persistenz

---

## 9. Deployment, Wartung & Weiterentwicklung
- Migration zu **ESM/TypeScript**
- Ersatz von LocalStorage durch REST-API + DB
- Einführung serverseitiger Authentifizierung
- Ergänzung von JSDoc und automatisierten Tests

---

## 10. Mapping: Use Cases → Code
Die Ableitung basiert auf den Aktivitäts- und Sequenzdiagrammen  
(siehe `Documents/Softwarearchitektur/Softwarearchitektur.md`).

- UC01 (Login/Registrierung) → `auth.js`, `user.js`, `db.js`
- UC04/05 (Quests) → `quest.js`, `achievement.js`, `notification.js`
- UC06 (Timer) → `quest.js`, `ui.js`
- UC07/10 (Grades & CSV) → `grade.js`
- UC11/12 (Achievements/Leaderboard) → `achievement.js`, `leaderboard.js`
- Admin-UCs → `admin.js`

---

## 11. Offene Punkte & Empfehlungen
- Passwort-Handling verbessern
- Systematische Unit-Tests ergänzen
- Vollständige Modularisierung (Build-Tool)

---

## Anhang
- `Documents/Anforderungsanalyse/Requirements.md`
- `Documents/Softwarearchitektur/Softwarearchitektur.md`
- `src/`

*Ende SDD*
