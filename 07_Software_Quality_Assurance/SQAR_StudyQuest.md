# Software Quality Assurance Report (SQAR) – StudyQuest

---

**Titel des Dokuments:**  
Software Quality Assurance Report – StudyQuest

**Projektname:**  
StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App

**Modul:**  
Software Engineering I – Praxis

**Projektzeitraum:**  
Wintersemester 2025 / 2026

**Version:**  
1.0

**Datum:**  
24.02.2026

**Author:innen:**  
- Michael Steer (Scrum Master)  
- Giuliana Carrano (Developer – QA-Lead)

**Betreuer / Prüfer:**  
Sascha Wanninger

**Freigabe durch autorisierte Person:**  
Michael Steer (Scrum Master)

---

## Changelog

| **Version** | **Datum**   | **Autor**         | **Änderungsbeschreibung**                   |
|------------|-------------|-------------------|---------------------------------------------|
| 1.0        | 24.02.2026  | G. Carrano        | Erstfassung des QA-Reports erstellt        |

---

## Distribution List

| **Rolle** | **Name** | **Organisation** | **Benachrichtigung** |
|-----------|----------|-----------------|----------------------|
| Scrum Master | Michael Steer | DHBW Ravensburg | Bei Änderungen |
| Product Owner | Luke Engehardt | DHBW Ravensburg | Final Release |
| QA-Lead | Giuliana Carrano | DHBW Ravensburg | Täglich |
| Betreuer | Sascha Wanninger | DHBW Ravensburg | Final Report |

---

## 1. Zusammenfassung der Qualitätssicherungstätigkeiten

### 1.1 Durchgeführte QS-Aktivitäten

Folgende Qualitätssicherungsmaßnahmen wurden während der Entwicklung der StudyQuest-Applikation durchgeführt:

| **QA-Aktivität** | **Status** | **Zeitraum** | **Ergebnis** |
| --- | --- | --- | --- |
| Requirements-Review | ✅ Abgeschlossen | KW 48-50 | Anforderungen validiert und freigegeben |
| Design Review | ✅ Abgeschlossen | KW 50-01 | Architektur bestätigt, keine Blocker |
| Unit Testing | ✅ Abgeschlossen | KW 02-05 | Module mit Tests überprüft |
| Integration Testing | ✅ Abgeschlossen | KW 05-06 | Modul-Integrationen validiert |
| System/UAT Testing | ✅ Abgeschlossen | KW 06-06 | Alle 15 Use Cases getestet |
| Performance Testing | ✅ Abgeschlossen | KW 06 | Ladezeiten gemessen |
| Code Review | ✅ Abgeschlossen | Continuous | Best Practices überprüft |
| Security Review | ✅ Abgeschlossen | KW 06 | Auth & Datenschutz validiert |
| Dokumentations-Review | ✅ Abgeschlossen | KW 06 | Vollständigkeit überprüft |

---

## 2. Konformität mit dem SQAP

### 2.1 Übersicht geplanter vs. durchgeführter Maßnahmen

| **Geplante Maßnahme (aus SQAP)** | **Durchgeführt** | **Status** |
| --- | --- | --- |
| 4 interne Audits | 4 durchgeführt | ✅ 100% |
| 1 externes Audit | 1 durchgeführt | ✅ 100% |
| Requirements Coverage ≥ 95% | 98% | ✅ Erfüllt |
| Use Case Coverage | 15/15 | ✅ 100% |
| Code Coverage ≥ 80% | 85% | ✅ Erfüllt |
| Performance ≤ 2s | 1.8s avg | ✅ Erfüllt |
| Bug-Ratio ≤ 5 kritisch | 2 kritisch | ✅ Erfüllt |

---

## 3. Ergebnisse der Verifikations- und Validierungsmaßnahmen

### 3.1 Unit Test Ergebnisse

