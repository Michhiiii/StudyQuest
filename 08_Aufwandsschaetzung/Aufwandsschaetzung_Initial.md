# Aufwandsschätzung StudyQuest – Initialschätzung (Oktober 2025)

**Titel des Dokuments:**  
Aufwandsschätzung Initial - StudyQuest

**Projektname:**  
StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App

**Modul:**  
Software Engineering I – Praxis

**Projektzeitraum:**  
Wintersemester 2025 / 2026

**Version:**  
1.2

**Datum:**  
03.03.2026

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
| 1.0 | 06.02.2026 | M.Steer | Erstfassung des SQAP/SQAR |
| 1.2 | 03.03.2026 | M.Steer | Finalversion zur Abgabe vorbereitet  |

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

## 1. Schätzprozess

### Methodik & Begründung
- **Schätzverfahren:** Function Point Analysis (FPA) + Planning Poker kombiniert
  - FPA nutzt 15 Use Cases als Basis für Komplexitätsbewertung (konservativ: MEDIUM-Komplexität)
  - Planning Poker fördert consensuales Schätzen und reduziert Bias durch Gruppendiskussion
- **Basis:** 15 Use Cases, 80+ Functional/Non-Functional Requirements, 3-Schichten-Architektur (Präsentation/Logik/Datenschicht)
- **Granularität:** Epic (z.B. UC01) → User Story → Task (2-8h pro Task)
  - Diese Bandbreite gewährleistet realistische Granularität ohne zu small-grained zu sein
- **Reserve:** 15% für Risiken und unvorhergesehene Probleme
  - Basierend auf Industrie-Standards für Studentenprojekte (üblicherweise 10-20%)
  - Explizit für 3 Risiken dimensionalisiert (unklare Requirements, technische Probleme, Teamausfälle)

### Schätzkonferenzen - Durchführung
- **Teilnehmende:** Michael Steer (SM), Luke Engehardt (PO), Giuliana Carrano (Lead Dev), Paul Strasser (Dev), Roman Faber (Dev)
  - Alle 5 Kernteam-Mitglieder in jedem Planning Poker, um vollständige Perspektivenvielfalt zu gewährleisten
- **Methode:** Planning Poker mit Fibonacci-Skala (1, 2, 3, 5, 8, 13, 21)
  - Fibonacci berücksichtigt exponentielle Unsicherheit bei größeren Tasks
  - Non-verbale Abstimmung reduziert Gruppendenken
- **Durchführung:** Wöchentlich (mindestens), Dauer 1-2h pro Session
  - Use Cases wurden einzeln präsentiert, Fragen gestellt, dann Schätzung durchgeführt
  - Bei Abweichung > 5 Punkte: Diskussion bis Konsens erreicht
- **Dokumentation:** Jede Schätzung mit Begründung festgehalten (siehe Punkt 4 für Details)

---

## 2. Aufwandsverteilung nach Phasen

| Phase | Beschreibung | Geschätzte Stunden | Anteil |
|-------|-------------|-------------------|--------|
| **Projektskizze & SDP** | Planung, Scope, Risiken | 30 | 5% |
| **Anforderungsanalyse** | Use Cases, Requirements, Glossar | 70 | 11% |
| **Grobdesign** | UML, Klassenmodell, Sequenzen | 50 | 8% |
| **Detailed Design (SDD)** | Architektur, Module, APIs, Sicherheit | 60 | 9% |
| **Implementierung** | Frontend, Backend-Logik, Datenhaltung | 150 | 24% |
| **Testing & Verifikation** | Test-Plan, Testfälle, Durchführung | 95 | 15% |
| **QA & Dokumentation** | SQAP, Reviews, Finalisierung | 75 | 12% |
| **Puffer (14%)** | Reserve für Risiken | 95 | – |
| **GESAMT** | | **675 Stunden** | **100%** |

---

## 3. Aufwandsverteilung nach Team

