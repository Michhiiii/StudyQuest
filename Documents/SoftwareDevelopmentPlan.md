# Software Development Plan – StudyQuest

**Titel des Dokuments:**  
Software Development Plan – StudyQuest

**Projektname:**  
StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App

**Modul:**  
Software Engineering I – Praxis

**Projektzeitraum:**  
Wintersemester 2025 / 2026

**Version:**  
1.1

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

| Version | Datum     | Autor         | Änderungsbeschreibung                                         |
|--------:|-----------|---------------|----------------------------------------------------------------|
| 1.0     | 17.10.2025| G. Carrano    | Erstfassung des Software Development Plans erstellt           |
| 1.1     | 17.10.2025| G. Carrano    | Technologie- und Tooling-Stack (VS Code, HTML/CSS/JS) ergänzt |

---

## Distribution List

| Name             | Rolle             | Kommentar / Zuständigkeit                     |
|------------------|-------------------|-----------------------------------------------|
| Sascha Wanninger | Prüfer / Betreuer | Bewertung im Rahmen des Moduls                |
| Michael Steer    | Scrum Master      | Koordination und Freigabe                     |
| Luke Engehardt   | Product Owner     | Anforderungen und Dokumentation               |
| Giuliana Carrano | Developer         | Projektskizze, Dokumentation, UI-Design       |
| Paul Strasser    | Developer         | Technische Dokumentation, Backend/Logik       |
| Roman Faber      | Developer         | Architektur, UML und Integration              |

---

## 1. Vorgehensmodell – Scrum

### Beschreibung
Das Projekt StudyQuest wird nach dem agilen Vorgehensmodell Scrum durchgeführt. Die Arbeit wird in Sprints organisiert, in denen inkrementell Anforderungen umgesetzt werden. Kontinuierliches Feedback aus Reviews fließt in die weitere Planung ein.

### Scrum-Artefakte
- Product Backlog: Priorisierte Anforderungen (User Stories)
- Sprint Backlog: Aufgaben des laufenden Sprints
- Increment: Ergebnis eines Sprints (z. B. funktionsfähiges Mockup oder Dokumentationsteil)

### Scrum-Events
- Sprint Planning: Ziele und Umfang des Sprints festlegen
- Daily Scrum: tägliche Kurzabstimmung
- Sprint Review: Ergebnis-Demo und Feedback
- Sprint Retrospektive: Prozessverbesserungen ableiten

---

## 2. Aktivitätsbeschreibung

### Sprint Planning
Product Owner präsentiert priorisierte User Stories.  
Team schätzt den Aufwand (Planning Poker) und plant die Umsetzung.  
Scrum Master unterstützt, klärt Abhängigkeiten und erstellt das Sprint Backlog.  
Ergebnis: definierte Sprintziele und aktionale Tasks.

### Sprint Execution
Team bearbeitet Tasks aus dem Sprint Backlog.  
Daily Scrum zur Synchronisation.  
Scrum Master beseitigt Impediments.

### Sprint Review
Team demonstriert das Increment.  
Feedback durch Stakeholder; Product Backlog wird aktualisiert.

### Sprint Retrospektive
Team reflektiert Zusammenarbeit, Tools und Prozess.  
Verbesserungsmaßnahmen werden für den nächsten Sprint festgehalten.

---

## 3. Teamzusammensetzung

| Name            | Rolle         | Hauptaufgaben                                                |
|-----------------|---------------|--------------------------------------------------------------|
| Michael Steer   | Scrum Master  | Moderation Scrum-Events, Prozessverantwortung, Impediments  |
| Luke Engehardt  | Product Owner | Produktvision, Backlog-Pflege, Abnahme                      |
| Giuliana Carrano| Developer     | Frontend, UI/UX, Dokumentation, Qualitätssicherung          |
| Paul Strasser   | Developer     | Anwendungslogik, Datenhaltung (leichtgewichtig), Doku       |
| Roman Faber     | Developer     | Architektur, UML, Integrationstests                         |

---

