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
17. Oktober 2025

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
| 1.1          |             | M. Steer          | Änderungen nach Review durch Team           |
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

---

© 2025 StudyQuest Project Team – DHBW Ravensburg
# Requirements: StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App
===========================================================================

## UC01 – Registrieren & Einloggen
### Funktionale Anforderungen
UC01-F1: System muss die Registrierung mit E-Mail und Passwort erlauben.  
UC01-F2: System muss prüfen, ob die E-Mail schon existiert; bei vorhandener E-Mail kein neues Konto anlegen.  
UC01-F3: System muss den Login mit E-Mail und Passwort erlauben.  
UC01-F4: Bei erfolgreichem Login muss das System das Dashboard anzeigen.  
### Nicht-funktionale Anforderungen  
UC01-NF1: Passwort darf nicht im Klartext gespeichert werden (gehashter Speicher).  
UC01-NF2: Fehlermeldungen dürfen nicht verraten, ob ein Account existiert („E-Mail oder Passwort falsch“).  
## UC02 – Passwort zurücksetzen
### Funktionale Anforderungen
UC02-F1: System muss über „Passwort vergessen“ eine E-Mail zum Zurücksetzen anfordern lassen.  
UC02-F2: System muss einen zeitlich begrenzten Link/Token generieren und an die angegebene E-Mail senden.  
UC02-F3: Über den Link muss der/die Nutzer:in ein neues Passwort setzen können.  
UC02-F4: Nach Setzen des neuen Passworts muss das alte Passwort ungültig sein.  
### Nicht-funktionale Anforderungen  
UC02-NF1: Antwort bei „Passwort vergessen“ ist immer neutral (kein Account-Leak).  
UC02-NF2: Reset-Link hat eine Ablaufzeit (z. B. 30 min).  
## UC03 – Profil & Einstellungen verwalten
### Funktionale Anforderungen
UC03-F1: System muss die aktuellen Profildaten des eingeloggten Nutzers anzeigen.  
UC03-F2: System muss das Ändern grundlegender Profildaten (Name, Studiengang, Avatar/Profilbild) erlauben.  
UC03-F3: System muss die Änderungen speichern und erneut anzeigen.  
### Nicht-funktionale Anforderungen    
UC03-NF1: Nur der/die eingeloggte Nutzer:in darf sein/ihr eigenes Profil ändern.  
UC03-NF2: Bei Fehlern (Pflichtfeld leer, zu lang) zeigt das System eine verständliche Fehlermeldung.  
## UC04 – Lernquest starten

### Funktionale Anforderungen
UC04-F1: System muss eingeloggten Nutzer:innen die Auswahl einer verfügbaren Lernquest ermöglichen.  
UC04-F2: System muss nach Auswahl einer Quest die Start-Aktion ermöglichen.  
UC04-F3: Nach Bestätigung muss das System den Queststatus auf **„aktiv“** setzen und den Startzeitpunkt speichern.  
UC04-F4: System darf gleichzeitig nur eine aktive Quest pro Nutzer:in zulassen.  
UC04-F5: System muss bei aktiver Quest verhindern, dass eine weitere gestartet wird, und eine entsprechende Meldung anzeigen.

### Nicht-funktionale Anforderungen
UC04-NF1: Der Statuswechsel einer Quest auf „aktiv“ muss innerhalb von ≤ 1 Sekunde sichtbar sein.  
UC04-NF2: Aktionen dürfen nur für authentifizierte Nutzer:innen verfügbar sein.  
UC04-NF3: Das Starten einer Quest muss serverseitig protokolliert werden (Audit-Event „QUEST_STARTED“).  

---

## UC05 – Lernquest abschließen (XP & Level-Up)

### Funktionale Anforderungen
UC05-F1: System muss Nutzer:innen ermöglichen, eine aktive Quest als abgeschlossen zu markieren.  
UC05-F2: System muss beim Abschluss automatisch die zugehörigen XP gutschreiben und den Gesamt-XP-Stand aktualisieren.  
UC05-F3: System muss prüfen, ob die neue XP-Summe eine Levelgrenze überschreitet, und falls ja, das neue Level freischalten.  
UC05-F4: System muss das Level-Up visuell anzeigen (z. B. Popup oder Banner).  
UC05-F5: System muss die abgeschlossene Quest mit Endzeitpunkt speichern und den Status auf „abgeschlossen“ setzen.

