# Aufwandsschätzung StudyQuest – Initialschätzung (Oktober 2025)

**Projektname:** StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App  
**Zeitraum:** Oktober 2025 – Februar 2026 (6 Monate)  
**Datum:** 17.10.2025  
**Version:** 1.0

---

## 1. Schätzprozess

### Methodik
- **Schätzverfahren:** Function Point Analysis (FPA) + Planning Poker
- **Basis:** 15 Use Cases, 80+ Requirements, 3-Schichten-Architektur
- **Granularität:** Epic → User Story → Task (2-8h pro Task)
- **Reserve:** 15% für Risiken und unvorhergesehene Probleme

### Schätzkonferenzen
- **Team:** Michael Steer (SM), Luke Engehardt (PO), Giuliana Carrano, Paul Strasser, Roman Faber
- **Methode:** Planning Poker mit Fibonacci-Skala
- **Durchführung:** Wöchentlich, Dauer 1-2h
- **Ergebnis:** Konsensbasierte Schätzung mit Konfliktlösung durch Diskussion

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
| Unklare oder sich ändernde Requirements | Mittel (30%) | Hoch | Frühe Klärung durch Anforderungskonferenzen | 20 |
| Technische Probleme (LocalStorage, Browser-Kompatibilität) | Mittel (40%) | Mittel | Frühes Prototyping, Spike für technische Risiken | 25 |
| Teamausfälle (Krankheit, andere verpflichtende Tasks) | Mittel (25%) | Hoch | Redundanter Fokus auf Dokumentation, Pair Programming | 20 |
| Scope Creep durch Stakeholder-Anforderungen | Niedrig (15%) | Mittel | Striktes Change Management, Review-Gates | 10 |

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
- **Testing:** Manuelle Testfälle + dokumentierte Test-Matrices (keine Automatisierung)
- **Webstandards:** HTML5, CSS3, ES6+ JavaScript
- **Browser:** Chrome, Firefox, Safari (Desktop)

---

## 9. Abhängigkeiten & kritischer Pfad

```
Projektskizze (M1)
    |
    v
SDP (M2)
    |
    +---> Requirements (M3) ----+
    |                           |
    +---> Grobdesign (M4) <-----+
                |
                v
            SDD (M5-1)
                |
                v
    Implementierung (M5) <------+
        |
        v
    Testing & Verifikation (M6)
        |
        v
    QA & Finalisierung (M7)
```

**Kritischer Pfad:** Requirements → Grobdesign → SDD → Implementierung → Testing  
**Slack:** Design hat 5 Tage Puffer vor Implementierung

---

## 10. Hochrechnung & Validierungsfaktoren

**Basis-Stunden:** 580h (reiner Team-Aufwand)  
**Mit Risiko-Puffer:** 675h (14%)

**Pro Person (Durchschnitt pro Monat):**
- Michael Steer: ~20h/Monat (120h / 6M)
- Luke Engehardt: ~17h/Monat (100h / 6M)
- Giuliana Carrano: ~30h/Monat (180h / 6M)
- Paul Strasser: ~15h/Monat (90h / 6M)
- Roman Faber: ~15h/Monat (90h / 6M)

**Validierungsfaktoren:**
- Vergleichbare SE-Projekte im Studium: 0,9-1,1x Faktor
- Erfahrung des Teams: Mittel bis Hoch
- Komplexität des Projekts: Mittel (3-Schichten, 15 Use Cases)
- Diese Schätzung gilt als **konservativ realistisch**

---

**Freigegeben durch:** Michael Steer (Scrum Master)  
**Gültig ab:** 17.10.2025  
**Nächste Überprüfung:** Februar 2026 (Finalbewertung)
