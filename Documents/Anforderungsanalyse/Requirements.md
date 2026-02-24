# Requirements – StudyQuest

---

**Titel des Dokuments:**  
Requirements – StudyQuest

**Projektname:**  
StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App

**Modul:**  
Software Engineering I – Praxis

**Projektzeitraum:**  
Wintersemester 2025 / 2026

**Version:**  
1.0

**Datum:**  
05. November 2025

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
| 1.0          | 05.11.2025  | M. Steer          | Erstfassung der Requirements erstellt          |
| 1.1          |             | M. Steer          |           |
| 1.2          |             |                   | Finalversion zur Abgabe vorbereitet         |

---

## Distribution List

| **Name**          | **Rolle**             | **Kommentar / Zuständigkeit**                 |
|--------------------|-----------------------|-----------------------------------------------|
| Sascha Wanninger   | Prüfer / Betreuer     | Bewertung im Rahmen des Moduls                |
| Michael Steer      | Scrum Master          | Koordination & Freigabe                       |
| Luke Engehardt     | Product Owner         | Anforderungen & Dokumentation                 |
| Giuliana Carrano   | Developer             | Projektskizze, Dokumentation                  |
| Paul Strasser      | Developer             | Technische Dokumentation                      |
| Roman Faber        | Developer             | Architektur & UML                             |

## Glossar – Fachbegriffe & Definitionen