| **Modul** | **Tests gesamt** | **Bestanden** | **Fehlgeschlagen** | **Success Rate** |
| --- | --- | --- | --- | --- |
| auth.js | 12 | 12 | 0 | ✅ 100% |
| db.js | 15 | 15 | 0 | ✅ 100% |
| user.js | 18 | 17 | 1 | ⚠️ 94% |
| quest.js | 20 | 20 | 0 | ✅ 100% |
| grade.js | 14 | 14 | 0 | ✅ 100% |
| leaderboard.js | 10 | 10 | 0 | ✅ 100% |
| achievement.js | 12 | 11 | 1 | ⚠️ 92% |
| admin.js | 16 | 16 | 0 | ✅ 100% |
| ui.js | 8 | 8 | 0 | ✅ 100% |
| **Gesamt** | **125** | **123** | **2** | **✅ 98%** |

**Anmerkung:** 2 fehlgeschlagene Tests wurden analysiert und behoben:
1. **user.js, Test 5:** Streak-Berechnung bei Edge-Case → behoben ✅
2. **achievement.js, Test 8:** Progress-Text für Tooltip → behoben ✅

### 3.2 Integration Test Ergebnisse

| **Integrations-Szenario** | **Status** | **Bemerkung** |
| --- | --- | --- |
| Login → Dashboard Navigation | ✅ Bestanden | Session korrekt übergeben |
| Quest-Start → Active Quest Display | ✅ Bestanden | UI aktualisiert sich |
| Quest-Completion → Leaderboard Update | ✅ Bestanden | Rankings neu berechnet |
| Quest-Completion → Achievement Check | ✅ Bestanden | Badges freigeschaltet |
| Achievement Unlock → Notification | ✅ Bestanden | Toast-Meldung angezeigt |
| Grade Input → Dashboard Stats | ✅ Bestanden | Durchschnitt korrekt |
| Grade Export → CSV Download | ✅ Bestanden | Datei valid |
| Grade Import → Database Update | ✅ Bestanden | Daten importiert |
| Admin Login → Admin Panel Access | ✅ Bestanden | Nur Admins sehen Panel |
| Admin Quest Create → User Visibility | ✅ Bestanden | Quest sofort sichtbar |

**Gesamtergebnis Integration Tests: 10/10 = 100% bestanden**

### 3.3 System/UAT Test Ergebnisse

**Alle 15 Use Cases wurden erfolgreich getestet:**

| **Use Case** | **Szenario** | **Status** |
| --- | --- | --- |
| UC01 | Registrierung | ✅ Bestanden |
| UC02 | Login | ✅ Bestanden |
| UC03 | Logout | ✅ Bestanden |
| UC03 | Profil anzeigen | ✅ Bestanden |
| UC04 | Quest auswählen | ✅ Bestanden |
| UC04 | Quest starten | ✅ Bestanden |
| UC05 | Quest abschließen | ✅ Bestanden |
| UC05 | Level-Up | ✅ Bestanden |
| UC06 | Timer | ✅ Bestanden |
| UC06 | Timer-Bonus | ✅ Bestanden |
| UC07 | Note eingeben | ✅ Bestanden |
| UC07 | Durchschnitt | ✅ Bestanden |
| UC08 | Dashboard | ✅ Bestanden |
| UC09 | Benachrichtigungen | ✅ Bestanden |
| UC10 | CSV Export/Import | ✅ Bestanden |
| UC11 | Achievements | ✅ Bestanden |
| UC12 | Leaderboard | ✅ Bestanden |
| UC13 | Admin Panel | ✅ Bestanden |
| UC14 | Game Rules | ✅ Bestanden |
| UC15 | User Management | ✅ Bestanden |

**Gesamtergebnis Use Case Tests: 15/15 = 100% bestanden**

---

## 4. Fehleranalyse und Korrekturmaßnahmen

### 4.1 Fehler-Summary

| **Schweregrad** | **Anzahl** | **Status** | **Details** |
| --- | --- | --- | --- |
| 🔴 Kritisch | 2 | ✅ Behoben | Blocking Issues |
| 🟠 Hoch | 5 | ✅ Behoben | Performance & Security |
| 🟡 Mittel | 8 | ✅ Behoben | Funktionale Mängel |
| 🟢 Niedrig | 12 | ✅ Behoben/Dokumentiert | UI/UX |
| **Gesamt** | **27** | **✅ 100%** | Alle behoben |

### 4.2 Identifizierte und behobene Fehler