## 4. Verantwortlichkeiten und Aufgabenverteilung

**Scrum Master:** Einhaltung des Scrum-Prozesses, Organisation der Meetings, Moderation, Beseitigung von Hindernissen.  
**Product Owner:** Definition und Priorisierung der Anforderungen, Pflege des Product Backlogs, Abnahme von Increments.  
**Developer-Team:** Umsetzung der User Stories, Implementierung des Frontends, leichte Anwendungslogik, Erstellung UML/Architektur, Testplanung und Dokumentation.

---

## 5. Meilensteine, Reviews und Dokumente

| Meilenstein                         | Geplantes Datum | Ziel / Ergebnis                                     | Dokument / Artefakt     |
|------------------------------------|-----------------|-----------------------------------------------------|-------------------------|
| M1 – Projektskizze abgeschlossen   | 17.10.2025      | Fertigstellung der Projektskizze                    | Projektskizze.md        |
| M2 – Software Development Plan     | 24.10.2025      | SDP mit Vorgehensmodell, Rollen, Tech-Stack         | SDP.md                  |
| M3 – Architektur und UML-Diagramme | 15.11.2025      | Use-Case-, Aktivitäts- und Klassendiagramm          | UML.pdf                 |
| M4 – UI-Mockup/Prototyp            | 05.12.2025      | Navigierbares HTML/CSS/JS-Mockup                    | prototype/              |
| M5 – Testkonzept und Review        | 10.01.2026      | Testfälle (funktional/usability), Review-Protokoll  | Testkonzept.md          |
| M6 – Abschluss und Retrospektive   | 31.01.2026      | Abschlussbericht, Lessons Learned                   | Abschlussbericht.md     |

---

## 6. Reviews und Retrospektiven

Nach jedem Sprint wird ein Review-Meeting durchgeführt, um den aktuellen Stand zu demonstrieren und Feedback einzuholen. Anschließend findet eine Retrospektive statt, um Prozessverbesserungen für den nächsten Sprint festzuhalten.

---

## 7. Dokumentation und Versionskontrolle

Ablage aller Artefakte in einem Git-Repository (z. B. GitHub/GitLab).  
Arbeitsweise über Branches und Pull Requests.  
Versionierung mittels Tags (z. B. v1.0, v1.1).  
Pro Dokument: Changelog und Distribution List pflegen.

---

## 8. Technologie- und Tooling-Stack

**Editor/IDE**  
- Visual Studio Code (VS Code)

**Web-Technologien**  
- HTML (Struktur)  
- CSS (Layout/Styles)  
- JavaScript (Interaktion/Logik, ohne Framework im Prototyp)

**Empfohlene VS-Code-Erweiterungen**  
- Live Server (lokale Vorschau)  
- ESLint (JavaScript-Linting)  
- EditorConfig (einheitliche Formatierung)  
- Prettier (automatische Formatierung)

**Code-Qualität und Konventionen**  
- JavaScript: ES6+, ESLint Standard-Regeln  
- CSS: BEM-ähnliche Klassennamen und modulare Struktur (z. B. /styles, /components)  
- Einheitliche Formatierung über Prettier
  
**Zielplattformen (Browser-Support im Prototyp)**  
- Aktuelle Versionen von Chrome, Edge, Firefox, Safari

**Build/Deployment (Prototyp)**  
- Kein Build-Step erforderlich; statische Auslieferung  
- Optional: GitHub Pages für Hosting des Prototyps

**Testen (leichtgewichtig)**  
- Manuelle Funktions- und Usability-Tests anhand definierter Szenarien  
- Checklisten für Cross-Browser- und Responsiveness-Tests

---
## 5. Meilensteine, Reviews und zugehörige Dokumente

Im Rahmen des Projekts *StudyQuest* werden mehrere Meilensteine definiert, die den Fortschritt der Entwicklung strukturieren.  
Jeder Meilenstein wird durch ein Review abgeschlossen, in dem das Team den aktuellen Stand präsentiert und Feedback erhält.  
Zu jedem Meilenstein entsteht mindestens ein offizielles Dokument, das im Repository abgelegt wird.