| **Begriff** | **Definition** | **Kontext / Beispiel** |
|---|---|---|
| **Quest** | Eine Lernaufgabe mit definierten XP-Belohnungen und Schwierigkeitsgraden (Easy/Medium/Hard). Nutzer starten eine Quest, arbeiten daran und schließen sie ab, um XP zu verdienen. | UC04-UC06, UC13, UC14. Beispiel: "JavaScript Basics" als Easy-Quest mit 50 XP. |
| **XP (Experience Points)** | Erfahrungspunkte, die Benutzer durch das Abschließen von Quests oder Lernzeiten verdienen. XP werden akkumuliert und beeinflussen das Level und die Leaderboard-Position. | UC05, UC06, UC12. Beispiel: Easy-Quest = 50 XP, Medium = 100 XP, Hard = 150 XP. |
| **Level** | Spielerstufe, basierend auf akkumulierter XP. Jeder Level erfordert einen bestimmten Schwellenwert an XP. Ein Level-Up ist ein Meilenstein und wird visuell zurückgemeldet. | UC05, UC08, UC12. Beispiel: Level 5 erreicht bei 2.500 XP (5 × 500 XP-Schwelle). |
| **Achievement / Badge** | Virtuelle Abzeichen, die Benutzer durch bestimmte Meilensteine freischalten (z.B. "Quest Master" bei 10 abgeschlossenen Quests). Achievements dienen der Motivation und Anerkennung. | UC11, UC08. Beispiel-Badges: Quest Starter (1 Quest), Speed Runner (<10 min), Consistency (30-Tage Streak). |
| **Streak** | Aufeinanderfolgende Tage, an denen ein Benutzer mindestens eine Quest abgeschlossen hat. Streaks repräsentieren Konsistenz und werden in der Leaderboard bewertet. | UC12. Beispiel: Nutzer hat 5 Tage hintereinander gelernt → Streak = 5. |
| **Leaderboard** | Rangierungstabelle, die Nutzer nach 4 verschiedenen Kriterien sortiert: XP, Level, abgeschlossene Quests, Streak. Das Leaderboard fördert kompetitives Lernen. | UC12. Beispiel: Top 10 nach XP, mit Medallenmarkierungen (🥇 1., 🥈 2., 🥉 3.). |
| **Gamification** | Einsatz spieltypischer Elemente (Punkte, Levels, Badges, Rankings) zur Motivationssteigerung in nicht-Spiel-Kontexten. In StudyQuest: XP als Punkte, Level als Progression, Achievements als Abzeichen. | Projektkonzept über alle Use Cases. |
| **Learning Session / Lernsession** | Aufzeichnung eines Quest-Abschlusses oder einer Lernzeit mit Zeitstempel, Dauer und verdientem XP. Sessions dienen als Audit-Trail und werden für Datenanalyse gespeichert. | UC05, UC06, UC08. Beispiel: "JS Basics Quest am 24.02.2026 15:30–15:45, 50+25 XP Bonus". |
| **Timer-Bonus** | Zusätzliche XP (Standard: +25%) für das Abschließen einer Quest oder Lernzeit in unter 10 Minuten. Bonus fördert konzentriertes, effizientes Lernen. | UC06. Beispiel: Quest mit 100 XP in 8 Minuten = 100 + 25 = 125 XP. |
| **Admin Panel** | Administrationsbereich, in dem nur Admins Quests erstellen/editieren, Spielregeln konfigurieren und Benutzer verwalten können. Zugang ist rollenbasiert (UC01-NF1). | UC13-UC15. Beispiel-Funktionen: "Neue Quest erstellen", "XP-Regeln ändern". |
| **Role-Based Access Control (RBAC)** | Zugriffskontrollmechanismus basierend auf Benutzerrollen (Studierende / Admin). Bestimmte Funktionen sind nur für spezifische Rollen verfügbar. | UC01-UC03 (Studierende), UC13-UC15 (Admin). |
| **CSV (Comma-Separated Values)** | Dateiformat für den strukturierten Im- und Export von Schlüsseldaten (hier: Schulnoten). CSV-Dateien sind plattformübergreifend lesbar (Excel, LibreOffice, Google Sheets). | UC10. Beispiel: "Modul,Note,Semester" Header mit Notenzeilen. |
| **Authentifizierung** | Prozess der Identitätsprüfung eines Benutzers mittels E-Mail und Passwort. Erfolgreiche Authentifizierung erzeugt eine Session. | UC01-UC03. Beispiel: "test@example.com" + "geheimesPasswort123" → Authentifizierung erfolgreich. |
| **Session / Sitzung** | Verwaltete Verbindung zwischen Browser und System, die die Authentifizierung eines Nutzers dokumentiert. Sessions werden gelöscht bei Logout. | UC01-UC03, UC08. Beispiel: Session-Token im localStorage. |
| **Passwort-Reset** | Sicherheitsprozess zur Wiederherstellung eines vergessenen Passworts über zeitlich begrenzte Tokens. Reset-Token läuft nach 30 Minuten ab. | UC02. Beispiel-Ablauf: "Passwort vergessen" → Token per E-Mail → Link mit Token → Neues Passwort setzen. |
| **Notification / Benachrichtigung** | Nachricht an den Benutzer bei bestimmten Ereignissen (Quest-Abschluss, Level-Up, Achievement freigeschalten, Reminder). Benachrichtigungen erscheinen als Toast/Bell-Icon. | UC09. Beispiel: "🎉 Glückwunsch! Du bist Level 5!". |
| **Dashboard** | Personalisierte Übersichtsseite nach dem Login, die alle wichtigen Nutzer-Statistiken aggregiert (XP, Level, aktive Quest, Notenübersicht, Achievements). | UC08. Beispiel-Widgets: XP-Fortschritt, Top Quest, Notendurchschnitt. |
| **Refresh / UI-Update** | Aktualisierung der Benutzeroberfläche, um neue Daten anzuzeigen, ohne die Seite neu zu laden (dynamisches Update). | UC13. Beispiel: Nach Admin-Änderung an einer Quest wird die Quest-Liste im UI sofort aktualisiert. |
| **LocalStorage** | Browser-basierte Persistierungsmechanismus für Benutzerdaten (Alternative zu Backend-Datenbank). Daten werden im Browser gespeichert und gelten per Domain. | Technologie. Beispiel: `localStorage.setItem('users', JSON.stringify(userData))`. |
| **XSS-Prevention (Cross-Site Scripting)** | Sicherheitsmaßnahmen gegen Attacken, bei denen böse JavaScript-Code in die App injiziert wird. Prevention durch Input-Validierung und Output-Escaping. | Sicherheit. Beispiel: User-Input wird HTML-escaped, um Injektionen zu verhindern. |
| **Doppel-Submit-Schutz** | Mechanismus, um versehentliche oder böswillige Mehrfach-Abschlüsse (z.B. Doppelklick auf Button) zu verhindern. Wird durch Button-Deaktivierung oder Token-Prüfung erreicht. | UC05-NF2. Beispiel: "Quest abschließen"-Button wird nach 1. Klick deaktiviert. |
| **Atomic Operation / Atomare Operation** | Datenbankoperation, die vollständig-oder-gar-nicht ausgeführt wird (keine Teilvollzüge). Sichert Datenkonsistenz. | UC05. Beispiel: Quest-Abschluss mit XP-Vergabe ist eine Transaktion. |
---

# Requirements Specification – StudyQuest  
### Gamifizierte Lern- und Notenverwaltungs-Web-App  

---

