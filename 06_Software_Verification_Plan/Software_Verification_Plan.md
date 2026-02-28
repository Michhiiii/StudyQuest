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
| 1.0          | 17.10.2025  | M. Steer          | Erstfassung der Projektskizze erstellt      |
| 1.1          | 30.10.2025            | M. Steer          | Änderungen nach Review            |
| 1.2 | 13.01.2026 | M. Steer | Änpassung an v1.0 | 
| 1.2          | 28.02.2026            | M.Steer                  | Finalversion zur Abgabe vorbereitet         |

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

## 6. Use Case Übersicht

| UC | Name | Actor | Description | Pre | Post |
| --- | --- | --- | --- | --- | --- |
| UC01 | Registrieren und Einloggen | Studierende:r | Nutzer erstellt ein Konto oder meldet sich an, um auf persönliche Daten zuzugreifen. | App ist im Browser geöffnet. | Nutzer ist authentifiziert und im Dashboard eingeloggt. |
| UC02 | Passwort zurücksetzen | Studierende:r | Geplanter Use Case (v1.0 nicht implementiert): Passwort-Reset über E-Mail-Link. | Nutzerkonto existiert; E-Mail-Funktion aktiv. | Deviation dokumentiert (kein produktiver Flow in Client-only v1.0). |
| UC03 | Profil & Einstellungen verwalten | Studierende:r | Nutzer bearbeitet persönliche Daten, Avatar, Lernpräferenzen. | Nutzer ist eingeloggt. | Änderungen im Profil gespeichert. |
| UC04 | Lernquest starten | Studierende:r | Nutzer wählt eine Lernquest aus und beginnt eine Lernsession. | Nutzer ist eingeloggt; Quests verfügbar. | Queststatus auf „aktiv“ gesetzt. |
| UC05 | Lernquest abschließen (XP & Level-Up) | Studierende:r | Nutzer schließt eine aktive Quest ab und erhält XP / Belohnungen. | Eine aktive Quest ist vorhanden. | XP-Stand aktualisiert, ggf. Level-Up oder neue Quest freigeschaltet. |
| UC06 | Lern-Session per Timer tracken | Studierende:r | Nutzer startet einen Lern-Timer, um Fokuszeiten zu tracken. | Nutzer ist eingeloggt. | Sessiondaten gespeichert; XP-Vergabe optional. |
| UC07 | Noten & Module verwalten | Studierende:r | Nutzer trägt Noten ein, bearbeitet oder löscht sie, berechnet Durchschnitt. | Nutzer ist eingeloggt. | Aktualisierte Notenübersicht, berechneter Schnitt. |
| UC08 | Fortschritt & Dashboard einsehen | Studierende:r | Nutzer sieht XP-Stand, Level, Quests und Notenstatistik auf dem Dashboard. | Nutzer ist eingeloggt; Daten vorhanden. | Übersicht angezeigt. |
| UC09 | Benachrichtigungen & Reminder verwalten | Studierende:r | Teilweise umgesetzt: In-App Notifications anzeigen/als gelesen markieren/alle gelesen. Reminder-Settings sind v1.0 nicht implementiert. | Nutzer ist eingeloggt. | Notification-Status aktualisiert; fehlende Settings als Deviation dokumentiert. |
| UC10 | Noten importieren oder exportieren | Studierende:r | Nutzer lädt Noten als CSV hoch oder exportiert sie zur Sicherung. | Nutzer ist eingeloggt. | Daten importiert oder exportiert. |
| UC11 | Achievements / Badges freischalten | Studierende:r | Nutzer erhält Auszeichnungen für bestimmte Meilensteine (z. B. 10 Quests abgeschlossen). | XP-Zähler oder Bedingungen erfüllt. | Neuer Badge wird im Profil angezeigt. |
| UC12 | Leaderboard & Streaks anzeigen | Studierende:r | Nutzer vergleicht Fortschritt mit anderen oder hält tägliche Lern-Streaks. | Nutzer ist eingeloggt; Vergleichsdaten vorhanden. | Rangliste und Streak-Status aktualisiert. |
| UC13 | Quest-Katalog verwalten | Administrator | Admin erstellt, bearbeitet oder löscht Quests im System. | Admin ist eingeloggt. | Quest-Katalog aktualisiert. |
| UC14 | XP- und Levelregeln konfigurieren | Administrator | Admin definiert XP-Werte, Level-Grenzen oder Belohnungslogik. | Admin ist eingeloggt. | Neue Regeln im System gespeichert. |
| UC15 | Benutzerkonten administrieren | Administrator | Admin verwaltet Nutzerkonten (z. B. löschen, sperren, reaktivieren). | Admin ist eingeloggt. | Kontostatus aktualisiert. |

