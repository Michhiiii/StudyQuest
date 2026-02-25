# Software Design Document (SDD) – StudyQuest

**Titel des Dokuments:**  
Software Design Document – StudyQuest

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

| **Version** | **Datum** | **Autor** | **Änderungsbeschreibung** |
| --- | --- | --- | --- |
| 1.0 | 30.01.2026 | Giuliana Carrano | Erstfassung des SDD, basiert auf Requirements und Architektur-Dokumenten |
| 1.1 | 30.01.2026 | Giuliana Carrano | Formalia ergänzt: Kopfblatt, Autoren; Emojis entfernt |
| 1.2 | 30.01.2026 | Giuliana Carrano | Distribution List und erweitertes Changelog ergänzt |

## Distribution List

| **Name**          | **Rolle**             | **Kommentar / Zuständigkeit**                 |
|--------------------|-----------------------|-----------------------------------------------|
| Sascha Wanninger   | Prüfer / Betreuer     | Bewertung im Rahmen des Moduls                |
| Michael Steer      | Scrum Master          | Koordination & Freigabe                       |
| Luke Engehardt     | Product Owner         | Anforderungen, Dokumentation & Technische Dokumentation                  |
| Giuliana Carrano   | Developer             | Projektskizze, Dokumentation, Architektur & UML                   |
| Paul Strasser      | Developer             |                      |
| Roman Faber        | Developer             |                            |

## 1. Zweck & Geltungsbereich
Dieses Dokument beschreibt die Software-Architektur und das Design der Anwendung *StudyQuest* und verbindet die vorhandenen **Requirements** und die **Softwarearchitektur-Dokumentation** mit einer konkreten technischen Implementierungsbeschreibung (Codereferenzen). Es richtet sich an Entwickler:innen, Tester:innen und Maintainer.

**Referenzen:**
- `Documents/Anforderungsanalyse/Requirements.md`
- `Documents/Softwarearchitektur/Softwarearchitektur.md`
- Quellcode: `src/` (siehe unten)

---

## 2. Systemübersicht
Kurz: Single-Page-Web-App (SPA) in **Vanilla JavaScript**, persistiert lokal via **LocalStorage**. Dreischicht-Ansatz: Presentation (`index.html`, `css/`, `ui.js`) → Application (`app.js`, `*.js`) → Data (`db.js`).

### 2.1 Hauptziele
- Gamifizierte Lernverwaltung (Quests, XP, Level, Achievements)
- Einfache Notenverwaltung mit Import/Export (CSV)
- Offline-fähig durch LocalStorage-Persistenz

---

## 3. Module & Verantwortlichkeiten
(Übersicht, Implementierung in `src/js`) 

- **`index.html` / `css/`** – UI-Templates, Styles.
- **`ui.js`** – DOM-Rendering, View-Updates, Toasts und Timer-Display.
- **`app.js`** – Router / Controller; Initialisierung, Seitenwechsel, Session-Management.
- **`auth.js`** – Registrierung, Login, Logout, „Passwort vergessen“-Flow (prototypisch).
- **`user.js`** – User-Model und Session-Logik (Level, XP-Aggregation, Rollen).
- **`quest.js`** – Quest-Lifecycle: `startQuest()`, `completeQuest()`, Timer-Schnittstellen.
- **`grade.js`** – CRUD für Noten, CSV Import/Export.
- **`achievement.js`** – Badge-Checks und Vergabe.
- **`notification.js`** – Erzeugung und Anzeige von Notifications.
- **`leaderboard.js`** – Ranking- und Streak-Berechnung.
- **`admin.js`** – Admin-Funktionen (Quest-Katalog, Regeln).
- **`db.js`** – Abstraktion der Persistenz (LocalStorage-Wrapper).

> Hinweis: Jedes Modul exportiert global/namespaced Funktionen (kein bundler/ESM aktuell).

---

## 3.1 Entwurfsmuster
Im System wird das Entwurfsmuster **Observer (Publish/Subscribe)** als Konzept für eventbasierte Nebenwirkungen vorgesehen (Notifications, Achievements, Streaks). Details, UML und Mapping auf die Module siehe: `Documents/Softwarearchitektur/DesignPattern_Observer.md`.

## 4. Datenmodell (Domänenobjekte)


Kurzbeschreibung der primären Stores (LocalStorage-Key):

- **User (`users`)**: `{ id, email, name, password_hash, role, xp, level, active_quest_id, achievements:[], last_active }`
- **Quest (`quests`)**: `{ id, title, description, difficulty, xp_reward, status }`
- **LearningSession (`sessions`)**: `{ id, user_id, quest_id, xp_earned, started_at, ended_at }`
- **Grade (`grades`)**: `{ id, user_id, subject, value, semester }`
- **Achievement (`achievements`)**: `{ id, name, condition, unlocked_by: [user_ids] }`
- **Notification (`notifications`)**: `{ id, user_id, message, read, created_at }`
- **GameRule (`game_rules`)**: `{ xp_per_difficulty, level_thresholds, max_level }`
- **Timer (`timers`)**: `{ id, user_id, quest_id, start_ts, remaining_s }`