| **Meilenstein** | **Geplantes Datum** | **Beschreibung / Ziel** | **Review / Aktivität** | **Dokument / Artefakt** |
|-----------------|---------------------|--------------------------|------------------------|--------------------------|
| **M1 – Projektstart & Teamsetup** | 10.10.2025 | Rollenverteilung, Festlegung des Vorgehensmodells, Git-Repository einrichten | Kick-off Meeting, Review der Projektskizze | Teamplan.md, RepoSetup.md |
| **M2 – Projektskizze abgeschlossen** | 17.10.2025 | Definition der Projektidee, Ziele, Stakeholder, Risiken und Randbedingungen | Projektskizze Review mit Betreuer | Projektskizze.md |
| **M3 – Software Development Plan (SDP)** | 24.10.2025 | Erstellung des Entwicklungsplans inkl. Vorgehensmodell, Rollen und Meilensteinen | internes Review durch Team, Freigabe durch Scrum Master | SoftwareDevelopmentPlan.md |
| **M4 – Architektur & UML-Diagramme** | 15.11.2025 | Erarbeitung von Use-Case-, Aktivitäts- und Klassendiagrammen, Festlegung der Systemarchitektur | Architektur-Review | UML_Diagramme.pdf, Architekturkonzept.md |
| **M5 – UI-Mockup / Prototyp v1** | 05.12.2025 | Erstellung eines klickbaren Prototyps mit HTML, CSS und JavaScript | Sprint Review mit Feedback-Runde | Mockup_v1/ (HTML/CSS/JS-Dateien), ReviewProtokoll_M5.md |
| **M6 – UI-Mockup / Prototyp v2** | 20.12.2025 | Erweiterung des Mockups um Interaktionen (XP-System, Navigation, Notenübersicht) | Sprint Review, UX-Test mit Feedback | Mockup_v2/, UX_Testbericht.md |
| **M7 – Testkonzept & Qualitätssicherung** | 10.01.2026 | Erstellung eines Testkonzepts inkl. Testfälle, Checklisten und Evaluationskriterien | Review Teststrategie & Ergebnisse | Testkonzept.md, Testprotokolle/ |
| **M8 – Abschluss & Retrospektive** | 31.01.2026 | Zusammenfassung aller Ergebnisse, Lessons Learned, Abschlusspräsentation | Abschluss-Review & Retrospektive mit Team und Betreuer | Abschlussbericht.md, Retrospektive.md |

---

### Beschreibung der Reviews

- **Kick-off Review (M1):** Vorstellung der Projektidee, Rollenverteilung und Tools.  
- **Projektskizzen-Review (M2):** Feedback des Betreuers zur Projektbeschreibung und Zieldefinition.  
- **SDP-Review (M3):** Überprüfung der Vollständigkeit des Software Development Plans.  
- **Architektur-Review (M4):** Validierung der technischen Struktur und Diagramme.  
- **Prototyp-Reviews (M5–M6):** Praktische Vorstellung des aktuellen Entwicklungsstands mit Feedbackschleife.  
- **Test-Review (M7):** Kontrolle der Teststrategie, Vollständigkeit und Nachvollziehbarkeit.  
- **Abschluss-Review & Retrospektive (M8):** Gemeinsame Bewertung des gesamten Projekts, Identifikation von Verbesserungspotenzialen.

---

### Dokumentationsanforderungen

Alle Dokumente werden im zentralen Repository `studyquest/` abgelegt.  
Jedes Dokument enthält:
- ein Deckblatt mit Version, Autor und Datum  
- einen Änderungsverlauf (Changelog)  
- eine Distributionsliste  
- Versionskontrolle über Git (Tags, Branches)
---

© 2025 StudyQuest Project Team – DHBW Ravensburg  
Alle Inhalte dienen ausschließlich Studienzwecken im Rahmen des Moduls Software Engineering I – Praxis. 
