# Software Verification Plan – StudyQuest

---

**Titel des Dokuments:**  
Software Verification Plan – StudyQuest

**Projektname:**  
StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App

**Modul:**  
Software Engineering I – Praxis

**Projektzeitraum:**  
Wintersemester 2025 / 2026

**Version:**  
1.3

**Datum:**  
28. Februar 2026

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

| **Version** | **Datum**   | **Autor**         | **Änderungsbeschreibung**                   |
|--------------|-------------|-------------------|---------------------------------------------|
| 1.0          | 17.10.2025  | M. Steer          | Erstfassung des Software Verification Plans erstellt      |
| 1.1          | 30.10.2025            | M. Steer          | Änderungen nach Review            |
| 1.2 | 13.01.2026 | M. Steer | Anpassung an v1.0 | 
| 1.3          | 28.02.2026            | M. Steer                  | Finalversion zur Abgabe vorbereitet         |

---

## Distribution List

| **Name**          | **Rolle**             | **Kommentar / Zuständigkeit**                 |
|--------------------|-----------------------|-----------------------------------------------|
| Sascha Wanninger   | Prüfer / Betreuer     | Bewertung im Rahmen des Moduls                |
| Michael Steer      | Scrum Master          | Koordination & Freigabe                       |
| Luke Engehardt     | Product Owner         | Anforderungen, Dokumentation & Technische Dokumentation                  |
| Giuliana Carrano   | Developer             | Projektskizze, Dokumentation, Architektur & UML                   |
| Paul Strasser      | Developer             |                      |
| Roman Faber        | Developer             |                            |
---
---

## 1. Einleitung & Zielsetzung

Dieser Software Verification Plan (SVP) beschreibt, **wie** die StudyQuest-Web-App systematisch verifiziert wird, sodass die Implementierung in `src/` die spezifizierten Anforderungen erfüllt und zuverlässig funktioniert.

**Verifikationsziel:**

- Abdeckung der Anforderungen aus `Documents/Anforderungsanalyse/Requirements.md` (funktional + nicht-funktional).  
- Nachweis der korrekten Umsetzung der 15 Use Cases (UC01–UC15).  
- Sicherstellung von Nachvollziehbarkeit (Traceability) zwischen Anforderungen ↔ Testfällen ↔ Ergebnissen.

---

## 2. Anwendungsbereich

### 2.1 Verifikationsobjekt (Software Item)

- **Typ:** Client-side Web App (HTML/CSS/JavaScript)  
- **Persistenz:** Browser LocalStorage  
- **Entry Point:** `src/index.html`  
- **Wesentliche Module:**  
  - Presentation: `ui.js`, `index.html`, `css/*`
  - Business Logic: `user.js`, `quest.js`, `grade.js`, `leaderboard.js`, `achievement.js`, `admin.js`, `auth.js`
  - Data Layer: `db.js`

### 2.2 In Scope / Out of Scope

**In Scope**
- Funktionale Umsetzung UC01–UC15 inkl. Datenpersistenz im LocalStorage
- UI-Workflows (Happy Path + negative Tests)
- Performance-Ziele aus Requirements (z. B. Dashboard ≤ 2s)
- Zugriffsschutz (Login/Session, Admin-Rechte) soweit in Client-Architektur umsetzbar

**Out of Scope / Einschränkungen**
- „Serverseitige“ Anforderungen (z. B. 401 API-Calls, serverseitige Logs) sind in der reinen Client-Architektur nur **äquivalent** über lokale Audit-Trails testbar.
- Kryptografisch starkes Password Hashing (bcrypt) ist im Prototyp ggf. nicht umgesetzt; wird als **Security-Deviation** dokumentiert, wenn Acceptance Criteria nicht erfüllt werden.
- E-Mail/Push-basierte Flows (Passwort-Reset-Mail, Push-Reminder) sind ohne Backend/Provider nicht end-to-end verifizierbar.

### 2.3 Codeabgleich (Stand: 28.02.2026)

Die Verifikation wurde mit dem aktuellen Code in `10_Durchfuehrung/src/` abgeglichen. Folgende Punkte sind als bekannte Abweichungen markiert und werden im SVP als Deviation/INS statt als erfolgreicher Systemtest geführt:

- **UC02 (Passwort-Reset):** nicht implementiert (kein Reset-UI, kein Token-Flow, kein Mailversand).
- **UC06-F3:** Timer-Pause/Fortsetzen nicht implementiert (vorhanden: Start/Stop, Ein-Timer-Regel).
- **UC06-F7:** Reconnect/Sync-Pufferlogik nicht implementiert.
- **UC09-F1..F3:** keine Benachrichtigungs-Einstellungen/Reminder-Toggles; implementiert ist Notification-Anzeige mit Read/Clear.
- **UC09-NF2:** keine Push-/E-Mail-Zustellung.
- **UC13-NF3/NF4, UC14-NF2, UC15-NF2:** keine Versionierungs-/Auditlog-Mechanik im Persistenzmodell.
- **UC07-F4, UC08-F5:** Notendurchschnitt/Notenstatistik im Dashboard sind in v1.0 nicht umgesetzt.

---

## 4. Verifikationsstrategie

### 4.1 Verifikationsmethoden (ECSS-Style)

| Methode | Kürzel | Beschreibung | Beispiele in StudyQuest |
|---|---:|---|---|
| Test | TST | Ausführen der Software und Vergleich mit Sollverhalten | UC-Workflows im Browser, Timer/Quest/Noten |
| Analyse | ANL | Messung/Bewertung ohne vollständige Ausführung | Ladezeiten, Timer-Abweichung, CSV Performance |
| Inspektion | INS | Review von Artefakten (Code/Doku) | Passwortspeicherung, Rollenchecks, Doku-Konsistenz |
| Demonstration | DEM | Geführtes Durchklicken zur Funktionsdemonstration | Smoke-Test, Admin-Panel Demo |

### 4.2 Testlevel

- **Unit-ish Tests (optional):** Business-Logik-Funktionen in Isolation (sofern Testharness ergänzt wird).
- **Integration Tests:** Zusammenspiel Business-Logik ↔ Data Layer (LocalStorage) ↔ UI.
- **System Tests (Schwerpunkt):** End-to-End Use Case Tests im Browser.

### 4.3 Entry-/Exit-Kriterien

**Entry**
- Requirements baseline ist freigegeben (Version 1.x).
- Build/Start der App funktioniert via Live Server.
- Testdaten/Accounts vorhanden (oder LocalStorage zurückgesetzt).

**Exit**
- Alle „Muss“-Anforderungen haben mindestens 1 verknüpften Testfall und ein Ergebnis.
- Abweichungen sind als Defects/Deviations dokumentiert (inkl. Impact & Entscheidung).
- Testreport inkl. Traceability-Matrix liegt vor.

---

## 5. Verifikationsumgebung

### 5.1 Hardware/OS

- Standard-Entwickler-Laptop/PC
- Windows 11 / macOS / Linux (mindestens 1 Plattform, ideal 2)

### 5.2 Software

- Browser: Chrome (stable), Firefox (stable), Safari (macOS)
- VS Code + Live Server (oder äquivalenter static web server)
- Optional Automation: Node.js (>=18), Playwright, Jest, ESLint

### 5.3 Testdaten

- Default Quests via `DB.init()`
- Test-User:
  - `test@example.com` / `password123` (falls genutzt)
- Admin: erster registrierter User (laut Implementierung)

---

## 6. Testfallkatalog

### 6.1 Übersicht