## UC01 – Registrieren & Einloggen
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC01-F1 | Funktional | Das System muss die Registrierung von Nutzer:innen mittels E-Mail und Passwort ermöglichen. | Ermöglicht individuellen Zugang und Datenspeicherung. | Neue Registrierung mit gültiger E-Mail und Passwort erzeugt einen Datensatz. | Product Owner | Muss | Entwurf |
| UC01-F2 | Funktional | Das System muss prüfen, ob eine E-Mail bereits existiert und doppelte Konten verhindern. | Verhindert doppelte Datensätze und Verwirrung. | Registrierung mit existierender E-Mail erzeugt eine Fehlermeldung und kein Konto. | Product Owner | Muss | Entwurf |
| UC01-F3 | Funktional | Das System muss den Login mit E-Mail und Passwort erlauben. | Benutzer:innen benötigen Zugriff auf ihre Lern- und Notendaten. | Gültige Login-Daten öffnen das Dashboard. | Nutzer:in | Muss | Entwurf |
| UC01-F4 | Funktional | Nach erfolgreichem Login muss das Dashboard angezeigt werden. | Erhöht Nutzerfreundlichkeit durch direkten Zugang zu Lernfortschritt. | Nach Login wird das personalisierte Dashboard geladen. | Product Owner | Muss | Entwurf |
| UC01-NF1 | Nicht-funktional | Passwörter dürfen nicht im Klartext gespeichert werden. | Schutz sensibler Benutzerdaten. | Passwort-Hashes (z. B. bcrypt) sind in der Datenbank nachweisbar. | Security Officer | Muss | Entwurf |
| UC01-NF2 | Nicht-funktional | Fehlermeldungen dürfen keine Information über existierende Accounts preisgeben. | Schutz vor Enumeration-Angriffen. | Einheitliche Fehlermeldung „E-Mail oder Passwort falsch“ wird angezeigt. | Security Officer | Muss | Entwurf |

---

## UC02 – Passwort zurücksetzen
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC02-F1 | Funktional | System muss über „Passwort vergessen“ eine E-Mail zum Zurücksetzen anfordern lassen. | Nutzer:innen benötigen Wiederherstellungsmöglichkeit. | Klick auf „Passwort vergessen“ führt zu E-Mail-Versand. | Nutzer:in | Muss | Entwurf |
| UC02-F2 | Funktional | System muss einen zeitlich begrenzten Token generieren und versenden. | Schutz vor Missbrauch alter Links. | Token ist 30 min gültig, danach ungültig. | Entwicklerteam | Muss | Entwurf |
| UC02-F3 | Funktional | Über den Link kann ein neues Passwort gesetzt werden. | Sicheres Zurücksetzen gewährleistet Kontowiederherstellung. | Eingabe und Bestätigung neuen Passworts erfolgreich möglich. | Nutzer:in | Muss | Entwurf |
| UC02-F4 | Funktional | Nach Setzen des neuen Passworts muss das alte ungültig sein. | Erhöht Systemsicherheit. | Login mit altem Passwort schlägt fehl. | Security Officer | Muss | Entwurf |
| UC02-NF1 | Nicht-funktional | Antwort bei „Passwort vergessen“ ist immer neutral. | Verhindert, dass Außenstehende Nutzerkonten erkennen. | System meldet stets „E-Mail gesendet, falls registriert“. | Security Officer | Muss | Entwurf |
| UC02-NF2 | Nicht-funktional | Reset-Link hat Ablaufzeit. | Minimiert Risiko kompromittierter Tokens. | Link läuft nach 30 min automatisch ab. | Entwicklerteam | Muss | Entwurf |

---

## UC03 – Profil & Einstellungen verwalten
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC03-F1 | Funktional | System zeigt aktuelle Profildaten an. | Nutzer:innen sollen ihr Profil einsehen können. | Anzeige aller gespeicherten Felder im UI. | Nutzer:in | Muss | Entwurf |
| UC03-F2 | Funktional | System erlaubt Änderungen an Name, Studiengang und Avatar. | Erhöht Personalisierbarkeit. | Änderungen werden gespeichert und korrekt dargestellt. | Nutzer:in | Soll | Entwurf |
| UC03-F3 | Funktional | Änderungen werden gespeichert und angezeigt. | Sicherstellung von Datenpersistenz. | Aktualisierte Daten erscheinen nach Speichern erneut. | Entwicklerteam | Muss | Entwurf |
| UC03-NF1 | Nicht-funktional | Nur eingeloggte Nutzer:innen dürfen ihr Profil ändern. | Datenschutz und Zugriffsschutz. | Zugriff auf Profiländerung nur mit gültiger Session. | Security Officer | Muss | Entwurf |
| UC03-NF2 | Nicht-funktional | System zeigt verständliche Fehlermeldungen bei Eingabefehlern. | Verbesserte Usability. | Fehlermeldungen enthalten klare Ursachenbeschreibung. | UX-Designer | Soll | Entwurf |

