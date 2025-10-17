# 🧾 Projektskizze – StudyQuest

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

## 📄 Changelog

| **Version** | **Datum**   | **Autor**         | **Änderungsbeschreibung**                   |
|--------------|-------------|-------------------|---------------------------------------------|
| 1.0          | 17.10.2025  | G. Carrano        | Erstfassung der Projektskizze erstellt      |
| 1.1          |             |                   | Änderungen nach Review durch Team           |
| 1.2          |             |                   | Finalversion zur Abgabe vorbereitet         |

---

## 👥 Distribution List

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
# Projektskizze: StudyQuest – Gamifizierte Lern- und Notenverwaltungs-Web-App
===========================================================================

Projektmitglieder:
------------------
-Michael Steer
-Luke Engehardt
-Giuliana Carrano
-Paul Strasser
Roman Faber


## 1. Projektidee
--------------
„StudyQuest“ ist eine Lernapplikation, die Studierende durch **Gamification** zum regelmäßigen Lernen motivieren und gleichzeitig bei der **Organisation ihrer Studienleistungen** unterstützt.  
Die App läuft im Web-Browser und ist somit plattformunabhängig (Mac, Windows, Linux).  
Spielerische Elemente wie Level, Quests, Erfahrungspunkte und Belohnungen** visualisieren Lernfortschritte.  
Zusätzlich integriert die Webapplikation eine Notenverwaltung, um Lernaktivität und Studienleistungen in einem System zu verknüpfen.

## 2. Projektziele
---------------
- Lernfortschritt spielerisch darstellen und Motivation fördern  
- Verwaltung von Noten und Studienleistungen ermöglichen  
- Alle relevanten Software-Engineering-Prozesse dokumentieren: Analyse, Design, Architektur, Test, Projektplanung  
- Prototypisch oder als Mockup eine Web-App umsetzen, ohne vollständige Implementierung  

## 3. Stakeholder
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

## Glossar
- **Gamification:** Einsatz spieltypischer Elemente in einem nicht-spielerischen Kontext, um Motivation und Engagement zu erhöhen.
- **XP (Erfahrungspunkte):** Punkte, die für abgeschlossene Lernaktivitäten vergeben werden und den Fortschritt visualisieren.
- **Mockup:** Prototypische Darstellung der App-Oberfläche ohne vollständige Funktionalität.

## 6. Abhängigkeiten
-----------------
- Abhängigkeit von Webbrowsern (Chrome, Edge, Firefox, Safari)  
- Internetverbindung erforderlich für Online-Funktionen (optional bei Prototyp)  
- GitHub oder GitLab zur Versionskontrolle und Teamkoordination  
- Zeitplan abhängig von Verfügbarkeit der Teammitglieder  
- Verwendung gemeinsamer Entwicklungsumgebung (z. B. Visual Studio Code, Node.js)  

## 7. Randbedingungen
------------------
- Projektzeitraum: zwei Trimester  
- Teamgröße: 5 Personen  
- Fokus auf Prozess und Dokumentation, keine vollständige Implementierung  
- Einhaltung der im Modul „Software Engineering“ geforderten Vorgehensmodelle und Standards  
- Nutzung kostenloser Tools und Open-Source-Komponenten  
- Datenschutz: Keine echten Personendaten im Prototyp  

## 8. Auswirkungen auf Stakeholder
-------------------------------
| Stakeholder | Positive Auswirkungen | Negative / mögliche Risiken |
|--------------|----------------------|-----------------------------|
| **Studierende** | Mehr Motivation durch spielerisches Lernen; bessere Übersicht über Noten | Gefahr von Ablenkung durch Gamification-Elemente |
| **Projektteam** | Praxiserfahrung in Software-Engineering-Prozessen | Zeitdruck und Abstimmungsaufwand |
| **Projektbetreuer** | Erhält anschauliches Beispiel für Lehrzwecke | Mehr Aufwand in Betreuung und Bewertung |
| **Dozent:innen** | Möglichkeit, Lernfortschritt der Studierenden besser einzuschätzen | Keine direkte Integration in Uni-Systeme |
| **Systemadministrator** | Klare Struktur, einfache Wartung durch Web-Technologien | Zusätzliche Wartungsaufgaben bei realem Einsatz |

## 9. Erwartete Ergebnisse
------------------------
- Lasten- und Pflichtenheft  
- UML-Diagramme (Use Case, Klassendiagramm, Sequenzdiagramm)  
- Architekturkonzept (3-Schichten-Webarchitektur)   
- Testkonzept (Unit-, Integrations-, Systemtests)  
- UI-Mockup oder Prototyp  

## 10. Fazit
---------
„StudyQuest“ kombiniert Gamification mit Notenverwaltung und wird als Web-App umgesetzt.  
Das Projekt ist ideal, um die Phasen Analyse, Design, Implementierung und Test praxisnah zu demonstrieren, ohne eine vollständige Implementierung schreiben zu müssen.