---

## 7. Testfallkatalog

### 7.1 Übersicht

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

### 7.2 Detaillierte Testfallbeschreibungen

Hinweis: Testfälle mit Kennzeichnung **(Deviation)** werden im aktuellen Projektstand nicht als „bestanden“ im Sinne einer Feature-Implementierung gewertet, sondern als dokumentierte Lücke zwischen Requirement und v1.0-Codebasis (Inspection-Nachweis).

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

### TC-UC01-03 – Login (gültig/ungültig) & Dashboard-Navigation

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC01-F3, UC01-F4
- **Vorbedingungen:** Registrierter User existiert.

**Schritte**
1) Logout
2) Login mit korrekten Daten
3) Logout
4) Login mit falschem Passwort

**Erwartetes Ergebnis / Pass-Kriterium**
Mit korrekten Daten wird Dashboard angezeigt; mit falschen Daten erscheint eine Fehlermeldung und kein Login erfolgt.

### TC-UC01-NF-01 – Security: Passwort nicht im Klartext + neutrale Fehlermeldungen

- **Testlevel:** System
- **Methode:** INS/TST
- **Verifizierte Anforderungen:** UC01-NF1, UC01-NF2
- **Vorbedingungen:** Registrierter User existiert.

**Schritte**
1) LocalStorage 'users' öffnen
2) Prüfen ob Passwortfeld Klartext enthält
3) Login mit falscher E-Mail vs. falschem Passwort vergleichen

**Erwartetes Ergebnis / Pass-Kriterium**
Passwort wird nicht als Klartext gespeichert (Hash/Obfuskation); Fehlermeldung bleibt neutral (keine Aussage ob E-Mail existiert).

### TC-UC02-01 – Passwort-Reset Feature-Check (v1.0 Deviation)

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

### TC-UC02-02 – Reset-Token/Ablaufzeit Feature-Check (v1.0 Deviation)

- **Testlevel:** System
- **Methode:** INS
- **Verifizierte Anforderungen:** UC02-F2, UC02-NF2
- **Vorbedingungen:** Aktuelle App-Version v1.0 gestartet.

**Schritte**
1) Code-/UI-Inspektion auf Token-Erzeugung prüfen
2) Prüfen, ob Ablaufzeit-Validierung existiert

**Erwartetes Ergebnis / Pass-Kriterium**
Kein Token-Flow vorhanden; Requirement in v1.0 nicht implementiert, Deviation dokumentiert.

### TC-UC02-03 – Passwortwechsel über Reset-Link Feature-Check (v1.0 Deviation)

- **Testlevel:** System
- **Methode:** INS
- **Verifizierte Anforderungen:** UC02-F3, UC02-F4
- **Vorbedingungen:** Aktuelle App-Version v1.0 gestartet.

**Schritte**
1) Prüfen, ob Reset-Link-Handling existiert
2) Prüfen, ob alter Hash invalidiert werden kann

**Erwartetes Ergebnis / Pass-Kriterium**
Funktion in v1.0 nicht implementiert; Deviation dokumentiert.

### TC-UC03-01 – Profil anzeigen

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC03-F1
- **Vorbedingungen:** User ist eingeloggt.