---

## UC04 – Lernquest starten
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC04-F1 | Funktional | System ermöglicht Auswahl einer verfügbaren Lernquest. | Nutzer:innen sollen Quests selbstständig starten können. | Auswahl aus Quests im UI möglich. | Product Owner | Muss | Entwurf |
| UC04-F2 | Funktional | System ermöglicht Start der gewählten Quest. | Aktiviert Lernfortschritt-Tracking. | Klick auf „Starten“ setzt Queststatus auf „aktiv“. | Entwicklerteam | Muss | Entwurf |
| UC04-F3 | Funktional | System speichert Startzeitpunkt. | Zeitliche Nachvollziehbarkeit der Lernsession. | Datenbank enthält Timestamp beim Start. | Entwicklerteam | Muss | Entwurf |
| UC04-F4 | Funktional | Nur eine aktive Quest pro Nutzer:in. | Verhindert Überschneidungen. | Versuch, zweite Quest zu starten → Fehlermeldung. | Product Owner | Muss | Entwurf |
| UC04-F5 | Funktional | Bei aktiver Quest wird Start weiterer Quests blockiert. | Konsistenz des Fortschritts. | Meldung „Eine Quest ist bereits aktiv“ erscheint. | Entwicklerteam | Muss | Entwurf |
| UC04-NF1 | Nicht-funktional | Statuswechsel auf „aktiv“ erfolgt in ≤ 1 Sekunde. | Flüssige Nutzererfahrung. | Zeitmessung bestätigt ≤ 1 Sekunde Reaktion. | UX-Tester | Soll | Entwurf |
| UC04-NF2 | Nicht-funktional | Aktionen nur für authentifizierte Nutzer:innen verfügbar. | Zugriffsschutz. | API-Aufruf ohne Authentifizierung → Fehler 401. | Security Officer | Muss | Entwurf |
| UC04-NF3 | Nicht-funktional | Starten der Quest wird serverseitig protokolliert. | Auditierbarkeit von Lernaktivitäten. | Logeintrag „QUEST_STARTED“ im System vorhanden. | Entwicklerteam | Soll | Entwurf |

---

## UC05 – Lernquest abschließen (XP & Level-Up)
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC05-F1 | Funktional | System ermöglicht Markierung einer aktiven Quest als abgeschlossen. | Abschluss signalisiert Lernfortschritt. | Button „Abschließen“ sichtbar und funktionsfähig. | Nutzer:in | Muss | Entwurf |
| UC05-F2 | Funktional | System vergibt automatisch XP beim Abschluss. | Belohnung fördert Motivation. | XP-Wert wird zur Gesamtsumme addiert. | Product Owner | Muss | Entwurf |
| UC05-F3 | Funktional | System prüft Level-Up bei XP-Grenze. | Spielerisches Fortschrittssystem. | Bei Überschreitung → Level-Anzeige aktualisiert. | Entwicklerteam | Soll | Entwurf |
| UC05-F4 | Funktional | System zeigt Level-Up visuell an. | Steigert Benutzererlebnis. | Popup / Banner erscheint bei Level-Up. | UX-Designer | Soll | Entwurf |
| UC05-F5 | Funktional | System speichert Endzeitpunkt und Status „abgeschlossen“. | Nachvollziehbarkeit und Auswertung. | Timestamp im Datensatz gespeichert. | Entwicklerteam | Muss | Entwurf |
| UC05-NF1 | Nicht-funktional | Abschlussreaktion ≤ 2 Sekunden. | Flüssige Interaktion. | Messung bestätigt Reaktionszeit ≤ 2 Sekunden. | Tester | Soll | Entwurf |
| UC05-NF2 | Nicht-funktional | XP-Vergabe atomar. | Vermeidung doppelter Gutschrift. | Doppelklick erzeugt keine Mehrfach-XP. | Entwicklerteam | Muss | Entwurf |
| UC05-NF3 | Nicht-funktional | Level-Up-Event wird protokolliert. | Auditierbarkeit. | Log „QUEST_COMPLETED“ vorhanden. | Security Officer | Soll | Entwurf |
| UC05-NF4 | Nicht-funktional | Nur abgeschlossene Quests zählen für XP. | Datenintegrität. | Nicht-abgeschlossene Quests werden ignoriert. | Product Owner | Muss | Entwurf |