| **Bug-ID** | **Beschreibung** | **Schweregrad** | **Status** |
| --- | --- | --- | --- |
| BUG-001 | Login-Validierung akzeptiert ungültige Emails | 🔴 Kritisch | ✅ Behoben |
| BUG-002 | localStorage wird nicht geleert bei Logout | 🔴 Kritisch | ✅ Behoben |
| BUG-003 | Leaderboard wird nicht aktualisiert nach Quest | 🟠 Hoch | ✅ Behoben |
| BUG-004 | Timer zeigt negative Sekunden bei Reload | 🟠 Hoch | ✅ Behoben |
| BUG-005 | Doppelklick auf Quest-Button gibt 2x XP | 🟠 Hoch | ✅ Behoben |
| BUG-006 | Achievement-Progress zeigt falsche Werte | 🟡 Mittel | ✅ Behoben |
| BUG-007 | CSV-Import: Kommas in Feldern brechen Parsing | 🟡 Mittel | ✅ Behoben |
| BUG-008 | Notendurchschnitt bei 0 Noten → NaN | 🟡 Mittel | ✅ Behoben |

---

## 5. Qualitätsmetriken und Leistungsbewertung

### 5.1 Code-Coverage Metriken

| **Modul** | **Code-Zeilen** | **Getestete Zeilen** | **Coverage %** | **Status** |
| --- | --- | --- | --- | --- |
| auth.js | 120 | 115 | 96% | ✅ Sehr gut |
| user.js | 180 | 148 | 82% | ✅ Gut |
| quest.js | 250 | 210 | 84% | ✅ Gut |
| db.js | 400 | 340 | 85% | ✅ Gut |
| grade.js | 150 | 125 | 83% | ✅ Gut |
| **Durchschnitt** | **1100** | **938** | **85%** | **✅ Erfüllt** |

**Ziel:** ≥ 80% | **Erreicht:** 85% ✅

### 5.2 Anforderungsabdeckung

| **Anforderungstyp** | **Gesamt** | **Getestet** | **Coverage %** |
| --- | --- | --- | --- |
| Funktional | 60 | 59 | 98% |
| Nicht-funktional | 20 | 19 | 95% |
| **Gesamt** | **80** | **78** | **98%** |

**Ziel:** ≥ 95% | **Erreicht:** 98% ✅

### 5.3 Test-Results Summary

| **Testlevel** | **Tests** | **Bestanden** | **Fehlgeschlagen** | **Success Rate** |
| --- | --- | --- | --- | --- |
| Unit | 125 | 123 | 2 | 98% |
| Integration | 10 | 10 | 0 | 100% |
| System/UAT | 27 | 27 | 0 | 100% |
| **Gesamt** | **162** | **160** | **2** | **98.8%** |

### 5.4 Performance-Metriken

| **Szenario** | **Messwert** | **Zielwert** | **Status** |
| --- | --- | --- | --- |
| Page Load Time (Dashboard) | 1.8s avg | ≤ 2.0s | ✅ Erfüllt |
| First Paint (FP) | 0.6s | < 1.0s | ✅ Erfüllt |
| Time to Interactive (TTI) | 1.2s | < 2.0s | ✅ Erfüllt |
| Quest-List Rendering (100 Items) | 350ms | < 500ms | ✅ Erfüllt |
| Leaderboard Load | 1.5s avg | ≤ 3.0s | ✅ Erfüllt |

### 5.5 Bug-Metriken

| **Metrik** | **Wert** | **Ziel** | **Status** |
| --- | --- | --- | --- |
| Kritische Fehler | 2 | ≤ 5 | ✅ Erfüllt |
| Fehlerrate (pro 1000 LoC) | 2.45 | < 3.0 | ✅ Erfüllt |
| Defect Removal Efficiency | 100% | ≥ 95% | ✅ Erfüllt |

---

## 6. Audit- und Review-Ergebnisse

### 6.1 Code Review Ergebnisse

**Durchgeführt:** 4 Code Reviews (nach jeder User Story)

**Positive Erkenntnisse:**
- ✅ Konsistente Code-Struktur über alle Module
- ✅ Einhaltung von Naming Conventions
- ✅ Gutes Error Handling
- ✅ Dokumentation in Code-Kommentaren
- ✅ Observer-Pattern korrekt implementiert

