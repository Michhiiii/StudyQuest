# Aufwandsschätzung StudyQuest – Finalbewertung (Februar 2026)

**Projektname:** StudyQuest  
**Zeitraum:** Oktober 2025 – Februar 2026 (6 Monate - ABGESCHLOSSEN)  
**Datum:** 27.02.2026  
**Version:** 2.0 (Finale Auswertung)

---

## 1. Vergleich: Geschätzt vs. Tatsächlich

| Phase | Geschätzt (h) | Tatsächlich (h) | Abweichung (h) | Abweichung (%) |
|-------|---------------|-----------------|---|---|
| Projektskizze & SDP | 30 | 22 | -8 | -27% |
| Anforderungsanalyse | 70 | 58 | -12 | -17% |
| Grobdesign | 50 | 38 | -12 | -24% |
| Detailed Design | 60 | 45 | -15 | -25% |
| Implementierung | 150 | 122 | -28 | -19% |
| Testing & Verifikation | 80 | 55 | -25 | -31% |
| QA & Dokumentation | 60 | 48 | -12 | -20% |
| **GESAMT (ohne Puffer)** | **500** | **388** | **-112** | **-22%** |
| **Mit Puffer (15%)** | **575** | **445** | **-130** | **-23%** |

### Fazit

Die tatsächliche Projektdauer war deutlich geringer als geschätzt. Der Aufwand fiel um 23% unter die Planung. Dies ist auf mehrere Faktoren zurückzuführen: optimierte Prozesse, weniger komplexe technische Anforderungen als erwartet und fokussierte Implementierung.

---

## 2. Tatsächliche Aufwandsverteilung nach Team

| Rolle | Name | Geschätzt (h) | Tatsächlich (h) | Δ (h) | Δ (%) | Status |
|-------|------|---------------|-----------------|-------|-------|--------|
| **Scrum Master** | Michael Steer | 120 | 108 | -12 | -10% | Unter Plan |
| **Product Owner** | Luke Engehardt | 100 | 92 | -8 | -8% | Unter Plan |
| **Developer (Lead)** | Giuliana Carrano | 180 | 168 | -12 | -7% | Unter Plan |
| **Developer** | Paul Strasser | 50 | 15 | -35 | -70% | Sehr gering |
| **Developer** | Roman Faber | 45 | 12 | -33 | -73% | Sehr gering |
| **GESAMT** | | **495** | **395** | **-100** | **-20%** | Unter Plan |

### Analyse der einzelnen Aufwände

**Michael Steer (108h vs. 120h):**
- Koordination und Meetings effizienter durchgeführt
- Weniger zeitaufwändige Re-Planning-Sitzungen nötig
- Klare Team-Struktur reduzierte Overhead

**Luke Engehardt (92h vs. 100h):**
- Requirements weniger kontrovers als erwartet
- Stakeholder-Feedback schneller integrierbar
- Weniger Change-Request-Management nötig

**Giuliana Carrano (168h vs. 180h):**
- Frontend-Entwicklung effizienter als geplant
- Code-Wiederverwendung aus Templates
- Noch akzeptable Code-Qualität trotz schnellerem Tempo

**Paul Strasser (15h vs. 50h):**
- Nur 15 Stunden tatsächlich geleistet
- Geplant: Datenhaltung & Datenmodell-Design
- Tatsächlich: Minimale Beiträge (ca. 3-5% Beteiligung)
- Nicht beteiligte Aufgaben: JSON-Datenmodell wurde von Giuliana Carrano standardisiert

**Roman Faber (12h vs. 45h):**
- Nur 12 Stunden tatsächlich geleistet
- Geplant: Integration & Testing-Koordination
- Tatsächlich: Nur QA-Dokumentation und Spot-Checks (ca. 2-3% Beteiligung)
- Test-Framework wurde vorgefertigt genutzt

---

## 3. Detaillierte Aufwandsanalyse nach Use Cases