---

## UC06 – Lern-Session per Timer tracken
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC06-F1 | Funktional | System ermöglicht Start eines Lern-Timers. | Nutzer:innen wollen Fokuszeiten messen. | Klick auf „Start“ startet Timer. | Nutzer:in | Muss | Entwurf |
| UC06-F2 | Funktional | System speichert Startzeit und Laufzeit. | Grundlage für XP-Berechnung. | Startzeit in Datenbank protokolliert. | Entwicklerteam | Muss | Entwurf |
| UC06-F3 | Funktional | System ermöglicht Pausieren und Fortsetzen. | Erhöht Flexibilität. | Timer reagiert korrekt auf Pause/Fortsetzen. | UX-Designer | Soll | Entwurf |
| UC06-F4 | Funktional | System berechnet und speichert Gesamtdauer beim Stoppen. | Dient späterer Analyse. | Dauer = Stop-Zeit − Start-Zeit. | Entwicklerteam | Muss | Entwurf |
| UC06-F5 | Funktional | System vergibt optional XP nach Lernzeit. | Motivation durch Belohnung. | XP = 1 / 5 Minuten gespeichert. | Product Owner | Soll | Entwurf |
| UC06-F6 | Funktional | Nur ein aktiver Timer pro Nutzer:in erlaubt. | Vermeidung doppelter Sessions. | Zweiter Startversuch blockiert. | Entwicklerteam | Muss | Entwurf |
| UC06-F7 | Funktional | System puffert Zeitdaten bei Verbindungsabbruch. | Datensicherheit bei Offline-Nutzung. | Synchronisierung nach Reconnect erfolgreich. | Entwicklerteam | Soll | Entwurf |
| UC06-NF1 | Nicht-funktional | Zeitabweichung ≤ 1 Minute. | Genauigkeit. | Vergleich UI/DB ≤ 1 Minute Differenz. | Tester | Soll | Entwurf |
| UC06-NF2 | Nicht-funktional | Timerdaten bleiben nach Reload erhalten. | Benutzerfreundlichkeit. | Refresh des Tabs erhält Timerstatus. | UX-Tester | Soll | Entwurf |
| UC06-NF3 | Nicht-funktional | Alle Timeraktionen werden protokolliert. | Nachvollziehbarkeit. | Logs für Start/Pause/Stop vorhanden. | Entwicklerteam | Soll | Entwurf |
| UC06-NF4 | Nicht-funktional | Reaktionszeit ≤ 1 Sekunde. | Responsives UI. | Messung bestätigt Reaktionszeit ≤ 1 Sekunde. | Tester | Soll | Entwurf |

---

## UC08 – Fortschritt & Dashboard einsehen
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC08-F1 | Funktional | System ermöglicht Zugriff auf das Dashboard. | Zentraler Einstiegspunkt. | Klick auf „Dashboard“ öffnet Übersicht. | Nutzer:in | Muss | Entwurf |
| UC08-F2 | Funktional | Dashboard zeigt aktuellen XP-Stand. | Nutzer:innen wollen Fortschritt erkennen. | XP-Wert entspricht gespeicherter Datenbankwert. | Entwicklerteam | Muss | Entwurf |
| UC08-F3 | Funktional | Dashboard zeigt Nutzerlevel. | Gamifizierungsmotivator. | Levelanzeige stimmt mit XP-Regeln überein. | Product Owner | Muss | Entwurf |
| UC08-F4 | Funktional | Dashboard zeigt aktive & abgeschlossene Quests. | Vollständige Übersicht. | Alle Quests korrekt aufgelistet. | Nutzer:in | Soll | Entwurf |
| UC08-F5 | Funktional | Dashboard zeigt Notenstatistik. | Kombinierte Lern- & Leistungsübersicht. | Anzeige Durchschnitt und Module. | Product Owner | Soll | Entwurf |
| UC08-NF1 | Nicht-funktional | Dashboard lädt vollständig ≤ 2 Sekunden. | Schnelle Reaktionszeit. | Messung zeigt Ladezeit ≤ 2 s. | UX-Tester | Muss | Entwurf |
| UC08-NF2 | Nicht-funktional | Dashboard funktioniert auf allen unterstützten Browsern. | Plattformunabhängigkeit. | Darstellung getestet auf Chrome, Firefox, Safari. | QA-Team | Soll | Entwurf |

---

