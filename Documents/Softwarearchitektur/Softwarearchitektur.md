# Softwarearchitektur – StudyQuest

## Einleitung

*StudyQuest* ist eine gamifizierte Web-App zur Lern- und Notenverwaltung.  Die Implementierung basiert auf einem einfachen Client-Side-Stack (HTML, CSS und JavaScript) und verwendet den Browser‐**LocalStorage** als Persistenzschicht.  Das System wurde gemäß dem **3-Schichten-Modell** entwickelt:contentReference[oaicite:0]{index=0}, bestehend aus einer Präsentations-, einer Anwendungs- und einer Datenebene.  Die folgenden Abschnitte gehen auf die Anforderungen aus dem Software-Engineering-Praxis-Aufgabenblatt ein, insbesondere auf:

- Beschreibung der Hauptmodule und ihrer Interaktionen in einem Paket-/Moduldiagramm.
- Modellierung der Abhängigkeiten zwischen Analyse-Klassen und den eingesetzten „Frameworks“:contentReference[oaicite:1]{index=1}.
- Verfeinerung des Analyse-Klassenmodells basierend auf den gewählten Technologien.
- Beschreibung von Referenzarchitekturen.

## Hauptmodule & Interaktionen

Die Anwendung folgt einem **dreischichtigen Architektur-Pattern**.  Die Präsentations- und Business-Logik laufen komplett im Browser; es gibt kein separates Backend.  Die nachstehende Tabelle fasst die wichtigsten Module zusammen und ordnet sie der jeweiligen Schicht zu:contentReference[oaicite:2]{index=2}:

| Schicht/Modul | Aufgabe | Erläuterung |
| --- | --- | --- |
| **Präsentationsschicht** |  | Die Präsentationsschicht besteht aus `index.html`, diversen CSS-Dateien und `ui.js`.  Sie liefert die Benutzeroberfläche, rendert Seiten dynamisch und leitet Benutzeraktionen an die Anwendungsschicht weiter:contentReference[oaicite:3]{index=3}. |
| `index.html` | Einstiegspunkt der Single-Page-App | Bindet CSS- und JS-Module ein und definiert Platzhalter für das UI:contentReference[oaicite:4]{index=4}. |
| `css/` | Styling | Enthält Stildefinitionen für Authentifizierung, Dashboard, Leaderboard, Admin-Bereiche usw. |
| `ui.js` | UI-Renderer | Verwaltet das DOM, zeigt Seiten (Login, Dashboard, Quest-Ansicht, Admin-Panel usw.) an und reagiert auf Klicks. |
| **Anwendungs-/Business-Schicht** |  | Hier liegen sämtliche Geschäftslogik-Module:contentReference[oaicite:5]{index=5}.  Die Module kommunizieren über gemeinsame Datenstrukturen und rufen sich gegenseitig auf. |
| `app.js` | Router & Controller | Zentrale Steuerung der Single-Page-App.  Lädt Benutzer-Sessions, initialisiert die Datenbank, leitet Navigation (Dashboard, Quests, Leaderboard, Admin) und koordiniert andere Module. |
| `auth.js` | Authentifizierung | Handhabt Registrierung, Login/Logout sowie die Darstellung der Auth-Formulare.  Ruft bei Erfolg `user.js` und `app.js` auf. |
| `user.js` | Benutzerverwaltung | Enthält das User-Modell (u. a. Level, XP, Rollen).  Prüft Credentials, verwaltet die aktuelle Session und implementiert Rollen- und Streak-Logik. |
| `quest.js` | Quest-System | Startet und beendet Quests, berechnet XP-Belohnungen, legt neue Lern-Sessions an und aktualisiert die Benutzer-Historie. |
| `grade.js` | Notenverwaltung | CRUD-Operationen für Noten; unterstützt CSV-Import/Export und Tabellenansicht. |
| `notification.js` | Benachrichtigungen | Erzeugt Toasts und Bell-Notifications bei Quest-Abschluss, Level-Ups und Achievements. |
| `achievement.js` | Achievements & Badges | Prüft Bedingungen (Anzahl Quests, Level, Geschwindigkeit) und vergibt Badges. |
| `leaderboard.js` | Rankings & Streaks | Berechnet Rankings nach XP, Level, erledigten Quests und Tages-Streaks; zeigt Top-10-Tabellen an. |
| `admin.js` | Admin-Funktionen | Ermöglicht das Erstellen/Ändern/Löschen von Quests, das Konfigurieren der Spielregeln sowie die Benutzer- und Rollenverwaltung. |
| **Daten-/Persistenzschicht** |  | Ein einziger Modul, `db.js`, kapselt sämtliche Speicherzugriffe:contentReference[oaicite:6]{index=6}. |
| `db.js` | LocalStorage-Manager | Verwaltet den Zugriff auf LocalStorage (Users, Quests, Sessions, Timer, Grades, Notifications, Achievements, Game Rules):contentReference[oaicite:7]{index=7}, initialisiert Default-Werte und bietet CRUD-Funktionen für jede Entität. |