| TC | Title | Level | Method | Related |
| --- | --- | --- | --- | --- |
| TC-GEN-01 | Smoke-Test: App startet & DB wird initialisiert | System | DEM/TST | UC08-F1, UC08-NF2 |
| TC-UC01-01 | Registrierung erfolgreich (neue E-Mail) | System | TST | UC01-F1 |
| TC-UC01-02 | Registrierung verhindert Duplikat-E-Mail | System | TST | UC01-F2 |
| TC-UC01-03 | Login (gültig/ungültig) & Dashboard-Navigation | System | TST | UC01-F3, UC01-F4 |
| TC-UC01-NF-01 | Security: Passwort nicht im Klartext + neutrale Fehlermeldungen | System | INS/TST | UC01-NF1, UC01-NF2 |
| TC-UC02-01 | Passwort-Reset Feature-Check (nicht implementiert) | System | INS | UC02-F1, UC02-NF1 (Deviation) |
| TC-UC02-02 | Reset-Token/Ablaufzeit Feature-Check (nicht implementiert) | System | INS | UC02-F2, UC02-NF2 (Deviation) |
| TC-UC02-03 | Passwortwechsel-Flow Feature-Check (nicht implementiert) | System | INS | UC02-F3, UC02-F4 (Deviation) |
| TC-UC03-01 | Profil anzeigen | System | TST | UC03-F1 |
| TC-UC03-02 | Profil ändern: Name/Avatar speichern & wieder anzeigen | System | TST | UC03-F2, UC03-F3 |
| TC-UC03-NF-01 | Zugriffsschutz & Fehlermeldungen bei Profiländerung | System | TST | UC03-NF1, UC03-NF2 |
| TC-UC04-01 | Quest auswählen & starten (Status + Startzeit) | System | TST | UC04-F1, UC04-F2, UC04-F3 |
| TC-UC04-02 | Nur eine aktive Quest: Start einer zweiten Quest blockiert | System | TST | UC04-F4, UC04-F5 |
| TC-UC04-NF-01 | Performance: Statuswechsel beim Start ≤ 1s | System | ANL/TST | UC04-NF1 |
| TC-UC05-01 | Quest abschließen: XP-Vergabe, Endzeit, Status | System | TST | UC05-F1, UC05-F2, UC05-F5, UC05-NF4 |
| TC-UC05-02 | Atomare XP-Vergabe: Doppelklick/Mehrfach-Submit | System | TST | UC05-NF2 |
| TC-UC05-03 | Level-Up: Schwellenwert & visuelles Feedback | System | TST | UC05-F3, UC05-F4 |
| TC-UC05-NF-01 | Performance: Abschlussreaktion ≤ 2s | System | ANL/TST | UC05-NF1 |
| TC-UC06-01 | Timer starten: Startzeit & Persistenz | System | TST | UC06-F1, UC06-F2 |
| TC-UC06-02 | Ein-Timer-Regel (Pause/Fortsetzen nicht implementiert) | System | TST/INS | UC06-F6, UC06-F3 (Deviation) |
| TC-UC06-03 | Timer stoppen: Dauerberechnung & optionale XP-Vergabe | System | TST | UC06-F4, UC06-F5 |
| TC-UC06-04 | Timer bleibt nach Reload erhalten | System | TST | UC06-NF2 |
| TC-UC06-NF-01 | Timer-Genauigkeit & Response-Time | System | ANL/TST | UC06-NF1, UC06-NF4 |
| TC-UC07-01 | Noten anlegen | System | TST | UC07-F1 |
| TC-UC07-02 | Noten bearbeiten & löschen | System | TST | UC07-F2, UC07-F3, UC07-F5, UC07-NF1 |
| TC-UC07-03 | Durchschnittsberechnung & Datenkonsistenz | System | TST | UC07-F4, UC07-NF2 |
| TC-UC08-01 | Dashboard zeigt korrekte Statistiken (XP/Level/Quests/Noten) | System | TST | UC08-F1, UC08-F2, UC08-F3, UC08-F4, UC08-F5 |
| TC-UC08-NF-01 | Dashboard Ladezeit ≤ 2s + Browser-Kompatibilität | System | ANL/TST | UC08-NF1, UC08-NF2 |
| TC-UC09-01 | In-App Notifications: anzeigen, gelesen markieren, alle gelesen | System | TST/INS | UC09-F4 (teilweise), UC09-F1..F3 (Deviation) |
| TC-UC09-NF-01 | In-App Notification Reaktionsverhalten (keine Push/E-Mail) | System | TST/INS | UC09-NF1 (teilweise), UC09-NF2 (Deviation) |
| TC-UC10-01 | CSV Export: Inhalt & Format korrekt | System | TST | UC10-F2 |
| TC-UC10-02 | CSV Import: gültige Datei | System | TST | UC10-F1 |
| TC-UC10-03 | CSV Import: ungültige Datei -> Fehlermeldung | System | TST | UC10-F3 |
| TC-UC10-NF-01 | Performance Import/Export ≤ 5s bei 100 Einträgen | System | ANL/TST | UC10-NF1 |
| TC-UC11-01 | Badges werden bei erfüllter Bedingung freigeschaltet | System | TST | UC11-F1, UC11-F2 |
| TC-UC11-02 | Visuelles Feedback + Badge-Übersicht | System | TST | UC11-F3, UC11-F4 |
| TC-UC11-NF-01 | Automatischer Badge-Check nach relevanten Aktionen | System | TST | UC11-NF1 |
| TC-UC12-01 | Leaderboard: Ranking in 4 Kategorien + persönliche Position | System | TST | UC12-F1, UC12-F4 |
| TC-UC12-02 | Streak-Berechnung & Aktualisierung | System | TST | UC12-F2, UC12-F3 |
| TC-UC12-NF-01 | Performance: Leaderboard ≤ 3s | System | ANL/TST | UC12-NF1 |
| TC-UC13-01 | Admin Login/Access: Admin sieht Admin Panel, Non-Admin nicht | System | TST | UC13-F1, UC13-NF2 |
| TC-UC13-02 | Quest CRUD im Admin Panel (Create/Update/Delete) | System | TST | UC13-F2, UC13-F3, UC13-F4, UC13-F5, UC13-F6 |
| TC-UC13-NF-01 | Admin Änderungen sichtbar ≤ 2s | System | ANL/TST | UC13-NF1 |
| TC-UC14-01 | Game Rules ändern & sofort wirksam | System | TST | UC14-F1, UC14-F2, UC14-F3, UC14-F4, UC14-F5 |
| TC-UC14-NF-01 | Sicherheit & Performance beim Speichern (Auditlog Deviation) | System | TST/ANL/INS | UC14-NF3, UC14-NF4, UC14-NF2 (Deviation) |
| TC-UC15-01 | User-Administration: Admin-Rechte, Aktiv/Deaktiv, Löschen | System | TST/INS | UC15-F1, UC15-F4, UC15-F5, UC15-F2/F3 (Deviation) |
| TC-UC15-NF-01 | Zugriffsschutz + Reaktionszeit ≤ 2s (ohne Auditlog) | System | TST/ANL/INS | UC15-NF1, UC15-NF3, UC15-NF2 (Deviation) |