## UC09 – Benachrichtigungen & Reminder verwalten
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC09-F1 | Funktional | System ermöglicht Öffnen der Benachrichtigungseinstellungen. | Nutzerkontrolle über Hinweise. | Menüpunkt „Benachrichtigungen“ erreichbar. | Nutzer:in | Muss | Entwurf |
| UC09-F2 | Funktional | Nutzer:innen können Lern-Erinnerungen aktivieren/deaktivieren. | Anpassbare Motivation. | Schalter ändert Status erfolgreich. | Nutzer:in | Soll | Entwurf |
| UC09-F3 | Funktional | Nutzer:innen können Quest-Benachrichtigungen steuern. | Reduktion unnötiger Meldungen. | Einstellungen persistieren nach Reload. | Nutzer:in | Soll | Entwurf |
| UC09-F4 | Funktional | Änderungen werden gespeichert. | Konsistente Erfahrung. | Datenbankeintrag aktualisiert. | Entwicklerteam | Muss | Entwurf |
| UC09-NF1 | Nicht-funktional | Änderungen wirken sofort. | Echtzeitfeedback. | Notification-Status ohne Reload übernommen. | Entwicklerteam | Soll | Entwurf |
| UC09-NF2 | Nicht-funktional | Benachrichtigungen werden zuverlässig zugestellt. | Systemvertrauen. | Testmeldungen erscheinen korrekt per Push/E-Mail. | QA-Team | Muss | Entwurf |

---

## UC10 – Noten importieren / exportieren
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC10-F1 | Funktional | System erlaubt Import von Noten aus CSV-Datei. | Zeitersparnis bei Dateneingabe. | CSV erfolgreich eingelesen. | Nutzer:in | Soll | Entwurf |
| UC10-F2 | Funktional | System erlaubt Export von Noten in CSV-Datei. | Datensicherung & Austausch. | Datei erzeugt und heruntergeladen. | Nutzer:in | Soll | Entwurf |
| UC10-F3 | Funktional | System erkennt fehlerhafte Dateien und zeigt Fehlermeldung. | Benutzerfreundlichkeit & Fehlerkontrolle. | Ungültige Datei → Fehlermeldung erscheint. | Entwicklerteam | Muss | Entwurf |
| UC10-NF1 | Nicht-funktional | Import/Export ≤ 5 Sekunden. | Performance-Anforderung. | Zeitmessung ≤ 5 s bei 100 Einträgen. | Tester | Soll | Entwurf |

---

## UC11 – Achievements / Badges freischalten
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC11-F1 | Funktional | System prüft Bedingungen für Badges. | Fördert Motivation. | Badge-Check wird nach Aktionen ausgeführt. | Product Owner | Muss | Entwurf |
| UC11-F2 | Funktional | Bei erfüllter Bedingung wird Badge freigeschaltet. | Belohnungssystem. | Neuer Badge im Profil sichtbar. | Entwicklerteam | Muss | Entwurf |
| UC11-F3 | Funktional | Nutzer:innen werden visuell über neues Badge informiert. | Feedback stärkt Engagement. | Popup/Animation erscheint. | UX-Designer | Soll | Entwurf |
| UC11-F4 | Funktional | Übersicht aller Badges verfügbar. | Transparenz. | Liste zeigt gesperrte + freigeschaltete Badges. | Nutzer:in | Soll | Entwurf |
| UC11-NF1 | Nicht-funktional | Badge-Check läuft automatisch nach jeder relevanten Aktion. | Zuverlässigkeit der Auswertung. | Logs zeigen Trigger-Ausführung. | Entwicklerteam | Muss | Entwurf |

---

## UC12 – Leaderboard & Streaks anzeigen
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC12-F1 | Funktional | System zeigt Rangliste aller Nutzer:innen mit Punkten. | Wettbewerbs-Motivation. | Leaderboard listet alle korrekt nach XP. | Product Owner | Muss | Entwurf |
| UC12-F2 | Funktional | System berechnet und zeigt Streaks (aktive Tage). | Fördert tägliches Lernen. | Richtige Streak-Länge angezeigt. | Entwicklerteam | Soll | Entwurf |
| UC12-F3 | Funktional | Daten werden bei Aufruf aktualisiert. | Aktuelle Werte erforderlich. | Refresh aktualisiert Ranking. | Entwicklerteam | Muss | Entwurf |
| UC12-F4 | Funktional | Nutzer:innen finden eigene Position leicht. | Nutzerfreundlichkeit. | Eigenes Profil im Leaderboard hervorgehoben. | UX-Designer | Soll | Entwurf |
| UC12-NF1 | Nicht-funktional | Leaderboard lädt ≤ 3 Sekunden. | Performance-Ziel. | Ladezeitmessung ≤ 3 s. | QA-Team | Soll | Entwurf |
| UC12-NF2 | Nicht-funktional | Daten werden regelmäßig synchronisiert. | Aktualität. | Automatischer Sync z. B. alle 10 min. | Entwicklerteam | Soll | Entwurf |