### Interaktionsdiagramm (ASCII-Abstraktion)

+-------------------------------------------------------------+
| Presentation Layer: index.html, css/, ui.js |
| - zeigt Seiten, sammelt Benutzereingaben |
+---------------------------|---------------------------------+
v
+-------------------------------------------------------------+
| Application Layer: app.js, user.js, quest.js, auth.js, ... |
| - enthält Geschäftslogik (Registrierung, Quests, |
| Noten, Benachrichtigungen, Achievements, Admin-Panel) |
+---------------------------|---------------------------------+
v
+-------------------------------------------------------------+
| Data Layer: db.js |
| - kapselt LocalStorage, speichert Users, Quests, Sessions |
+-------------------------------------------------------------+

Die Pfeile zeigen den Kontroll- und Datenfluss: Die Präsentationsschicht ruft Funktionen der Anwendungs-Schicht auf (z. B. beim Abschließen einer Quest), diese wiederum lesen/schreiben Daten über die Persistenzschicht.  Umgekehrt sendet die Datenbank keine direkten Events an die Anwendung, sondern die Business-Logik zieht Daten bei Bedarf.

## Abhängigkeiten zwischen Analyse-Klassen und Technologien

Das Analyseklassenmodell (siehe Grobdesign) definiert die wesentlichen Domänenklassen **User**, **Quest**, **LearningSession**, **Grade**, **Achievement**, **Notification**, **GameRule** und **Timer**.  In der Implementierung werden diese Klassen größtenteils als JavaScript-Objekte und Collections in LocalStorage realisiert:contentReference[oaicite:8]{index=8}, einige werden durch Module gekapselt:

- **User** – Repräsentiert einen Benutzer mit Eigenschaften wie `id`, `email`, `name`, `password_hash`, `level`, `xp` und `role`:contentReference[oaicite:9]{index=9}.  Geschäftslogik‐Methoden (z. B. `login`, `updateStreak`, `isAdmin`) befinden sich in `user.js`.  Persistiert wird das Objekt in `users`-Store im LocalStorage:contentReference[oaicite:10]{index=10}.
- **Quest** – Definiert Lernaufgaben (`id`, `title`, `description`, `difficulty`, `xp_reward`, `status`):contentReference[oaicite:11]{index=11}.  Funktionen wie `startQuest()`, `completeQuest()` und XP-Berechnung liegen in `quest.js`, die Instanzen werden im `quests`-Store des LocalStorage verwaltet:contentReference[oaicite:12]{index=12}.
- **LearningSession** – Audit-Trail für Quest-Abschlüsse; enthält `id`, `user_id`, `quest_id`, `xp_earned` und `completed_at`:contentReference[oaicite:13]{index=13}.  Sessions werden über `quest.js` und `db.js` erzeugt und gespeichert.
- **Grade** – Enthält Noten (`id`, `user_id`, `subject`, `value`) und wird durch `grade.js` verwaltet.  Persistiert im `grades`-Store; Import/Export via CSV wird vom Modul unterstützt.
- **Achievement** – Repräsentiert freischaltbare Badges; `achievement.js` definiert die Bedingungen und pflegt eine Liste freigeschalteter Badges im `achievements`-Store.
- **Notification** – Temporäre Ereignisse, die dem User angezeigt werden; gespeichert im `notifications`-Store und von `notification.js` angezeigt.
- **GameRule** – Konfigurierbare Spielparameter wie XP-Werte pro Quest-Schwierigkeit, Level-Threshold und maximale Level:contentReference[oaicite:14]{index=14}.  `admin.js` erlaubt Admins, die Regeln zu bearbeiten; die Werte werden im `game_rules`-Store persistiert.
- **Timer** – Wird für laufende Quests benötigt; speichert Start-Zeit und restliche Sekunden im `timers`-Store.  `quest.js` und `ui.js` koordinieren das Timer-Display und einen XP-Bonus.

**Framework-Abhängigkeiten:** Die Anwendung nutzt **kein externes Frontend- oder Backend-Framework**; alle Module sind in Vanilla-JavaScript geschrieben:contentReference[oaicite:15]{index=15}.  Als persistente Technologie dient der Browser-LocalStorage:contentReference[oaicite:16]{index=16}.  Die einzige „Framework-Abhängigkeit“ ist daher die Browser-API (DOM, LocalStorage).  Diese beeinflusst das Klassenmodell wie folgt:

- Jedes Objekt muss eine serialisierbare Struktur besitzen (JSON), da LocalStorage nur Strings speichert.  Deshalb haben alle Entitäten eindeutige `id`-Felder und werden als flache Objekte gespeichert.
- Passwörter werden im Prototyp lediglich Base64-kodiert, was in einer produktiven Architektur durch eine kryptographische Hash-Funktion (z. B. bcrypt) ersetzt werden sollte:contentReference[oaicite:17]{index=17}.
- Da keine Live-Datenbank existiert, gibt es keine konkurrierenden Zugriffe; Transaktionen werden in der Business-Logik implementiert (z. B. bei `completeQuest()` in `quest.js` wird XP vergeben, Level aktualisiert und eine Session angelegt in atomarer Reihenfolge:contentReference[oaicite:18]{index=18}).

## Verfeinerung des Analyse-Klassenmodells

Auf Basis der Implementierung wurden einige Anpassungen am Analyse-Klassenmodell vorgenommen:

1. **Eindeutige IDs und Persistenz-Attribute:**  Alle Klassen besitzen ein `id`-Attribut, um Objekte im LocalStorage referenzieren zu können.  Für Relationen (z. B. `user_id` in LearningSession, `quest_id` in Timer) werden Fremdschlüssel als IDs gespeichert:contentReference[oaicite:19]{index=19}.
2. **Rollen und Rechte:**  Das `User`-Objekt erhielt ein Feld `role`/`is_admin` zur Unterscheidung zwischen normalen Benutzern und Administratoren.  Dies wird von `admin.js` verwendet, um zu entscheiden, ob Admin-Funktionen angezeigt werden.
3. **Status-Felder:**  `Quest` enthält ein `status`-Attribut (z. B. „available“, „active“, „completed“) und die IDs aktiver Quests werden im User-Objekt gespeichert (`active_quest_id`):contentReference[oaicite:20]{index=20}.
4. **Audit-Trail:**  Die Klasse `LearningSession` wurde eingeführt, um jeden Quest-Abschluss mit Zeitstempel zu speichern:contentReference[oaicite:21]{index=21}.  Diese Daten werden für Achievements, Leaderboard-Berechnungen und Streak-Updates genutzt.
5. **Timer als eigene Entität:**  Obwohl Timer zunächst nur UI-Logik war, wird es als persistentes Objekt im LocalStorage gespeichert, damit das Zeit-Tracking nach Seiten-Reload fortgesetzt werden kann.  Timer hält Verweise auf den User und die Quest und speichert Start- und Endzeit.

## Referenzarchitektur

Die Anwendung orientiert sich an zwei bekannten Referenzarchitekturen:

1. **3-Schichten-Architektur (Presentation – Application – Data):** Die Schichten entkoppeln UI, Geschäftslogik und Persistenz:contentReference[oaicite:22]{index=22}.  Dadurch können Anpassungen an der Oberfläche (z. B. neues CSS-Framework) ohne Änderungen der Logik erfolgen.  Die Business-Schicht orchestriert Use Cases, während die Data-Schicht einzige Quelle der Wahrheit ist.  In StudyQuest ist diese Architektur allerdings komplett client-seitig implementiert, da es keinen Server gibt.

2. **Model–View–Controller (MVC) als Variationsmuster:** Obwohl kein Framework wie Angular/React eingesetzt wird, lassen sich die Module grob dem MVC-Prinzip zuordnen.  `ui.js` fungiert als View (Darstellung), die Module wie `user.js`, `quest.js` usw. bilden das Model (Domänenlogik), und `app.js` dient als Controller (Routing und Koordination).  Dieses Muster erleichtert das Verständnis der Interaktionen und unterstützt die testbare Umsetzung der Use Cases.

3. **Single-Page-Application (SPA) Architektur:** Durch das Laden aller Module in `index.html`:contentReference[oaicite:23]{index=23} läuft die App vollständig im Browser.  Das Routing zwischen Seiten wird von `app.js` gesteuert, ohne dass der Browser neu lädt.  Die Persistenz in LocalStorage macht die Anwendung offline-fähig; in einer späteren Version könnte diese Schicht durch ein REST-Backend ersetzt werden.

## Schlussbemerkung

Die vorliegende Arc
hitektur erfüllt die Anforderungen des Aufgabenblatts zur Softwar
earchitektur und deckt die Implementierung von *StudyQuest* ab.  Sie beschreibt die Hauptmodule und deren Beziehungen, modelliert die Abhängigkeiten zwischen Analyse-Klassen und den verwendeten Browser-APIs, verfeinert das Klassenmodell entsprechend der gewählten Technologien und ordnet das Projekt in bekannte Referenzarchitekturen ein.  Für die weitere Entwicklung könnte die Persistenzschicht durch eine echte Datenbank (z. B. Firebase oder PostgreSQL) ersetzt werden, und es ließe sich ein Backend mit sicheren Auth-Mechanismen einführen, um den prototypischen Charakter zu überwinden.

![images](https://github.com/user-attachments/assets/ae9abc83-ed79-41fe-81af-5c49413f714b)