### 7.2 Detaillierte Testfallbeschreibungen (Auswahl)

Hinweis: Testfälle mit Kennzeichnung **(Deviation)** werden im aktuellen Projektstand nicht als „bestanden" im Sinne einer Feature-Implementierung gewertet, sondern als dokumentierte Lücke zwischen Requirement und v1.0-Codebasis (Inspection-Nachweis). 

Ausführliche Beschreibungen sind für folgende kritische Testfälle dokumentiert; übrige TCs sind in Kurzform mit Pass-Kriterium im Katalog (7.1) geführt.

### TC-GEN-01 – Smoke-Test: App startet & DB wird initialisiert

- **Testlevel:** System
- **Methode:** DEM/TST
- **Verifizierte Anforderungen:** UC08-F1, UC08-NF2
- **Vorbedingungen:** Live Server läuft; Browser Cache leer; LocalStorage für Domain leer.

**Schritte**
1) src/index.html via Live Server öffnen
2) DevTools Console prüfen
3) Seite neu laden (Ctrl+R)
4) LocalStorage Keys prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
App lädt ohne JS-Fehler; Navbar abhängig vom Login-Status; DB.init legt Default-Stores an (users, quests, learning_sessions, ...).

### TC-UC01-01 – Registrierung erfolgreich (neue E-Mail)

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC01-F1
- **Vorbedingungen:** App geöffnet; keine User mit der Test-E-Mail existieren.

**Schritte**
1) Registrieren-Tab öffnen
2) Name, E-Mail, Passwort (>=6 Zeichen) eingeben
3) Absenden
4) LocalStorage 'users' prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Neuer User-Datensatz wird angelegt; User ist eingeloggt; Dashboard wird angezeigt.

### TC-UC01-02 – Registrierung verhindert Duplikat-E-Mail

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC01-F2
- **Vorbedingungen:** Mindestens ein User mit der Test-E-Mail existiert.

**Schritte**
1) Erneut Registrieren mit gleicher E-Mail
2) Absenden

**Erwartetes Ergebnis / Pass-Kriterium**
Registrierung wird abgelehnt; Fehlermeldung erscheint; kein zweiter Datensatz entsteht.

### TC-UC01-03 (Kurzform)
- **Testlevel:** System | **Methode:** TST | **Anforderungen:** UC01-F3, UC01-F4
- **Pass-Kriterium:** Login mit korrekten Daten zeigt Dashboard; falsches Passwort wird abgelehnt.

### TC-UC01-NF-01 (Kurzform)
- **Testlevel:** System | **Methode:** INS/TST | **Anforderungen:** UC01-NF1, UC01-NF2
- **Pass-Kriterium:** Passwort nicht im Klartext gespeichert; Fehlermeldungen sind neutral.

### TC-UC02-01 – Passwort-Reset Feature-Check (v1.0 Deviation) [Kurzform - Deviation Example]

- **Testlevel:** System
- **Methode:** INS
- **Verifizierte Anforderungen:** UC02-F1, UC02-NF1
- **Vorbedingungen:** Aktuelle App-Version v1.0 gestartet.

**Schritte**
1) Auth-UI prüfen (Login/Register)
2) Nach 'Passwort vergessen'/Reset-Einstieg suchen
3) `auth.js` auf Reset-Handler prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Reset-Flow ist in v1.0 nicht vorhanden; Abweichung wird dokumentiert.

---

## Übrige Testfälle (Kurzform)

Die folgenden Testfälle werden in Kurzform mit Pass-Kriterium dokumentiert:

| TC-Gruppe | Testlevel | Methode | Anforderungen | Pass-Kriterium |
|-----------|-----------|---------|---------------|----------------|
| **UC02:** UC02-02, UC02-03 | System | INS | UC02-F2..F4 | Kein Token-Flow; v1.0 nicht implementiert (Deviation) |
| **UC03:** Profil (01–NF-01) | System | TST | UC03-F1..F3, NF1..NF2 | Daten anzeigen/bearbeiten/persistieren; Zugriffsschutz |
| **UC04:** Quest-Start (01–NF-01) | System | TST/ANL | UC04-F1..F5, NF1 | Start setzt Status/Zeit; nur eine aktiv; Performance ≤1s |
| **UC05:** Quest-Abschluss (01–NF-01) | System | TST/ANL | UC05-F1..F5, NF1..NF4 | XP-Vergabe atomar; Level-Up mit Feedback; Performance ≤2s |
| **UC06:** Timer (01–NF-01) | System | TST/ANL/INS | UC06-F1..F6, NF1..NF4 | Start/Stop korrekt; Ein-Timer-Regel; Pause n.impl (Deviation); Zeitgenauigkeit ≤1% |
| **UC07:** Noten (01–03) | System | TST | UC07-F1..F5, NF1..NF2 | CRUD funktioniert; Durchschnitt konsistent |
| **UC08:** Dashboard (01–NF-01) | System | TST/ANL | UC08-F1..F5, NF1..NF2 | Statistiken korrekt; 3-Browser-kompatibel; Ladezeit ≤2s |
| **UC09:** Notifications (01–NF-01) | System | TST/INS | UC09-F1..F4, NF1..NF2 | Read-State funktioniert; Settings n.impl (Deviation); E-Mail/Push n.impl |
| **UC10:** CSV (01–NF-01) | System | TST/ANL | UC10-F1..F3, NF1 | Import/Export funktioniert; Format korrekt; Fehlertoleranz; Performance ≤5s |
| **UC11:** Badges (01–NF-01) | System | TST | UC11-F1..F4, NF1 | Freischalten bei Bedingungen; visuelles Feedback; auto-Check |
| **UC12:** Leaderboard (01–NF-01) | System | TST/ANL | UC12-F1..F4, NF1 | 4 Kategorien; Streaks; persönliche Position hervorgehoben; Ladezeit ≤3s |
| **UC13:** Admin-Quest (01–NF-01) | System | TST/ANL | UC13-F1..F6, NF1..NF2 | Quest-CRUD; Zugriff auf Admin; Änderungen ≤2s sichtbar |
| **UC14:** Game-Rules (01–NF-01) | System | TST/ANL/INS | UC14-F1..F5, NF2..NF4 | Speicherbar/wirksam; Admin-only; Performance ≤2s; Auditlog n.impl (Deviation) |
| **UC15:** User-Admin (01–NF-01) | System | TST/ANL/INS | UC15-F1..F5, NF1..NF3 | Rollen/Status/Löschen OK; Such/Detail n.impl (Deviation); Admin-only; Auditlog n.impl |

---

## 8. Rollen & Verantwortlichkeiten (RACI-Light)

| Aktivität | Product Owner | Scrum Master | Dev-Team | QA (rotierend) |
|---|---|---|---|---|
| Testfall-Design & Traceability | A | C | R | R |
| Durchführung Systemtests | C | C | R | R |
| Defect-Triage & Priorisierung | A | R | R | C |
| Fix + Re-Test | C | C | R | R |
| Abnahme (Muss-Anforderungen) | A | C | R | C |

A = Accountable, R = Responsible, C = Consulted

---

## 9. Zeitplan & Meilensteine

- **M1 – Testdesign fertig:** Testfälle + Traceability definiert  
- **M2 – Systemtest 1 (Feature Complete):** UC01–UC12  
- **M3 – Admin & Rules Tests:** UC13–UC15  
- **M4 – Regression + Final Report:** Retest aller Defects + Abgabe Testreport

Hinweis: Für das Praxis-Modul kann der Zeitplan an Sprint-Termine angepasst werden.

---

## 10. Dokumentation, Reporting & Traceability

### 10.1 Testreporting

- Pro Testfall: Datum, Tester, Ergebnis (Pass/Fail), Evidence (Screenshot/Log), Defect-ID.
- Defects werden als GitHub Issues oder in einer zentralen Liste geführt (Severity, Repro-Steps, Fix-Version).

### 10.2 Rückverfolgbarkeit

Die vollständige Requirement-to-Test-Traceability ist als CSV hinterlegt:

- `SVP_StudyQuest_Traceability_Matrix.csv`