**Schritte**
1) Profil-/Einstellungen-Seite öffnen
2) Anzeige Name/Avatar/weitere Felder prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Alle gespeicherten Profildaten werden korrekt im UI angezeigt.

### TC-UC03-02 – Profil ändern: Name/Avatar speichern & wieder anzeigen

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC03-F2, UC03-F3
- **Vorbedingungen:** User ist eingeloggt.

**Schritte**
1) Name und Avatar ändern
2) Speichern
3) Seite neu laden
4) Profil erneut öffnen

**Erwartetes Ergebnis / Pass-Kriterium**
Änderungen sind sofort sichtbar und bleiben nach Reload erhalten (Persistenz).

### TC-UC03-NF-01 – Zugriffsschutz & Fehlermeldungen bei Profiländerung

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC03-NF1, UC03-NF2
- **Vorbedingungen:** User ist ausgeloggt oder Session entfernt.

**Schritte**
1) Direktnavigation/Manipulation: Profiländerung versuchen
2) Ungültige Eingaben (leer) testen

**Erwartetes Ergebnis / Pass-Kriterium**
Ohne Login keine Profiländerung möglich; Fehlermeldungen sind verständlich und nennen Ursache.

### TC-UC04-01 – Quest auswählen & starten (Status + Startzeit)

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC04-F1, UC04-F2, UC04-F3
- **Vorbedingungen:** User ist eingeloggt; Quest-Katalog enthält mindestens eine Quest.

**Schritte**
1) Quest-Katalog öffnen
2) Quest auswählen
3) 'Starten' klicken
4) LocalStorage/Session prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Queststatus wechselt auf aktiv; Startzeitpunkt wird gespeichert.

### TC-UC04-02 – Nur eine aktive Quest: Start einer zweiten Quest blockiert

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC04-F4, UC04-F5
- **Vorbedingungen:** User hat bereits eine aktive Quest.

**Schritte**
1) Eine zweite Quest auswählen
2) Starten versuchen

**Erwartetes Ergebnis / Pass-Kriterium**
Start wird blockiert; Meldung erscheint; aktive Quest bleibt unverändert.

### TC-UC04-NF-01 – Performance: Statuswechsel beim Start ≤ 1s

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC04-NF1
- **Vorbedingungen:** User ist eingeloggt; Performance-Messung via DevTools möglich.

**Schritte**
1) Start-Button klicken
2) Zeit bis UI-Status 'aktiv' messen (Performance Tab / Stopwatch)

**Erwartetes Ergebnis / Pass-Kriterium**
Reaktionszeit ist ≤ 1 Sekunde.

### TC-UC05-01 – Quest abschließen: XP-Vergabe, Endzeit, Status

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC05-F1, UC05-F2, UC05-F5, UC05-NF4
- **Vorbedingungen:** User hat aktive Quest.

**Schritte**
1) 'Quest abschließen' klicken
2) XP/Level auf Dashboard prüfen
3) Audit-/History Eintrag prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
XP wird addiert; Quest wird als abgeschlossen markiert; Endzeit gespeichert; nur abgeschlossene Quests zählen.

### TC-UC05-02 – Atomare XP-Vergabe: Doppelklick/Mehrfach-Submit

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC05-NF2
- **Vorbedingungen:** Aktive Quest vorhanden; DevTools offen.

**Schritte**
1) Abschluss-Button mehrfach schnell klicken
2) XP-Delta und History prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
XP wird nur einmal gutgeschrieben; kein doppelter History-Eintrag.

### TC-UC05-03 – Level-Up: Schwellenwert & visuelles Feedback

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC05-F3, UC05-F4
- **Vorbedingungen:** User steht kurz vor Level-Schwelle (z.B. via Testdaten).

**Schritte**
1) Quest abschließen, sodass Schwelle überschritten wird
2) UI beobachten
3) Level- und XP-Stand prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Level wird korrekt erhöht; visuelles Level-Up-Feedback erscheint; Werte entsprechen Game Rules.

