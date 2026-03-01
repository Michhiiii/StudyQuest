# Software Quality Assurance Report (SQAR) – StudyQuest

**Projekt:** StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App  
**Modul:** Software Engineering I – Praxis  
**Version:** 1.2  
**Datum:** 01.03.2026

---

## Changelog

| **Version** | **Datum** | **Änderung** |
| --- | --- | --- |
| 1.0 | 24.02.2026 | Erstfassung |
| 1.1 | 28.02.2026 | Formale Überarbeitung |
| 1.2 | 01.03.2026 | Konsistenzabgleich mit SVP und Traceability-Matrix |

---

## 1. Zusammenfassung der Qualitätssicherungstätigkeiten

Durchgeführt wurden Requirements-/Design-Reviews, Code-Reviews, Unit-Tests und Systemverifikation gemäß SVP. Die Nachvollziehbarkeit von Requirement-ID zu Testfall ist über die Traceability-Matrix gegeben.

## 2. Konformität mit dem SQAP

### 2.1 Überprüfung geplanter Maßnahmen

| **Geplante Maßnahme** | **Erfüllt** | **Nachweis** |
| --- | --- | --- |
| Review-Aktivitäten | Ja | Projektdokumente / Teamprozess |
| Testdurchführung | Ja | `10_Durchfuehrung/tests/` und SVP-Testkatalog |
| Traceability-Dokumentation | Ja | `SVP_StudyQuest_Traceability_Matrix.csv` |

### 2.2 Dokumentation von Abweichungen und Änderungen

Abweichungen sind in SVP und Matrix als `Deviation` dokumentiert. Frühere Aussagen mit „100% erfüllt“ wurden verworfen, da sie nicht dem aktuellen Verifikationsstand entsprechen.

## 3. Ergebnisse der Verifikations- und Validierungsmaßnahmen

### 3.1 Testergebnisse, Fehleranalyse, Korrekturmaßnahmen

- Unit-Test-Bestand: 125 Tests in 9 Modulen (laut `tests/README.md`).
- System-/Use-Case-Verifikation: UC01–UC15 sind testseitig abgedeckt.
- Deviationen: 24 Anforderungen sind nicht vollständig umgesetzt und entsprechend markiert.

### 3.2 Einhaltung der Abnahmekriterien

| **Abnahmekriterium** | **Status** |
| --- | --- |
| Nachvollziehbarkeit (Traceability) | Erfüllt |
| Dokumentierte QS-Maßnahmen | Erfüllt |
| Vollständige Requirement-Umsetzung | Nicht vollständig erfüllt |

## 4. Audit- und Review-Ergebnisse

### 4.1 Festgestellte Abweichungen / nicht erfüllte Anforderungen

Wesentliche Deviation-Blöcke:
- UC02 (Passwort-Reset)
- UC06-F3/F7
- UC07-F4, UC08-F5
- UC09-F1..F3, UC09-NF2
- UC13-NF3/NF4, UC14-NF2, UC15-NF2

### 4.2 Maßnahmen zur Behebung identifizierter Probleme

- Priorisierte Umsetzung der Deviationen.
- Re-Test und Matrix-Update nach jeder umgesetzten Anforderung.

## 5. Qualitätsmetriken und Leistungsbewertung

### 5.1 Analyse der erfassten Qualitätsmetriken

| **Metrik** | **Wert (01.03.2026)** |
| --- | --- |
| Anforderungen gesamt (Matrix) | 107 |
| Verifiziert (`✓`) | 83 |
| Deviation (`Deviation`) | 24 |
| Erfüllungsquote (`✓`/Gesamt) | 77.6% |
| Unit-Test-Umfang | 125 Tests |

### 5.2 Bewertung basierend auf ECSS-orientierten Kriterien

| **Kriterium** | **Bewertung** |
| --- | --- |
| Produktqualität / Funktionserfüllung | Teilweise erfüllt |
| Verifikationsnachweis | Gut |
| Reifegrad für Prototyp-Abgabe | Erfüllt |
| Reifegrad für Produktivbetrieb | Nicht erfüllt |

## 6. Lessons Learned und Empfehlungen

### 6.1 Verbesserungspotenziale

- Frühere Synchronisierung von Requirement-Status und Matrix.
- Weniger manuelle Mehrfachpflege von Kennzahlen in mehreren Dokumenten.
- Mehr automatisierte Integrations-/E2E-Tests.

### 6.2 Vorschläge zur Optimierung des QA-Prozesses

1. Einheitliches Deviation-Tracking mit Verantwortlichen und Zielterminen.
2. CI-basierte Testausführung und standardisierte Reports.
3. Regelmäßige Konsistenzprüfung zwischen Requirements, SVP, SQAR und Matrix.

## 7. Schlussfolgerungen und Freigabeempfehlungen

### 7.1 Gesamtbewertung der Softwarequalität

Die Qualitätssicherungsaktivitäten sind nachvollziehbar dokumentiert. Der aktuelle Projektstand zeigt jedoch offene Deviationen, die eine vollständige funktionale Erfüllung verhindern.

### 7.2 Freigabeempfehlung

- ✅ Freigabe für die **Modulabgabe als Prototyp**
- ⚠️ Nachbesserungen erforderlich für eine **produktive Vollfreigabe** (Schließen der 24 Deviationen)

---

Ende des Dokuments.