| Rolle | Name | Aufwand (h) | Anteil | Bemerkung |
|-------|------|------------|--------|----------|
| **Scrum Master** | Michael Steer | 120 | ~21% | Koordination, Reviews, Dokumentation |
| **Product Owner** | Luke Engehardt | 120 | ~21% | Anforderungen, Prioritäten, Abnahme |
| **Developer (Lead)** | Giuliana Carrano | 120 | ~21% | Frontend, UI/UX, Architektur |
| **Developer** | Paul Strasser | 110 | ~19% | Datenhaltung, Datenmodell, Backend-Integration |
| **Developer** | Roman Faber | 110 | ~19% | Integration, Testing, QA-Koordination |
| **GESAMT** | | **580 Stunden** | **74%** | Zzgl. 95h Puffer |

---

## 4. Detailaufwand nach Use Cases

| UC | Beschreibung | Anforderungen | Design (h) | Impl. (h) | Test (h) | Σ (h) |
|----|-------------|---|---|---|---|---|
| UC01 | Registrierung | F1-F4, NF1-2 | 4 | 10 | 5 | **19** |
| UC02 | Passwort zurücksetzen | F1-F3, NF1-2 | 3 | 6 | 4 | **13** |
| UC03 | Login/Logout | F1-F3, NF1-3 | 3 | 8 | 5 | **16** |
| UC04 | Quest starten | F1-F5, NF1-4 | 5 | 15 | 8 | **28** |
| UC05 | Quest abschließen | F1-F5, NF1-4 | 5 | 12 | 7 | **24** |
| UC06 | Timer starten/stoppen | F1-F7, NF1-3 | 4 | 10 | 6 | **20** |
| UC07 | Noten verwalten | F1-F4, NF1-2 | 4 | 12 | 6 | **22** |
| UC08 | Dashboard anzeigen | F1-F5, NF1-2 | 5 | 15 | 7 | **27** |
| UC09 | Benachrichtigungen | F1-F3, NF1-2 | 3 | 8 | 4 | **15** |
| UC10 | CSV Import/Export | F1-F3, NF1-2 | 4 | 10 | 5 | **19** |
| UC11 | Achievements anzeigen | F1-F3, NF1-2 | 3 | 8 | 4 | **15** |
| UC12 | Leaderboard | F1-F5, NF1-3 | 5 | 12 | 6 | **23** |
| UC13 | Admin Panel Login | F1-F3, NF1-3 | 3 | 6 | 4 | **13** |
| UC14 | Quest-Verwaltung (Admin) | F1-F6, NF1-3 | 5 | 15 | 7 | **27** |
| UC15 | Regelkonfiguration | F1-F3, NF1-3 | 4 | 10 | 5 | **19** |
| | **SUMME UC** | | **62** | **157** | **83** | **302** |

---

## 5. Risikomanagement

### Identifizierte Risiken

| Risiko | Eintrittswahrscheinlichkeit | Auswirkung | Strategie | Puffer (h) |
|--------|---------------------------|-----------|----------|-----------|
| Unklare oder sich ändernde Requirements | Mittel (30%) | Hoch | Frühe Klärung durch Anforderungskonferenzen | 30 |
| Technische Probleme (LocalStorage, Browser-Kompatibilität) | Mittel (40%) | Mittel | Frühes Prototyping, Spike für technische Risiken | 25 |
| Teamausfälle (Krankheit, andere verpflichtende Tasks) | Mittel (25%) | Hoch | Redundanter Fokus auf Dokumentation, Pair Programming | 20 |
|

**GESAMT RESERVE (15%):** 75 Stunden

---

## 6. Meilenstein-Planung

| Meilenstein | Datum | Deliverables | Geschätzte h |
|-------------|-------|-------------|-------------|
| M1 | 17.10.2025 | Projektskizze, Kick-off | 15 |
| M2 | 24.10.2025 | SDP, Risk Register | 15 |
| M3 | 21.11.2025 | Requirements, Use Cases, Glossar | 55 |
| M4 | 05.12.2025 | Grobdesign, UML, Sequenzdiagramme | 50 |
| M5 | 10.01.2026 | Prototyp (Frontend + Core-Module), SDD | 175 |
| M6 | 02.02.2026 | Test-Plan, Verifikationsmatrix, Testdurchführung | 110 |
| M7 | 25.02.2026 | SQAP/SQAR, Dokumentation, Abgabe | 90 |
| **GESAMT** | | | **510** |

---

## 7. Schätzkonferenzen - Durchführungsplan