---

## UC13 – Quest-Katalog verwalten
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC13-F1 | Funktional | System erlaubt Admin-Login. | Zugriffsschutz für Verwaltung. | Nur Admin-Konten authentifiziert. | Security Officer | Muss | Entwurf |
| UC13-F2 | Funktional | Zugriff auf Quest-Verwaltung. | Verwaltung zentraler Inhalte. | Menüpunkt „Quests verwalten“ sichtbar. | Admin | Muss | Entwurf |
| UC13-F3 | Funktional | System erlaubt Erstellen neuer Quests. | Erweiterbarkeit. | Neue Quest erscheint im Katalog. | Admin | Muss | Entwurf |
| UC13-F4 | Funktional | System erlaubt Bearbeiten bestehender Quests. | Pflege & Korrekturen. | Änderungen werden übernommen. | Admin | Soll | Entwurf |
| UC13-F5 | Funktional | System erlaubt Löschen von Quests. | Entfernen veralteter Inhalte. | Gelöschte Quest verschwindet aus Liste. | Admin | Soll | Entwurf |
| UC13-F6 | Funktional | Katalog aktualisiert sich nach Änderungen. | Aktuelle Ansicht. | Refresh zeigt neue Daten. | Entwicklerteam | Soll | Entwurf |
| UC13-NF1 | Nicht-funktional | Änderungen sichtbar ≤ 2 Sekunden. | Reaktionszeit. | UI-Update ≤ 2 s. | QA-Team | Soll | Entwurf |
| UC13-NF2 | Nicht-funktional | Nur eingeloggte Admins dürfen Änderungen durchführen. | Sicherheit. | Auth-Prüfung vor CRUD-Operationen. | Security Officer | Muss | Entwurf |
| UC13-NF3 | Nicht-funktional | Änderungen werden versioniert gespeichert. | Nachvollziehbarkeit. | Versionslog pro Änderung. | Entwicklerteam | Soll | Entwurf |
| UC13-NF4 | Nicht-funktional | Konflikte bei gleichzeitiger Bearbeitung werden korrekt behandelt. | Datenintegrität. | Merge-Konflikte automatisch gelöst oder gemeldet. | Entwicklerteam | Soll | Entwurf |

---

## UC14 – XP- und Levelregeln konfigurieren
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC14-F1 | Funktional | Admin-Login erforderlich. | Zugriffsbeschränkung. | Nur Admins können konfigurieren. | Security Officer | Muss | Entwurf |
| UC14-F2 | Funktional | Zugriff auf Regelverwaltung. | Übersicht aller XP/Level-Regeln. | Menüpunkt „Regeln verwalten“ vorhanden. | Admin | Muss | Entwurf |
| UC14-F3 | Funktional | System erlaubt Ändern von XP- und Levelregeln. | Flexible Spielbalance. | Neue Regelwerte gespeichert. | Admin | Soll | Entwurf |
| UC14-F4 | Funktional | Geänderte Regeln werden gespeichert und aktiv. | Sofortige Wirkung. | Neue Regeln gelten nach Speichern. | Entwicklerteam | Soll | Entwurf |
| UC14-F5 | Funktional | Änderungen gelten sofort global. | Einheitliches Verhalten. | Nutzer:innen sehen direkt neue Werte. | Entwicklerteam | Soll | Entwurf |
| UC14-NF1 | Nicht-funktional | Änderungen verursachen keine Dateninkonsistenz. | Systemstabilität. | Tests nach Regelupdate bestehen. | QA-Team | Muss | Entwurf |
| UC14-NF2 | Nicht-funktional | Regeländerungen werden protokolliert. | Nachvollziehbarkeit. | Änderungslog mit Zeitstempel. | Entwicklerteam | Soll | Entwurf |
| UC14-NF3 | Nicht-funktional | Speichern dauert ≤ 2 Sekunden. | Performance. | Zeitmessung ≤ 2 s. | Tester | Soll | Entwurf |
| UC14-NF4 | Nicht-funktional | Zugriff nur für autorisierte Admins. | Sicherheit. | Authentifizierung erfolgreich geprüft. | Security Officer | Muss | Entwurf |