### TC-UC05-NF-01 – Performance: Abschlussreaktion ≤ 2s

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC05-NF1
- **Vorbedingungen:** Aktive Quest vorhanden.

**Schritte**
1) Abschluss auslösen
2) Zeit bis UI-Update messen

**Erwartetes Ergebnis / Pass-Kriterium**
UI-Update erfolgt ≤ 2 Sekunden.

### TC-UC06-01 – Timer starten: Startzeit & Persistenz

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC06-F1, UC06-F2
- **Vorbedingungen:** User eingeloggt; Timer-Funktion verfügbar.

**Schritte**
1) Timer starten
2) Timer läuft sichtbar
3) Persistenz: LocalStorage 'timers' prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Timer startet; Startzeit/Laufzeit werden gespeichert.

### TC-UC06-02 – Ein-Timer-Regel (Pause/Fortsetzen v1.0 Deviation)

- **Testlevel:** System
- **Methode:** TST/INS
- **Verifizierte Anforderungen:** UC06-F6, UC06-F3
- **Vorbedingungen:** Timer läuft.

**Schritte**
1) Zweiten Timer-Start versuchen
2) Auf Pause/Fortsetzen-Controls prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Ein-Timer-Regel funktioniert (zweiter Timer wird blockiert); Pause/Fortsetzen in v1.0 nicht implementiert (Deviation).

### TC-UC06-03 – Timer stoppen: Dauerberechnung & optionale XP-Vergabe

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC06-F4, UC06-F5
- **Vorbedingungen:** Timer läuft mindestens einige Minuten (ggf. Test-Bypass).

**Schritte**
1) Timer stoppen
2) Gespeicherte Dauer prüfen
3) XP/Session-Eintrag prüfen (falls vorgesehen)

**Erwartetes Ergebnis / Pass-Kriterium**
Dauer = Stop - Start; Sessiondaten gespeichert; optionale XP korrekt berechnet.

### TC-UC06-04 – Timer bleibt nach Reload erhalten

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC06-NF2
- **Vorbedingungen:** Timer läuft oder ist pausiert.

**Schritte**
1) Browser Tab neu laden
2) Timer-Status prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Timerdaten bleiben erhalten (Fortsetzung mit korrektem Status).

### TC-UC06-NF-01 – Timer-Genauigkeit & Response-Time

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC06-NF1, UC06-NF4
- **Vorbedingungen:** Timer verfügbar; Vergleichszeit (Handy/OS) verfügbar.

**Schritte**
1) Timer 10+ Minuten laufen lassen
2) Abweichung zur Referenz messen
3) Start/Pause/Stop Reaktionszeit messen

**Erwartetes Ergebnis / Pass-Kriterium**
Abweichung ≤ 1 Minute; Aktionen reagieren ≤ 1 Sekunde.

### TC-UC07-01 – Noten anlegen

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC07-F1
- **Vorbedingungen:** User eingeloggt.

**Schritte**
1) Noten-Seite öffnen
2) Neue Note anlegen (Modul, Note, Semester)
3) Speichern

**Erwartetes Ergebnis / Pass-Kriterium**
Note wird gespeichert und in Übersicht angezeigt.

### TC-UC07-02 – Noten bearbeiten & löschen

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC07-F2, UC07-F3, UC07-F5, UC07-NF1
- **Vorbedingungen:** Mindestens eine Note existiert.

**Schritte**
1) Note bearbeiten (Wert ändern)
2) Speichern
3) Note löschen

**Erwartetes Ergebnis / Pass-Kriterium**
Änderungen erscheinen sofort ohne Reload; Löschung entfernt Eintrag aus Übersicht.

### TC-UC07-03 – Durchschnittsberechnung & Datenkonsistenz

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC07-F4, UC07-NF2
- **Vorbedingungen:** Mehrere Noten vorhanden.