| UC | Beschreibung | Geschätzt | Tatsächlich | Δ | Status | Bemerkung |
|----|-------------|-----------|------------|---|--------|-----------|
| UC01 | Registrierung | 19h | 14h | -5h | Unter | Weniger Validierung als erwartet |
| UC02 | Passwort zurücksetzen | 13h | 0h | -13h | NICHT IMPL | Nicht prioritiert, deferred |
| UC03 | Login/Logout | 16h | 12h | -4h | Unter | Vereinfachte Session-Management |
| UC04 | Quest starten | 28h | 20h | -8h | Unter | Einfachere Logik als geplant |
| UC05 | Quest abschließen | 24h | 18h | -6h | Unter | Standardisierte Completion-Logik |
| UC06 | Timer | 20h | 8h | -12h | Unter | Timer-Pause nicht implementiert |
| UC07 | Noten verwalten | 22h | 16h | -6h | Unter | Vereinfachte Datenverwaltung |
| UC08 | Dashboard | 27h | 25h | -2h | Unter | Wie geplant |
| UC09 | Benachrichtigungen | 15h | 6h | -9h | Unter | Basis-Implementierung, keine Erwerbungen |
| UC10 | CSV Import/Export | 19h | 18h | -1h | Unter | Einfaches Parsing reichte |
| UC11 | Achievements | 15h | 10h | -5h | Unter | Fewer edge cases |
| UC12 | Leaderboard | 23h | 18h | -5h | Unter | Lokale Sortierung statt vollständig dynamisch |
| UC13 | Admin Login | 13h | 10h | -3h | Unter | Bestandteile von UC03 wiedergenutzt |
| UC14 | Quest-Admin | 27h | 19h | -8h | Unter | Admin-Interface vereinfacht |
| UC15 | Regelconfig | 19h | 12h | -7h | Unter | Config-Datei-basiert statt UI-gesteuert |
| | **SUMME** | **301h** | **206h** | **-95h** | **-32%** | Deutlich unter Budget |

### Erkenntnisse

- UC02 (Passwort-Reset) wurde nicht implementiert - klare Deviation
- Implementierung insgesamt 32% effizienter als geplant
- Viele Features einfacher zu bauen als initial geschätzt
- Team konnte Code-Wiederverwendung besser nutzen

---

## 4. Aufwand nach Aktivitätstypen

| Aktivität | Geschätzt (h) | Tatsächlich (h) | Δ (%) | Grund der Abweichung |
|-----------|---|---|---|---|
| **Code-Implementierung** | 157 | 98 | -38% | Einfachere Architektur, Code-Templates |
| **Testing & Verifikation** | 80 | 35 | -56% | Manuelle Tests ausreichend, keine Bugs |
| **Anforderungsanalyse** | 70 | 48 | -31% | Klare Anforderungen, weniger Iterations |
| **Design & Architektur** | 110 | 70 | -36% | Standard-3-Schichten-Modell, keine Anpassungen |
| **Dokumentation** | 100 | 75 | -25% | Weniger Prozess-Dokumentation nötig |
| **Code Reviews & Meetings** | 50 | 25 | -50% | Standardisierte Code-Größe, weniger Diskussionen |

**Beobachtung:** Die größten Einsparungen (56%, 50%) bei technischem Testing und Reviews. Dies deutet auf gute Initial-Planung und weniger Nacharbeiten hin.

---

## 5. Meilenstein-Erfüllung

| Meilenstein | Geplant | Tatsächlich | Δ (Tage) | Status | Bemerkung |
|-------------|---------|------------|---------|--------|-----------|
| M1 – Projektskizze | 17.10.2025 | 15.10.2025 | -2 | Früh | Kick-off schneller |
| M2 – SDP | 24.10.2025 | 22.10.2025 | -2 | Früh | Keine Fragen offen |
| M3 – Requirements | 21.11.2025 | 18.11.2025 | -3 | Früh | Anforderungen später gelöst |
| M4 – Grobdesign | 05.12.2025 | 28.11.2025 | -7 | Früh | UML schneller finalisiert |
| M5 – Prototyp | 10.01.2026 | 05.01.2026 | -5 | Früh | Implementation ahead of schedule |
| M6 – SDD & Test-Plan | 02.02.2026 | 01.02.2026 | -1 | Pünktlich | wie geplant |
| M7 – Finalisierung | 25.02.2026 | 23.02.2026 | -2 | Früh | Alle Aufgaben erledigt |

**Gesamtbeschleunigung:** -22 Tage über 6 Monate (4,3% schneller als geplant)

---

## 6. Risiken: Geplant vs. Realisiert

| Risiko | Eintritts-WK (geplant) | Realisiert? | Tatsächliche Auswirkung | Puffer (h) |
|--------|---|---|---|---|
| Unklare Requirements | 30% | Nein | 0h | 20h |
| Technische Probleme | 40% | Ja (minimal) | +2h Debugging | 5h |
| Teamausfälle | 25% | Nein (aber Underperformance P.S., R.F.) | -35h U-Pers., -33h U-Faber | 10h |
| Scope Creep | 15% | Nein | 0h | 5h |
| **SUMME RISIKOAUSWIRKUNG** | | | **-66h** | **40h / 75h genutzt (53%)** |

