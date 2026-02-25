# Projektskizze – StudyQuest

---

**Titel des Dokuments:**  
Projektskizze – StudyQuest

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
| 1.0          | 17.10.2025  | M. Steer          | Erstfassung der Projektskizze erstellt      |
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


# Projektskizze: StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App
===========================================================================

Projektmitglieder:
------------------
-Michael Steer

-Luke Engehardt

-Giuliana Carrano

-Paul Strasser

-Roman Faber


## 1. Projektidee
--------------
„StudyQuest“ ist eine Lernapplikation, die Studierende durch **Gamification** zum regelmäßigen Lernen motivieren und gleichzeitig bei der **Organisation ihrer Studienleistungen** unterstützt.  
Die App läuft im Web-Browser und ist somit plattformunabhängig (Mac, Windows, Linux).  
Spielerische Elemente wie Level, Quests, Erfahrungspunkte und Belohnungen** visualisieren Lernfortschritte.  
Zusätzlich integriert die Webapplikation eine Notenverwaltung, um Lernaktivität und Studienleistungen in einem System zu verknüpfen.

## 2. Scope of Work

Der Scope of Work definiert den inhaltlichen Umfang des Projekts „StudyQuest“ und grenzt eindeutig ab, welche Leistungen im Rahmen des Projekts erbracht werden und welche Inhalte nicht Bestandteil des Projekts sind.

Zum Projektumfang gehören die Analyse der Anforderungen an eine gamifizierte Lern- und Notenverwaltungs-Web-Applikation sowie die Definition der Projektziele. Darüber hinaus umfasst das Projekt die konzeptionelle Ausarbeitung der Anwendung, einschließlich der Definition einer geeigneten Softwarearchitektur sowie der Modellierung relevanter UML-Diagramme wie Use-Case-, Klassen- und Sequenzdiagramme.

Nicht Bestandteil des Projekts sind die vollständige Implementierung der Web-Applikation, der produktive Betrieb des Systems sowie die Anbindung an bestehende Hochschul- oder Notenverwaltungssysteme. Ebenso werden keine realen personenbezogenen oder prüfungsrelevanten Daten verarbeitet. Der Fokus liegt auf der methodischen Anwendung von Software-Engineering-Prozessen und nicht auf der Entwicklung eines marktreifen Produkts.

## 3. Risiken

Im Rahmen des Projekts bestehen verschiedene Risiken, die den Projektverlauf oder die Qualität der Ergebnisse beeinflussen können. Ein zentrales Risiko liegt in zeitlichen Engpässen, die durch parallele Studienleistungen oder eingeschränkte Verfügbarkeit einzelner Teammitglieder entstehen können. Dies kann zu Verzögerungen bei der Bearbeitung einzelner Projektphasen führen.

Ein weiteres Risiko besteht in Abstimmungsproblemen innerhalb des Teams, insbesondere bei der gemeinsamen Erarbeitung konzeptioneller Inhalte und der Dokumentation. Unklare Zuständigkeiten oder Kommunikationsprobleme können den Fortschritt des Projekts beeinträchtigen.

Darüber hinaus besteht ein technisches Risiko in der Wahl und Nutzung von Werkzeugen und Technologien, insbesondere wenn neue oder bislang wenig genutzte Tools eingesetzt werden. Dies kann zu zusätzlichem Einarbeitungsaufwand führen.

Durch eine frühzeitige Aufgabenverteilung, regelmäßige Abstimmungen im Team sowie eine realistische Zeitplanung sollen diese Risiken minimiert werden.

## 4. Projektziele
---------------
- Lernfortschritt spielerisch darstellen und Motivation fördern  
- Verwaltung von Noten und Studienleistungen ermöglichen  
- Alle relevanten Software-Engineering-Prozesse dokumentieren: Analyse, Design, Architektur, Test, Projektplanung  
- Prototypisch oder als Mockup eine Web-App umsetzen, ohne vollständige Implementierung  

## 5. Stakeholder
--------------
### Primäre Stakeholder
| Rolle | Beschreibung |
|--------|---------------|
| **Studierende** | Hauptnutzer, verwenden StudyQuest zum Lernen und Verwalten von Noten |
| **Projektteam** | Entwickelt, dokumentiert und präsentiert die Anwendung |
| **Projektbetreuer (Dozent)** | Bewertet das Projekt im Rahmen des Moduls |
| **Dozent:innen (potenzielle Nutzer)** | Könnten Lernquests oder Themenbereiche bereitstellen |

### Sekundäre Stakeholder
| Rolle | Beschreibung |
|--------|---------------|
| **Systemadministrator** | Wartet das System und verwaltet Benutzerkonten |
| **Gamification Designer (intern)** | Definiert Level-, XP- und Belohnungssystem |
| **Tester / Qualitätssicherung** | Überprüft Funktionalität, Usability und Qualität |
| **UX/UI-Designer (intern)** | Sorgt für eine intuitive und motivierende Benutzeroberfläche |

## 6. Glossar
- **Gamification:** Einsatz spieltypischer Elemente in einem nicht-spielerischen Kontext, um Motivation und Engagement zu erhöhen.
- **XP (Erfahrungspunkte):** Punkte, die für abgeschlossene Lernaktivitäten vergeben werden und den Fortschritt visualisieren.
- **Mockup:** Prototypische Darstellung der App-Oberfläche ohne vollständige Funktionalität.

## 7. Abhängigkeiten
-----------------
- Abhängigkeit von Webbrowsern (Chrome, Edge, Firefox, Safari)  
- Internetverbindung erforderlich für Online-Funktionen (optional bei Prototyp)  
- GitHub oder GitLab zur Versionskontrolle und Teamkoordination  
- Zeitplan abhängig von Verfügbarkeit der Teammitglieder  
- Verwendung gemeinsamer Entwicklungsumgebung (z. B. Visual Studio Code, Node.js)  

## 8. Randbedingungen
------------------
- Projektzeitraum: zwei Trimester  
- Teamgröße: 5 Personen  
- Fokus auf Prozess und Dokumentation, keine vollständige Implementierung  
- Einhaltung der im Modul „Software Engineering“ geforderten Vorgehensmodelle und Standards  
- Nutzung kostenloser Tools und Open-Source-Komponenten  
- Datenschutz: Keine echten Personendaten im Prototyp  

## 9. Auswirkungen auf Stakeholder
-------------------------------
| Stakeholder | Positive Auswirkungen | Negative / mögliche Risiken |
|--------------|----------------------|-----------------------------|
| **Studierende** | Mehr Motivation durch spielerisches Lernen; bessere Übersicht über Noten | Gefahr von Ablenkung durch Gamification-Elemente |
| **Projektteam** | Praxiserfahrung in Software-Engineering-Prozessen | Zeitdruck und Abstimmungsaufwand |
| **Projektbetreuer** | Erhält anschauliches Beispiel für Lehrzwecke | Mehr Aufwand in Betreuung und Bewertung |
| **Dozent:innen** | Möglichkeit, Lernfortschritt der Studierenden besser einzuschätzen | Keine direkte Integration in Uni-Systeme |
| **Systemadministrator** | Klare Struktur, einfache Wartung durch Web-Technologien | Zusätzliche Wartungsaufgaben bei realem Einsatz |