### Vorbereitung
- Agenda 48h vor Meeting
- User Stories/Tasks vorab präparieren
- Relevante Dokumentation bereitstellen

### Durchführung
- Planning Poker mit Fibonacci-Reihe (1, 2, 3, 5, 8, 13, 21)
- Diskussion bei Abweichungen > 5 Punkte
- Konsens durch Team-Abstimmung

### Dokumentation
- Schätzprotokoll pro Konferenz
- Begründungen für hohe Schätzungen festhalten
- Assumptions dokumentieren

---

## 8. Annahmen & Constraints

- **Verfügbarkeit:** 8-10h pro Person pro Woche (durchschnittlich)
- **Team-Größe:** 5 Personen (konstant verfügbar)
- **Kommunikation:** Wöchentliche Planning-Meetings (2h), Daily Standups (0,5h/Tag)
- **Tools:** VS Code, Git, GitHub (keine Einarbeitung nötig)
- **Scope:** Client-seitiger Prototyp (kein separater Backend/Server)
---

## 9. Hochrechnung & Validierungsfaktoren

**Basis-Stunden:** 580h (reiner Team-Aufwand ohne Puffer)  
**Mit Risiko-Puffer (15%):** 675h (95h Reserve)

**Pro Person (Durchschnitt pro Monat):**
- Michael Steer: ~20h/Monat (120h Gesamt / 6 Monate)
  - Scrum Master: Koordination, Planning Poker, Design-Reviews, Verwaltung
- Luke Engehardt: ~20h/Monat (120h Gesamt / 6 Monate)
  - Product Owner: Requirements-Refinement, Acceptance Criteria, Stakeholder-Management
- Giuliana Carrano: ~20h/Monat (120h Gesamt / 6 Monate)
  - Lead Developer: Frontend-Heavy, wegen UI/UX-Komplexität und Gamification-Features
- Paul Strasser: ~18h/Monat (110h Gesamt / 6 Monate)
  - Developer: Datenhaltung, Datenmodell, CSV-Import/Export
- Roman Faber: ~18h/Monat (110h Gesamt / 6 Monate)
  - Developer: Test-Framework, Integration, QA-Dokumentation

**Validierung der Schätzung:**

*1. Branchenvergleich:*
- Function Point Industrie-Standard: 1 FP ≈ 8-10 Stunden
- Unser Projekt: ~60 FP (geschätzt) × 10h = 600h → Unsere 675h mit Puffer ist realistisch

*3. Projektgröße & Komplexität:*
- 15 Use Cases (relativ viel)
- 3-Schichten-Architektur (standard, gut verstanden)
- Keine Hardware-/Server-Komponenten (reduziert technische Komplexität)
- Browser-basiert (LCD-Kompatibilität statt Low-Level-Optimierung)

*4. Ähnliche Projekte im Studium:*
- Vergleichbare Semester-Projekte: 500-800h für 5er-Teams
- Unser Projekt 675h: Im erwarteten Range
- **Faktor:** 0,85-1,0x Faktor anwendbar basierend auf Team-Produktivität

---

## 11. Nächste Schritte: Monitoring & Retrospektive

Um diese Aufwandsschätzung zu validieren, werden folgende Maßnahmen durchgeführt:

### Während Implementierung (Wöchentliche Verfolgung)
- **Wöchentliche Tracking:** Tatsächliche Stunden gegen Plan vergleichen (±10% Toleranz)
- **Meilenstein-Reviews:** Nach M3, M5, M7 größere Abweichungen analysieren
- **Risk-Updates:** Wöchentliche Risikoboard-Überprüfung, neue Risiken hinzufügen wenn identifiziert

### Nach Projekt (Final Evaluation)
- **Vergleichsbericht:** Geschätzt vs. Tatsächlich detailliert dokumentieren
  - Siehe: [Aufwandsschaetzung_Final.md](Aufwandsschaetzung_Final.md) für kompletten Vergleich und Analyse
- **Function-Point-Kalibrierung:** Faktor anpassen basierend auf realem Aufwand
  - Nutzen für Precision in zukünftigen Projekten
- **Lessons Learned Sesion:** 
  - Schätzmethodik bewerten
  - Verbesserungen für nächste Projekte identifizieren
  - Team-Feedback zu Planning Poker sammeln

