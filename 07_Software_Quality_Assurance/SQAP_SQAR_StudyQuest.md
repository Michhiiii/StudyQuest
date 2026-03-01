# Software Quality Assurance Plan & Report (SQAP/SQAR) – StudyQuest

**Projekt:** StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App  
**Modul:** Software Engineering I – Praxis (DHBW Ravensburg)  
**Version:** 1.1  
**Datum:** 01.03.2026

**Autor:innen (Projektteam):**
- Michael Steer (Scrum Master)
- Luke Engehardt (Product Owner)
- Giuliana Carrano (Developer)
- Paul Strasser (Developer)
- Roman Faber (Developer)

**Betreuer / Prüfer:** Sascha Wanninger

---

## Changelog

| **Version** | **Datum** | **Autor** | **Änderungsbeschreibung** |
| --- | --- | --- | --- |
| 1.0 | 06.02.2026 | Projektteam | Erstfassung des SQAP/SQAR |
| 1.1 | 01.03.2026 | Projektteam | Konsistenzabgleich mit SVP, Traceability-Matrix und Testartefakten |

---

# TEIL I: SOFTWARE QUALITY ASSURANCE PLAN (SQAP)

## 1. Einleitung und Anwendungsbereich

### 1.1 Beschreibung des Projekts und der Softwareprodukte

StudyQuest ist eine clientseitige Web-App (HTML/CSS/JavaScript) zur Lernorganisation mit Gamification-Elementen (Quests, XP, Level, Badges, Leaderboard) sowie Notenverwaltung.

**Betroffene Softwareprodukte/Artefakte:**
- Implementierung: `10_Durchfuehrung/src/`
- Testartefakte: `10_Durchfuehrung/tests/`
- Anforderungen: `03_Anforderungsanalyse/Requirements.md`
- Use Cases: `03_Anforderungsanalyse/UseCases.md`
- Verifikationsplanung: `06_Software_Verification_Plan/Software_Verification_Plan.md`
- Traceability: `06_Software_Verification_Plan/SVP_StudyQuest_Traceability_Matrix.csv`

### 1.2 Zielsetzung des Plans

Der SQAP definiert, wie Qualität geplant, geprüft und dokumentiert wird, damit:
- Anforderungen nachvollziehbar verifiziert werden,
- Abweichungen transparent dokumentiert sind,
- Freigabeentscheidungen auf belastbaren Ergebnissen beruhen.

### 1.3 Geltungsbereich

Gilt für den Projektstand der Modulabgabe (Prototyp auf Client-Architektur mit LocalStorage).

---

## 2. Normative Referenzen

### 2.1 Relevante Standards

- ECSS-Q-ST-80C (Software Product Assurance)
- ISO/IEC/IEEE 12207 (Software Life Cycle Processes)
- ISO/IEC/IEEE 29119 (Software Testing)
- ISTQB-Grundlagen

### 2.2 Weitere Richtlinien und Projektreferenzen

- Interne Code-Reviews und Dokumenten-Reviews des Teams
- Versionsverwaltung mit Git/GitHub
- Projektartefakte gemäß Struktur im Repository

---

## 3. Audit- und Bewertungskriterien

### 3.1 Geplante interne und externe Audits

| **Audit-Typ** | **Art** | **Ziel** |
| --- | --- | --- |
| Requirements-/Design-Review | Intern | Konsistenz und Umsetzbarkeit prüfen |
| Code-Review | Intern | Qualität, Wartbarkeit, Regelkonformität |
| Test-Review | Intern | Abdeckung und Aussagekraft der Tests |
| Dokumentations-Review | Intern | Einheitliche Aussagen in SQAP/SQAR/SVP |
| Betreuer-Review | Extern | Fachliche und methodische Bewertung |

### 3.2 Metriken zur Erfolgskontrolle

| **Metrik** | **Quelle** | **Ist-Wert (01.03.2026)** |
| --- | --- | --- |
| Traceability-Abdeckung (ID → Testfall) | Traceability-Matrix | Vollständig vorhanden |
| Anforderungen gesamt | Traceability-Matrix | 107 |
| Verifiziert (`✓`) | Traceability-Matrix | 83 |
| Deviationen (`Deviation`) | Traceability-Matrix | 24 |
| Erfüllungsquote (`✓`/Gesamt) | Traceability-Matrix | 77.6% |
| Unit-Test-Umfang | `tests/README.md` | 125 Tests (9 Module) |

---

## 4. Dokumentation und Berichterstattung

### 4.1 Anforderungen an Berichte, Reviews und Freigaben

- Alle Abweichungen werden als Deviation dokumentiert (inkl. Referenz auf Requirement/Testfall).
- SQAR muss die Durchführung der geplanten QS-Maßnahmen belegen.
- Freigabeaussagen müssen mit SVP und Matrix konsistent sein.
- Änderungen an Kennzahlen erfordern Update von SQAR und ggf. SQAP/SQAR.

### 4.2 Freigabekriterien (für Modulabgabe)

- Traceability vollständig dokumentiert.
- QS-Maßnahmen durchgeführt und reportet.
- Offene Punkte transparent als Deviation ausgewiesen.

---