**Schritte**
1) Durchschnitt prüfen
2) Note ändern/mehrfach hinzufügen
3) Durchschnitt erneut prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Durchschnitt aktualisiert sich korrekt und bleibt konsistent.

### TC-UC08-01 – Dashboard zeigt korrekte Statistiken (XP/Level/Quests/Noten)

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC08-F1, UC08-F2, UC08-F3, UC08-F4, UC08-F5
- **Vorbedingungen:** User eingeloggt; Testdaten für Quests/Noten vorhanden.

**Schritte**
1) Dashboard öffnen
2) XP/Level mit gespeicherten Werten vergleichen
3) Questliste und Notenstatistik prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Dashboard zeigt konsistente Werte basierend auf gespeicherten Daten.

### TC-UC08-NF-01 – Dashboard Ladezeit ≤ 2s + Browser-Kompatibilität

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC08-NF1, UC08-NF2
- **Vorbedingungen:** Messung möglich; Chrome/Firefox/Safari verfügbar.

**Schritte**
1) Cache leeren
2) Dashboard öffnen und Ladezeit messen
3) Smoke-Test in 3 Browsern

**Erwartetes Ergebnis / Pass-Kriterium**
Dashboard lädt ≤ 2 Sekunden; Darstellung und Kernfunktionen funktionieren in allen Browsern.

### TC-UC09-01 – In-App Notifications: anzeigen, gelesen markieren, alle gelesen

- **Testlevel:** System
- **Methode:** TST/INS
- **Verifizierte Anforderungen:** UC09-F4 (teilweise), UC09-F1..F3
- **Vorbedingungen:** User eingeloggt; mindestens eine Notification vorhanden.

**Schritte**
1) Notification-Bell öffnen
2) Einzelne Notification als gelesen markieren
3) "Alle gelesen" ausführen
4) Prüfen, ob Settings/Reminder-Toggles existieren

**Erwartetes Ergebnis / Pass-Kriterium**
Read-State-Funktion funktioniert; dedizierte Settings/Reminder in v1.0 nicht implementiert (Deviation).

### TC-UC09-NF-01 – In-App Notification Reaktionsverhalten (ohne Push/E-Mail)

- **Testlevel:** System
- **Methode:** TST/INS
- **Verifizierte Anforderungen:** UC09-NF1, UC09-NF2
- **Vorbedingungen:** Benachrichtigungssystem aktiv.

**Schritte**
1) Quest abschließen / Level-Up auslösen
2) Prüfen, ob In-App Notification zeitnah erscheint
3) Prüfen, ob Push/E-Mail-Kanal vorhanden ist

**Erwartetes Ergebnis / Pass-Kriterium**
In-App Notifications erscheinen; Push/E-Mail-Zustellung ist in v1.0 nicht implementiert (Deviation).

### TC-UC10-01 – CSV Export: Inhalt & Format korrekt

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC10-F2
- **Vorbedingungen:** User eingeloggt; mind. 2 Noten vorhanden.

**Schritte**
1) Export auslösen
2) CSV herunterladen/kopieren
3) Inhalt prüfen (Header, Zeilen, Werte)

**Erwartetes Ergebnis / Pass-Kriterium**
CSV enthält Header + alle Noten mit korrekten Werten; Datei ist lesbar (Excel/LibreOffice).

### TC-UC10-02 – CSV Import: gültige Datei

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC10-F1
- **Vorbedingungen:** User eingeloggt; Beispiel-CSV vorhanden.

**Schritte**
1) Import auslösen
2) CSV auswählen
3) Nach Import Notenliste prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Noten werden angelegt; Anzahl importierter Zeilen entspricht CSV (abzgl. Header).

### TC-UC10-03 – CSV Import: ungültige Datei -> Fehlermeldung

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC10-F3
- **Vorbedingungen:** User eingeloggt; ungültige Datei vorhanden (falscher Header/Leer/kaputt).

**Schritte**
1) Import ungültige Datei
2) Beobachten ob Fehler angezeigt wird

