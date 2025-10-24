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


<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/79182342-22c0-4750-915d-b629a3f015a1" />

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

| Meilenstein | Geplantes Datum | Ziel / Ergebnis | Dokument / Artefakt |
|--------------|-----------------|------------------|----------------------|
| **M1 – Projektskizze abgeschlossen** | 17.10.2025 | Fertigstellung der Projektskizze mit Scope, Risiken, Zielen und Stakeholdern | `Projektskizze.md` |
| **M2 – Software Development Plan** | 24.10.2025 | Definition von Vorgehensmodell (SCRUM), Rollen, Verantwortlichkeiten, Tools und Kommunikationsstruktur | `SDP.md` |
| **M3 – Analyse & Architekturentwurf** | 21.11.2025 | Erstellung der Anforderungsanalyse, Use-Case- und Aktivitätsdiagramme, Grobdesign und Softwarearchitektur (3-Schichten-Modell) | `UML.pdf` / `Architektur.md` |
| **M4 – Implementierung Sprint 1 (Grundfunktionen)** | 19.12.2025 | Entwicklung der Kernfunktionen (Login, Benutzerverwaltung, Notenübersicht) mit lauffähigem Prototyp | `prototype/` / `src/` |
| **M5 – Implementierung Sprint 2 (Gamification & UI)** | 31.01.2026 | Erweiterung um Gamification-Elemente (XP, Level, Quests) und UI-Optimierung | `UI-Mockup/` / `frontend/` |
| **M6 – Testkonzept & Review** | 10.03.2026 | Erstellung und Durchführung von Testfällen (funktional, usability), Review und Qualitätssicherung | `Testkonzept.md` / `Review-Protokoll.md` |
| **M7 – Abschluss & Retrospektive** | 31.03.2026 | Abschlussbericht, Lessons Learned, Präsentation und Projektdokumentation | `Abschlussbericht.md` / `Slides.pptx` |

---

### Hinweise zur Anwendung im SCRUM-Kontext
- Zwischen den Meilensteinen liegen **Sprints** von ca. 3–4 Wochen Dauer.  
- Jeder Meilenstein steht für ein **Review-fähiges Inkrement** (z. B. Analyse, Prototyp, getestete Funktion).  
- Der **Dozent fungiert als Product Owner**, das **Team als Development Team**, ein Mitglied übernimmt die Rolle des **Scrum Masters**.

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