---

## 5. Schnittstellen & API (aus Sicht der Module)
Kern-Schnittstellen (Beispiele):

- `db.get(store, id)` → Objekt | `db.save(store, obj)` → id
- `auth.register(email, password)` → { success, message }
- `auth.login(email, password)` → { success, user }
- `quest.startQuest(userId, questId)` → { success, timerId }
- `quest.completeQuest(userId, questId)` → { xpAwarded, levelUp: true/false }
- `leaderboard.getTop(n)` → Array<UserRank>
- `grade.importCSV(file)` / `grade.exportCSV()`

Event-Flow: UI → `app.js`/Controller → Business-Module → `db.js` → LocalStorage. Nach wichtigen Aktionen (QuestComplete, LevelUp) sendet das Modul Notifications/Events an `ui.js`.

---

## 6. Wichtige Algorithmen & Regeln
- **XP-Vergabe:** Basis-Wert = `game_rules.xp_per_difficulty[difficulty]` ± Boni (Time-Bonus). Implementiert in `quest.js`.
- **Level-Up:** Schwelle per `game_rules.level_thresholds` (z. B. cumulative XP). `user.updateLevel()` prüft und löst `Achievement` aus.
- **Leaderboard:** Sort by `xp` desc, Tie-Breaker: `last_active` (recent first).
- **Streaks:** Anzahl aufeinanderfolgender Tage mit mindestens einer `LearningSession`.

---

## 7. Nicht-funktionale Anforderungen & Sicherheit
- **Performance:** Dashboard/Leaderboard laden ≤ 2 s (Ziel). Vermeidung teurer Sortieroperationen auf großen Collections.
- **Security (aktuell):** Passwörter sind prototypisch gespeichert; Empfehlung: bcrypt/Argon2 + serverseitige Authentifizierung für produktive Nutzung.
- **XSS & Input Validation:** Alle Benutzereingaben vor dem Rendern escapen; `ui.js` sicheres DOM-Update.
- **Datensicherheit:** LocalStorage ist clientseitig sichtbar → sensible Daten niemals im Klartext speichern.

> Empfehlung: Für produktive Nutzung Backend mit sichere Auth-Methode, HTTPS, serverseitiger Persistenz.

---

## 8. Testkonzept
- **Unit Tests:** Modularer JS-Code in testbaren Funktionen; empfohlen: Jest/JS test runner (Refactoring zu ESM/Modules erleichtert Testability).
- **Integration Tests:** Manual / automatisiert (z. B. Playwright) für UI-Flows: Registrierung, Quest-Start/Completion, CSV-Import.
- **Testfälle (Auswahl):**
  - UC01: Registrierung mit neuer E-Mail → `users` wächst um 1.
  - UC04/05: Quest starten → Status `active`; Quest abschließen → XP erhöht, `sessions` enthält Eintrag.
  - UC10: CSV-Import fehlerhafte Datei → Fehler, keine Änderung an `grades`.

---

## 9. Deployment, Wartung & Weiterentwicklung
- **Refactor-Vorschläge:**
  - Trenne Module in ESM/TypeScript für bessere Typensicherheit und Tests.
  - Ersatz `LocalStorage` durch REST-API + DB (z. B. Firebase/Postgres) mit Migrationspfad.
  - Security-Upgrade: serverseitige Auth & Passwort-Hashing.
- **Wartung:** Dokumentation im `Documents/`-Ordner aktuell halten und Code-Dokumentation (JSDoc) ergänzen.

---

## 10. Mapping: Use Cases → Code (Kurz)
- **UC01 (Register/Login)** → `auth.js`, `user.js`, `db.js`
- **UC04/05 (Quests)** → `quest.js`, `user.js`, `db.js`, `achievement.js`, `notification.js`
- **UC06 (Timer)** → `quest.js`, `timers`-Store, `ui.js`
- **UC07/10 (Grades & CSV)** → `grade.js`, `db.js`
- **UC11/12 (Achievements/Leaderboard)** → `achievement.js`, `leaderboard.js`, `db.js`
- **Admin-UCs** → `admin.js`, `game_rules`-Store

---

## 11. Offene Punkte & Empfehlungen
- **Passwort-Handling** sofort verbessern (Hashing + Salting).  
- **Tests**: Mindestens einige Unit-Tests für `db.js`, `quest.js`, `user.js`.  
- **Modularisierung**: Wechsel zu ESM + Build-Tool (Vite) für bessere Entwickbarkeit.

---

**Anhang:** Links zu relevanten Dokumenten im Repo:  
`Documents/Anforderungsanalyse/Requirements.md`  
`Documents/Softwarearchitektur/Softwarearchitektur.md`  
`src/` (Code-Referenz)

---

*Ende SDD v1.0*