Der größte "Risiko"-Faktor war nicht ein klassisches Risiko, sondern die deutlich geringere Beteiligung von Paul Strasser und Roman Faber. Dies führte zu unerwarteter Effizienzsteigerung bei den aktiven Entwicklern.

---

## 7. Abweichungsanalyse & Hauptgründe

### Warum war der Aufwand 23% unter Planung?

#### 1. Optimierte Implementierung (−38%)
- Frontend-Framework und CSS-Templates wiederverwendet
- Keine komplexen Browser-APIs nötig, LocalStorage reichte
- Weniger Error-Handling als erwartet (Nutzerszenarios einfacher)

#### 2. Reduziertes Testing (−56%)
- Wenige kritische Bugs während Entwicklung
- Manuelle Test-Checklisten ausreichend
- Keine Test-Automatisierung nötig, da kleine Codebase

#### 3. Schlanke Dokumentation (−25%)
- Standardisierte Markdown-Templates
- Weniger Prozess-Dokumentation für 5er-Team
- Code war selbsterklärend in vielen Fällen

#### 4. Effiziente Anforderungsklärung (−31%)
- Stakeholder-Feedback konsistent und früh
- Keine Scope-Change zwischen Geschätzt und Implementierung (außer UC02)

#### 5. Hohe Team-Produktivität (−20%)
- Giuliana Carrano äußerst effizient
- Michael Steer & Luke Engehardt gute Koordination
- Wenig interne Meetings nötig

#### 6. Geringere Beteiligung von Paul Strasser & Roman Faber (−70%, −73%)
- Nicht durchdacht in Anforderungen
- Andere Arbeiten oder Priorisierungen
- Nur 27h von geplanten 95h (28% Personalauslastung)

---

## 8. Funktion Points – Retrospektive Neubeurteilung

**Initial geschätzte Function Points:** 15 UC, ca. 50-60 FP (LOW bis MEDIUM)  
**Realisierte Komplexität:** Durchschnittlich MEDIUM FP

**Faktor:** 1 FP ≈ 8-10 Stunden (Annahme)  
**Kalibrierung danach:** 1 FP ≈ 6-7 Stunden (tatsächlich)

**Empfehlung für nächste Projekte:** Faktor-Anpassung im SDP dokumentieren

---

## 9. Lessons Learned & Verbesserungen

### Was war gut
- Schätzkonferenzen waren effektiv
- Risik-Reserve war dimensioniert (53% genutzt)
- Meilenstein-Tracking funktionierte gut
- Team-Kommunikation war transparent

### Was war nicht gut
- Paul Strasser & Roman Faber unzureichend eingespannt
- Passwort-Reset wurde ignoriert (Deviation)
- Testing stark unterschätzt (zu konservativ initial)

### Für zukünftige Projekte
- Individuelle Kapazitätsplanung pro Person
- Strikte Scoping vor Anforderungsanalyse
- Risk-Review nach M3 und M5
- Testing-Automatisierung evaluieren (würde Kosten sparen)

---

## 10. Finales Urteil zur Schätzgenauigkeit

**Vergleich zu Branchennormen:**
- Typische SE-Projekte: 15-20% Abweichung
- Dieses Projekt: 23% Abweichung zu niedrig
- **Bewertung:** Schätzung war zu konservativ

**Root Cause Analysis für Overestimation:**
1. Zu pessimistische Implementierungs-Zeiten
2. Testing-aufwand überschätzt
3. Team-Produktivität unterschätzt
4. Personen-Allokation unrealistisch

**Rekommendation:** Für ähnliche Projekte FP-Faktor um 20% reduzieren.

---

## 11. Zusammenfassung

| Metrik | Geplant | Tatsächlich | Status |
|--------|---------|------------|--------|
| **Gesamt-Aufwand (mit Puffer)** | 575h | 445h | -23% |
| **Team-Aufwand (ohne Puffer)** | 495h | 395h | -20% |
| **Zeitplan (Meilensteine)** | 177 Tage | 155 Tage | -4% |
| **Implementierte Use Cases** | 15 | 14 | -1 (UC02) |
| **Qualität (Bugs, Issues)** | Plan | Gut | OK |
| **Team-Zufriedenheit** | Angenommen | Hoch | OK |

**PROJEKT STATUS:** ERFOLGREICH ABGESCHLOSSEN  
**Effizienzbewertung:** SEHR GUT (deutlich unter Budget)  
**Risiko-Management:** GUT (Reserve angemessen genutzt)

---

**Projekt:** StudyQuest v1.0  
**Freigegeben durch:** Michael Steer (Scrum Master)  
**Validiert durch:** Luke Engehardt (Product Owner)  
**Gültig ab:** 27.02.2026  
**Status:** ABGESCHLOSSEN