---

## UC15 – Benutzerkonten administrieren
| **ID** | **Type** | **Description** | **Rationale** | **Fit Criterion** | **Source** | **Priority** | **Status** |
|--------|-----------|-----------------|----------------|-------------------|-------------|--------------|-------------|
| UC15-F1 | Funktional | System erlaubt Admin-Login. | Schutz administrativer Funktionen. | Nur Admin-Konto akzeptiert. | Security Officer | Muss | Entwurf |
| UC15-F2 | Funktional | System erlaubt Suche nach Benutzerkonten. | Effiziente Verwaltung. | Trefferanzeige nach Suchkriterium. | Admin | Muss | Entwurf |
| UC15-F3 | Funktional | System zeigt Kontoeinstellungen an. | Transparenz über Benutzerdaten. | Detailansicht des Kontos öffnet sich. | Admin | Soll | Entwurf |
| UC15-F4 | Funktional | System erlaubt Löschen, Sperren, Reaktivieren von Konten. | Kontrolle über Systemzugänge. | Statusänderung wird gespeichert. | Admin | Muss | Entwurf |
| UC15-F5 | Funktional | System aktualisiert Kontostatus nach Änderungen. | Konsistenz. | Neue Statusanzeige korrekt im UI. | Entwicklerteam | Soll | Entwurf |
| UC15-NF1 | Nicht-funktional | Nur autorisierte Admins dürfen Änderungen durchführen. | Sicherheit. | Rollenprüfung vor Aktion. | Security Officer | Muss | Entwurf |
| UC15-NF2 | Nicht-funktional | Änderungen werden protokolliert. | Nachvollziehbarkeit. | Log-Eintrag mit Admin-ID und Aktion. | Entwicklerteam | Soll | Entwurf |
| UC15-NF3 | Nicht-funktional | Reaktionszeit ≤ 2 Sekunden. | Benutzerfreundlichkeit. | Änderung bestätigt in ≤ 2 s. | QA-Team | Soll | Entwurf |

---
## Dependencies – StudyQuest

| **Von (Use Case)** | **Nach (Use Case)** | **Beschreibung der direkten Verbindung** |
|--------------------|--------------------|------------------------------------------|
| **UC01 – Registrieren & Einloggen** | **UC02 – Passwort zurücksetzen** | Passwort zurücksetzen benötigt ein existierendes Nutzerkonto. |
| **UC04 – Lernquest starten** | **UC05 – Lernquest abschließen** | Eine Quest muss gestartet sein, bevor sie abgeschlossen werden kann. |
| **UC04 – Lernquest starten** | **UC06 – Lern-Session per Timer tracken** | Timer kann nur während einer aktiven Quest laufen. |
| **UC05 – Lernquest abschließen** | **UC08 – Fortschritt & Dashboard einsehen** | Questabschluss aktualisiert XP- und Level-Anzeige im Dashboard. |
| **UC05 – Lernquest abschließen** | **UC11 – Achievements / Badges freischalten** | Questabschluss kann ein Achievement auslösen. |
| **UC05 – Lernquest abschließen** | **UC12 – Leaderboard & Streaks anzeigen** | Questabschluss beeinflusst die Leaderboard-Position. |
| **UC06 – Lern-Session per Timer tracken** | **UC05 – Lernquest abschließen** | Beendete Lernsession kann Questabschluss initiieren. |
| **UC06 – Lern-Session per Timer tracken** | **UC11 – Achievements / Badges freischalten** | Lernzeit kann ein Achievement triggern. |
| **UC06 – Lern-Session per Timer tracken** | **UC12 – Leaderboard & Streaks anzeigen** | Timer-Streaks wirken sich direkt auf das Leaderboard aus. |
| **UC07 – Noten & Module verwalten** | **UC08 – Fortschritt & Dashboard einsehen** | Notenübersicht wird im Dashboard dargestellt. |
| **UC07 – Noten & Module verwalten** | **UC10 – Noten importieren / exportieren** | Import/Export greift direkt auf Notendaten zu. |
| **UC10 – Noten importieren / exportieren** | **UC07 – Noten & Module verwalten** | Importierte oder exportierte Dateien ändern Notendaten. |
| **UC15 – Benutzerkonten administrieren (Admin)** | **UC14 – XP- und Levelregeln konfigurieren (Admin)** | Admins können Berechtigungen oder Änderungen an XP-Regeln durchführen. |

---