**Erwartetes Ergebnis / Pass-Kriterium**
System zeigt Fehlermeldung und importiert keine/fehlerhafte Zeilen.

### TC-UC10-NF-01 – Performance Import/Export ≤ 5s bei 100 Einträgen

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC10-NF1
- **Vorbedingungen:** 100 Noten als Testdaten vorhanden.

**Schritte**
1) Export messen
2) Import messen

**Erwartetes Ergebnis / Pass-Kriterium**
Jede Operation dauert ≤ 5 Sekunden.

### TC-UC11-01 – Badges werden bei erfüllter Bedingung freigeschaltet

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC11-F1, UC11-F2
- **Vorbedingungen:** User hat passende Vorbedingungen (z.B. 1 Quest abgeschlossen).

**Schritte**
1) Relevante Aktion ausführen (Quest abschließen, XP erreichen)
2) Badge-Status prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Bedingung wird geprüft; Badge wird freigeschaltet und gespeichert.

### TC-UC11-02 – Visuelles Feedback + Badge-Übersicht

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC11-F3, UC11-F4
- **Vorbedingungen:** Badge wird gerade freigeschaltet.

**Schritte**
1) Freischaltung triggern
2) Popup/Toast prüfen
3) Badge-Übersicht öffnen

**Erwartetes Ergebnis / Pass-Kriterium**
User erhält visuelles Feedback; Übersicht zeigt gesperrte und freigeschaltete Badges.

### TC-UC11-NF-01 – Automatischer Badge-Check nach relevanten Aktionen

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC11-NF1
- **Vorbedingungen:** User eingeloggt.

**Schritte**
1) Mehrere relevante Aktionen ausführen
2) Prüfen, ob Badge-Check immer ausgelöst wird

**Erwartetes Ergebnis / Pass-Kriterium**
Badge-Check läuft automatisch, ohne manuelles Refresh.

### TC-UC12-01 – Leaderboard: Ranking in 4 Kategorien + persönliche Position

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC12-F1, UC12-F4
- **Vorbedingungen:** Mehrere User existieren (Testdaten).

**Schritte**
1) Leaderboard öffnen
2) Ranking nach XP/Level/Quests/Streak prüfen
3) Eigene Position sichtbar

**Erwartetes Ergebnis / Pass-Kriterium**
Leaderboard listet Nutzer korrekt; eigene Position ist auffindbar.

### TC-UC12-02 – Streak-Berechnung & Aktualisierung

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC12-F2, UC12-F3
- **Vorbedingungen:** User hat Aktivitäten an mehreren Tagen (Testdaten oder Systemzeit-Simulation).

**Schritte**
1) Streak prüfen
2) Neue Quest an neuem Tag abschließen
3) Leaderboard refreshen

**Erwartetes Ergebnis / Pass-Kriterium**
Streak wird korrekt berechnet und aktualisiert.

### TC-UC12-NF-01 – Performance: Leaderboard ≤ 3s

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC12-NF1
- **Vorbedingungen:** Mindestens 50 User als Testdaten.

**Schritte**
1) Leaderboard öffnen
2) Ladezeit messen

**Erwartetes Ergebnis / Pass-Kriterium**
Leaderboard lädt ≤ 3 Sekunden.

### TC-UC13-01 – Admin Login/Access: Admin sieht Admin Panel, Non-Admin nicht

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC13-F1, UC13-NF2
- **Vorbedingungen:** Ein Admin-User und ein Non-Admin-User existieren.

**Schritte**
1) Als Non-Admin einloggen: Admin Panel Link prüfen
2) Als Admin einloggen: Admin Panel öffnen

**Erwartetes Ergebnis / Pass-Kriterium**
Non-Admin hat keinen Zugriff; Admin kann Admin Panel öffnen.

### TC-UC13-02 – Quest CRUD im Admin Panel (Create/Update/Delete)

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC13-F2, UC13-F3, UC13-F4, UC13-F5, UC13-F6
- **Vorbedingungen:** Admin eingeloggt.