### Nicht-funktionale Anforderungen
UC05-NF1: Der Abschluss einer Quest darf höchstens 2 Sekunden Reaktionszeit haben.  
UC05-NF2: XP-Vergabe muss atomar erfolgen (keine doppelte Gutschrift bei mehrfacher Eingabe).  
UC05-NF3: Level-Up-Events müssen serverseitig protokolliert werden (Audit-Event „QUEST_COMPLETED“).  
UC05-NF4: System darf nur abgeschlossene Quests für XP-Berechnung berücksichtigen.

---

## UC06 – Lern-Session per Timer tracken

### Funktionale Anforderungen
UC06-F1: System muss eingeloggten Nutzer:innen das Starten eines Lern-Timers ermöglichen.  
UC06-F2: System muss beim Start die Startzeit speichern und während der Session die Laufzeit erfassen.  
UC06-F3: System muss das Pausieren und Fortsetzen der Session ermöglichen.  
UC06-F4: System muss beim Stoppen die Gesamtdauer berechnen und speichern.  
UC06-F5: System muss optionale XP-Vergabe auf Basis der Lernzeit durchführen (z. B. 1 XP / 5 Minuten).  
UC06-F6: System darf nicht mehr als einen aktiven Timer pro Nutzer:in zulassen.  
UC06-F7: System muss bei Verbindungsabbruch die Laufzeit lokal puffern und nach Wiederverbindung synchronisieren.

### Nicht-funktionale Anforderungen
UC06-NF1: Die Abweichung zwischen UI-Timer und gespeicherter Zeit darf maximal ± 1 Minute betragen.  
UC06-NF2: Timerdaten müssen auch bei Browser-Reload oder Tabwechsel erhalten bleiben.  
UC06-NF3: Alle Timeraktionen (Start, Pause, Stop) müssen protokolliert werden.  
UC06-NF4: Reaktionszeit für Start und Stop darf 1 Sekunde nicht überschreiten.

---


## UC10 - Noten importieren / exportieren
### Funktionale Anforderungen
UC10-F1: Das System muss den Import von Noten aus einer CSV-Datei ermöglichen.  
UC10-F2: Das System muss den Export von Noten aus einer CSV-Datei ermöglichen.
UC10-F3: Das System muss fehlerhafte Dateien erkennen und dem Benutzer eine Fehlermeldung anzeigen.  
**Beschreibung:**
Importieren spart Zeit, während Exportieren weitere Bearbeitung erlaubt oder Archivierung.

---

## UC11 - Achievements / Badges freischalten
### Funktionale Anforderungen
UC11-F1: Das System muss Bedingungen für Badges prüfen (z. B. gelöste Aufgaben, Punkte, Streaks).
UC11-F2: Das System muss beim Erfüllen der Bedingung das entsprechende Badge freischalten.
UC11-F3: Der Benutzer muss über das neue Achievement visuell informiert werden (z. B. Popup, Animation).
UC11-F4: Der Benutzer muss eine Übersicht aller verfügbaren und freigeschalteten Badges sehen können.
**Beschreibung:**
Motivationssystem für Verwendung des Systems.

## UC12 - Leaderboard & Streaks anzeigen
### Funktionale Anforderungen
UC12-F1: Das System muss eine Rangliste aller Benutzer mit Punkten anzeigen.  
UC12-F2: Das System muss Streaks (aufeinanderfolgende aktive Tage) berechnen und anzeigen.
UC12-F3: Das System muss die Daten bei Aufruf aktualisieren.
UC12-F4: Benutzer sollen ihre eigene Position schnell finden (z. B. durch Hervorhebung).
**Beschreibung:**
Soll Wettbewerb fördern sowohl tägliche Nutzung motivieren.
