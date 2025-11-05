# Projektskizze – StudyQuest

---

**Titel des Dokuments:**  
Use Cases – StudyQuest

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
| 1.0          | 17.10.2025  | M. Steer          | Erstfassung der Use Cases erstellt          |
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
# Use Cases: StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App
===========================================================================




|  **ID**  | **Use Case Titel**                                | **Akteur(e)** | **Ziel / Beschreibung**                                                                  | **Vorbedingung**                                  | **Nachbedingung (Ergebnis)**                                         |
| :------: | :------------------------------------------------ | :------------ | :--------------------------------------------------------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------- |
| **UC01** | **Registrieren und Einloggen**                    | Studierende:r | Nutzer erstellt ein Konto oder meldet sich an, um auf persönliche Daten zuzugreifen.     | App ist im Browser geöffnet.                      | Nutzer ist authentifiziert und im Dashboard eingeloggt.              |
| **UC02** | **Passwort zurücksetzen**                         | Studierende:r | Nutzer setzt vergessene Zugangsdaten über E-Mail-Link zurück.                            | Nutzerkonto existiert; E-Mail-Funktion aktiv.     | Neues Passwort gesetzt, Zugang wiederhergestellt.                    |
| **UC03** | **Profil & Einstellungen verwalten**              | Studierende:r | Nutzer bearbeitet persönliche Daten, Avatar, Lernpräferenzen.                            | Nutzer ist eingeloggt.                            | Änderungen im Profil gespeichert.                                    |
| **UC04** | **Lernquest starten**                             | Studierende:r | Nutzer wählt eine Lernquest aus und beginnt eine Lernsession.                            | Nutzer ist eingeloggt; Quests verfügbar.          | Queststatus auf „aktiv“ gesetzt.                                     |
| **UC05** | **Lernquest abschließen (XP & Level-Up)**         | Studierende:r | Nutzer schließt eine aktive Quest ab und erhält XP / Belohnungen.                        | Eine aktive Quest ist vorhanden.                  | XP-Stand aktualisiert, ggf. Level-Up oder neue Quest freigeschaltet. |
| **UC06** | **Lern-Session per Timer tracken**     | Studierende:r | Nutzer startet einen Lern-Timer, um Fokuszeiten zu tracken.                              | Nutzer ist eingeloggt.                            | Sessiondaten gespeichert; XP-Vergabe optional.                       |
| **UC07** | **Noten & Module verwalten**                      | Studierende:r | Nutzer trägt Noten ein, bearbeitet oder löscht sie, berechnet Durchschnitt.              | Nutzer ist eingeloggt.                            | Aktualisierte Notenübersicht, berechneter Schnitt.                   |
| **UC08** | **Fortschritt & Dashboard einsehen**              | Studierende:r | Nutzer sieht XP-Stand, Level, Quests und Notenstatistik auf dem Dashboard.               | Nutzer ist eingeloggt; Daten vorhanden.           | Übersicht angezeigt.                                                 |
| **UC09** | **Benachrichtigungen & Reminder verwalten**       | Studierende:r | Nutzer aktiviert oder deaktiviert Lern-Erinnerungen und Quest-Benachrichtigungen.        | Nutzer ist eingeloggt.                            | Benachrichtigungseinstellungen gespeichert.                          |
| **UC10** | **Noten importieren oder exportieren**      | Studierende:r | Nutzer lädt Noten als CSV hoch oder exportiert sie zur Sicherung.                        | Nutzer ist eingeloggt.       | Daten importiert oder exportiert.                                    |
| **UC11** | **Achievements / Badges freischalten**            | Studierende:r | Nutzer erhält Auszeichnungen für bestimmte Meilensteine (z. B. 10 Quests abgeschlossen). | XP-Zähler oder Bedingungen erfüllt.               | Neuer Badge wird im Profil angezeigt.                                |
| **UC12** | **Leaderboard & Streaks anzeigen**                | Studierende:r | Nutzer vergleicht Fortschritt mit anderen oder hält tägliche Lern-Streaks.               | Nutzer ist eingeloggt; Vergleichsdaten vorhanden. | Rangliste und Streak-Status aktualisiert.                            |
| **UC13** | **Quest-Katalog verwalten**                | Administrator | Admin erstellt, bearbeitet oder löscht Quests im System.                                 | Admin ist eingeloggt.                             | Quest-Katalog aktualisiert.                                          |
| **UC14** | **XP- und Levelregeln konfigurieren**             | Administrator | Admin definiert XP-Werte, Level-Grenzen oder Belohnungslogik.                            | Admin ist eingeloggt.                             | Neue Regeln im System gespeichert.                                   |
| **UC15** | **Benutzerkonten administrieren** | Administrator | Admin verwaltet Nutzerkonten (z. B. löschen, sperren, reaktivieren).                     | Admin ist eingeloggt.                             | Kontostatus aktualisiert.                                            |

<div style="display:flex; gap:10px; flex-direction:column;">
<img src="https://github.com/user-attachments/assets/509bf1dd-6b28-4138-bb49-66148c6b5e33" width="1000">

<img src="https://github.com/user-attachments/assets/9024044d-b550-4b84-a728-a638f3b734c2" width="1000">

<img src="https://github.com/user-attachments/assets/fcc19a2f-b4ef-40c7-ada6-9be377d7c66a" width="1000">

<img src="https://github.com/user-attachments/assets/e5f23b96-5775-46c7-ba02-8f70cefdf100" width="1000">

<img width="1000" alt="UC05 drawio" src="https://github.com/user-attachments/assets/7cefa360-a344-4dda-bd16-33c1b8b09941" />

<img width="1000" alt="UC06" src="https://github.com/user-attachments/assets/8364ba83-5005-4cbf-bf4f-92b318400120" />

<img width="1000" alt="UC07" src="https://github.com/user-attachments/assets/baebc7a8-935a-4f0f-abd8-37f97b50f489" />

<img width="1000" alt="UC08" src="https://github.com/user-attachments/assets/b2c45d4a-92d3-43aa-9990-00e443f6afab" />

<img width="1000" alt="UC09 drawio" src="https://github.com/user-attachments/assets/437c21a9-ff9c-4888-abc0-0dc7fe3c076d" />

<img width="1000" alt="UC10" src="https://github.com/user-attachments/assets/34339292-2bb0-44e2-917c-8febe9ff93ad" />

<img width="1000" alt="UC11" src="https://github.com/user-attachments/assets/d3081090-fbbe-4c6a-985c-353d76da1dcd" />

<img width="1000" alt="UC12" src="https://github.com/user-attachments/assets/56600f48-c95a-445c-8359-8652d43fb38a" />

<img width="1000" alt="UC13" src="https://github.com/user-attachments/assets/a819306d-0bf8-4fcb-bd49-d2f29657fb25" />

<img width="1000" alt="UC14" src="https://github.com/user-attachments/assets/4b760ada-e729-4994-b062-60916e53602d" />

<img width="1000" alt="UC15" src="https://github.com/user-attachments/assets/713f4e59-ef7d-40c0-9e07-c2d1052b0387" />

</div>