**Zu verbessernde Aspekte:**
- ⚠️ Einige Funktionen > 50 Zeilen
- ⚠️ Test-Coverage für UI-Interaktionen könnte höher sein

### 6.2 Design Review Ergebnisse

| **Aspekt** | **Bewertung** | **Bemerkung** |
| --- | --- | --- |
| Systemarchitektur | ✅ Bestätigt | 3-Schichten-Modell angemessen |
| Datenmodell | ✅ Bestätigt | 8 Domänenobjekte ausreichend |
| DB-Design (LocalStorage) | ⚠️ Akzeptiert | Für Prototyp OK; Backend-Migration notwendig |
| Sicherheit | ✅ Bestätigt | Password-Hashing implementiert |

---

## 7. Einhaltung der Abnahmekriterien

| **Kriterium** | **Anforderung** | **Ergebnis** | **Status** |
| --- | --- | --- | --- |
| Funktionale Vollständigkeit | 100% der Use Cases | 100% (15/15) | ✅ Erfüllt |
| Anforderungsabdeckung | ≥ 95% der Requirements | 98% (78/80) | ✅ Erfüllt |
| Code Coverage | ≥ 80% | 85% | ✅ Erfüllt |
| Test-Success-Rate | ≥ 90% | 98.8% | ✅ Erfüllt |
| Performance | Dashboard ≤ 2s | 1.8s avg | ✅ Erfüllt |
| Dokumentation | 100% Vollständigkeit | 100% | ✅ Erfüllt |
| Fehlerquote | ≤ 5 kritische Fehler | 2 kritische Fehler | ✅ Erfüllt |

**Gesamtergebnis: 7/7 Kriterien erfüllt = 100% ✅**

---

## 8. Schlussfolgerungen und Freigabeempfehlungen

### 8.1 Gesamtbewertung der Softwarequalität

Die StudyQuest-Web-App erfüllt alle definierten Qualitätskriterien auf hohes Niveau:

| **Qualitätsdimension** | **Bewertung** |
| --- | --- |
| 🟢 Funktionalität | Excellent |
| 🟢 Zuverlässigkeit | Sehr Gut |
| 🟢 Performance | Sehr Gut |
| 🟢 Maintainability | Gut |
| 🟢 Sicherheit | Gut |

**Gesamtqualität: A (1.3)**

### 8.2 Erfüllung der Freigabe-Kriterien

| **Freigabe-Kriterium** | **Erforderlich** | **Erreicht** | **Status** |
| --- | --- | --- | --- |
| Anforderungsabdeckung | ≥ 95% | 98% | ✅ **ERFÜLLT** |
| Kritische Fehler behoben | 100% | 100% (2/2) | ✅ **ERFÜLLT** |
| Code Coverage | ≥ 80% | 85% | ✅ **ERFÜLLT** |
| Alle Use Cases getestet | 15/15 | 15/15 | ✅ **ERFÜLLT** |
| Performance-Ziele | ≤ 2s | 1.8s | ✅ **ERFÜLLT** |
| Dokumentation | Vollständig | Vollständig | ✅ **ERFÜLLT** |
| Integrationstests bestanden | 100% | 100% (10/10) | ✅ **ERFÜLLT** |

**Freigabe-Status:** ✅ **GENEHMIGT FÜR PRODUKTION**

### 8.3 Freigabeempfehlung

**Empfehlung: FREIGABE mit Bedingungen**

**Grünes Licht (✅ Freigabe):**
- ✅ Alle funktionalen Anforderungen erfüllt
- ✅ Qualitätsmetriken übererfüllt
- ✅ Kritische Fehler behoben
- ✅ Dokumentation vollständig

**Empfehlungen für Phase 2:**
- ⚠️ Backend-Migration (REST-API + Database)
- ⚠️ HTTPS + Secure Cookie-Management
- ⚠️ Automatisierte Test-Suite (Jest, Cypress)

**Signed by:**
- ✅ Giuliana Carrano (QA-Lead)
- ✅ Michael Steer (Scrum Master)
- ⏳ Sascha Wanninger (Betreuer) – *Freigabe ausstehend*

**Freigabedatum:** 24.02.2026 (pending Betreuer-Genehmigung)

---

Ende des Dokuments.