**Schritte**
1) Quest erstellen
2) Quest bearbeiten
3) Quest löschen
4) Quest-Katalog prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Quests werden korrekt angelegt/aktualisiert/entfernt; Katalog aktualisiert sich.

### TC-UC13-NF-01 – Admin Änderungen sichtbar ≤ 2s

- **Testlevel:** System
- **Methode:** ANL/TST
- **Verifizierte Anforderungen:** UC13-NF1
- **Vorbedingungen:** Admin eingeloggt.

**Schritte**
1) Quest erstellen/bearbeiten
2) Zeit bis UI-Update messen

**Erwartetes Ergebnis / Pass-Kriterium**
Änderungen sind innerhalb von 2 Sekunden sichtbar.

### TC-UC14-01 – Game Rules ändern & sofort wirksam

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC14-F1, UC14-F2, UC14-F3, UC14-F4, UC14-F5
- **Vorbedingungen:** Admin eingeloggt; Game Rules Editor verfügbar.

**Schritte**
1) XP/Threshold/Bonus ändern
2) Speichern
3) Neue Quest starten/abschließen -> Wirkung prüfen

**Erwartetes Ergebnis / Pass-Kriterium**
Regeln werden gespeichert und wirken sofort (XP/Level-Berechnung).

### TC-UC14-NF-01 – Sicherheit & Performance beim Speichern (Auditlog v1.0 Deviation)

- **Testlevel:** System
- **Methode:** TST/ANL
- **Verifizierte Anforderungen:** UC14-NF2, UC14-NF3, UC14-NF4
- **Vorbedingungen:** Admin eingeloggt.

**Schritte**
1) Regel ändern und speichern
2) Zeit messen
3) Prüfen, ob Auditlog vorhanden
4) Non-Admin versucht Zugriff

**Erwartetes Ergebnis / Pass-Kriterium**
Speichern ≤ 2s; Zugriff nur für Admins; fehlendes Auditlog wird als Deviation dokumentiert.

### TC-UC15-01 – User-Administration: Admin-Rechte, Aktiv/Deaktiv, Löschen

- **Testlevel:** System
- **Methode:** TST
- **Verifizierte Anforderungen:** UC15-F1, UC15-F4, UC15-F5, UC15-F2, UC15-F3
- **Vorbedingungen:** Admin eingeloggt; mehrere User vorhanden.

**Schritte**
1) Users Tab öffnen
2) Admin-Rechte togglen
3) User deaktivieren/reaktivieren
4) User löschen
5) Prüfen, ob Such-/Detailansicht vorhanden ist

**Erwartetes Ergebnis / Pass-Kriterium**
Rollen-/Status-/Löschaktionen funktionieren; fehlende Suche/Detailansicht wird als Deviation dokumentiert.

### TC-UC15-NF-01 – Zugriffsschutz + Reaktionszeit ≤ 2s (Auditlog v1.0 Deviation)

- **Testlevel:** System
- **Methode:** TST/ANL/INS
- **Verifizierte Anforderungen:** UC15-NF1, UC15-NF2, UC15-NF3
- **Vorbedingungen:** Admin eingeloggt.

**Schritte**
1) Änderung durchführen
2) Zeit messen
3) Auditlog-Verfügbarkeit prüfen
4) Non-Admin versucht Admin-Aktion

**Erwartetes Ergebnis / Pass-Kriterium**
Nur Admins dürfen ändern; UI bestätigt ≤ 2 Sekunden; fehlendes Auditlog wird als Deviation dokumentiert.


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

## 9. Zeitplan & Meilensteine (Template)

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

---

## Anhang A – Traceability Matrix (Kurzform)

> Vollständig in der CSV-Datei. In diesem Dokument nur Auszug/Prinzip:  
> Jede Requirement-ID (z. B. UC05-F2) wird mindestens einem Testfall (z. B. TC-UC05-01) zugeordnet.