# TEIL II: SOFTWARE QUALITY ASSURANCE REPORT (SQAR)

## 5. Zusammenfassung der Qualitätssicherungstätigkeiten

Durchgeführt wurden Requirements-/Design-Reviews, Code-Reviews, Unit-Tests sowie Systemverifikation gemäß SVP-Testkatalog. Die Nachvollziehbarkeit zwischen Anforderungen und Testfällen ist über die Traceability-Matrix gegeben.

## 6. Konformität mit dem SQAP

### 6.1 Durchführung geplanter Maßnahmen

| **SQAP-Maßnahme** | **Status** | **Bemerkung** |
| --- | --- | --- |
| Reviews (Anforderungen/Design/Code/Dokumentation) | Durchgeführt | Projektintern dokumentiert |
| Testdurchführung | Durchgeführt | Unit-Test-Suite + SVP-Testkatalog |
| Traceability-Nachweis | Durchgeführt | Matrix gepflegt |

### 6.2 Abweichungen und Änderungen

- Abweichungen sind im SVP als bekannte Deviationen beschrieben und in der Matrix als `Deviation` markiert.
- Frühere pauschale Aussagen wie „100% erfüllt“ wurden entfernt, da sie nicht mit dem Projektstand konsistent sind.

## 7. Ergebnisse der Verifikations- und Validierungsmaßnahmen

### 7.1 Testergebnisse und Fehleranalyse

- Unit-Test-Suite: 125 Tests für 9 Module (gemäß Testdokumentation).
- System-/Use-Case-Verifikation: UC01–UC15 im SVP-Testkatalog abgedeckt.
- In der Matrix sind 24 Anforderungen als Deviation markiert; diese gelten als dokumentierte Lücken oder INS-basierte Nachweise statt vollständiger Feature-Erfüllung.

### 7.2 Einhaltung der Abnahmekriterien

| **Kriterium** | **Status** |
| --- | --- |
| Vollständige Traceability | Erfüllt |
| QS-Aktivitäten dokumentiert | Erfüllt |
| Vollständige Implementierung aller Requirements | Nicht erfüllt (24 Deviationen) |

## 8. Audit- und Review-Ergebnisse

### 8.1 Festgestellte Abweichungen / nicht erfüllte Anforderungen

Schwerpunkt-Abweichungen laut SVP:
- UC02 (Passwort-Reset-Flow)
- UC06-F3, UC06-F7 (Timer Pause/Fortsetzen, Reconnect-Pufferung)
- UC07-F4, UC08-F5 (Notendurchschnitt/Notenstatistik)
- UC09-F1..F3, UC09-NF2 (Notification-Settings und Zustellung)
- UC13-NF3/NF4, UC14-NF2, UC15-NF2 (Versionierung/Auditlog)

### 8.2 Maßnahmen zur Behebung

- Priorisierte Umsetzung der Deviationen nach Risiko/Nutzen.
- Nach Umsetzung: Re-Tests und Matrix-Status von `Deviation` auf `✓` umstellen.

## 9. Qualitätsmetriken und Leistungsbewertung

### 9.1 Analyse der Qualitätsmetriken

- Kernmetrik für die aktuelle Abgabe ist die Traceability-Matrix: 83/107 verifiziert (77.6%).
- Deviation-Quote: 24/107 (22.4%).
- Unit-Test-Umfang vorhanden (125 Tests), Integrationstests sind als Bereich im Test-Ordner vorgesehen.

### 9.2 Bewertung nach ECSS-orientierten Kriterien

| **Qualitätsaspekt** | **Bewertung (Projektstand 01.03.2026)** |
| --- | --- |
| Funktionale Eignung | Teilweise erfüllt (Deviationen vorhanden) |
| Nachvollziehbarkeit/Verifikation | Gut (vollständige Traceability) |
| Reifegrad für Produktivbetrieb | Nicht erreicht |
| Reifegrad für Modulabgabe (Prototyp) | Erreicht |

## 10. Lessons Learned und Empfehlungen

### 10.1 Verbesserungspotenziale

- Frühere Synchronisation von Requirements-Status und Matrix-Status.
- Einheitliche „Single Source of Truth“ für Kennzahlen (Matrix/SVP).
- Frühere Automatisierung von Integrations- und End-to-End-Tests.

### 10.2 Optimierungsvorschläge für den QA-Prozess

1. CI-basierte Testausführung bei jedem Merge.
2. Standardisiertes Deviation-Tracking mit Priorität/Owner/Target-Date.
3. Regelmäßiger Dokumenten-Konsistenzcheck (Requirements ↔ SVP ↔ SQAR).

## 11. Schlussfolgerungen und Freigabeempfehlungen

### 11.1 Gesamtbewertung

Die QS-Dokumentation ist nach dieser Revision konsistent mit dem aktuellen Projektstand. Die Verifikation ist nachvollziehbar, jedoch sind nicht alle Anforderungen umgesetzt.

### 11.2 Freigabeempfehlung

- ✅ **Freigabe für Modulabgabe (Prototyp-Stand)**
- ❌ **Keine Freigabe als produktive Vollversion**, bis die 24 Deviationen geschlossen sind

---

Ende des Dokuments.
