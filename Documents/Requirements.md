## UC01 – Registrieren & Einloggen
### Funktionale Anforderungen
UC01-F1: System muss die Registrierung mit E-Mail und Passwort erlauben.
UC01-F2: System muss prüfen, ob die E-Mail schon existiert; bei vorhandener E-Mail kein neues Konto anlegen.
UC01-F3: System muss den Login mit E-Mail und Passwort erlauben.
UC01-F4: Bei erfolgreichem Login muss das System das Dashboard anzeigen.
### Nicht-funktionale Anforderungen (minimal)
UC01-NF1: Passwort darf nicht im Klartext gespeichert werden (gehashter Speicher).
UC01-NF2: Fehlermeldungen dürfen nicht verraten, ob ein Account existiert („E-Mail oder Passwort falsch“).
## UC02 – Passwort zurücksetzen
### Funktionale Anforderungen
UC02-F1: System muss über „Passwort vergessen“ eine E-Mail zum Zurücksetzen anfordern lassen.
UC02-F2: System muss einen zeitlich begrenzten Link/Token generieren und an die angegebene E-Mail senden.
UC02-F3: Über den Link muss der/die Nutzer:in ein neues Passwort setzen können.
UC02-F4: Nach Setzen des neuen Passworts muss das alte Passwort ungültig sein.
### Nicht-funktionale Anforderungen (minimal)
UC02-NF1: Antwort bei „Passwort vergessen“ ist immer neutral (kein Account-Leak).
UC02-NF2: Reset-Link hat eine Ablaufzeit (z. B. 30 min).
## UC03 – Profil & Einstellungen verwalten
### Funktionale Anforderungen
UC03-F1: System muss die aktuellen Profildaten des eingeloggten Nutzers anzeigen.
UC03-F2: System muss das Ändern grundlegender Profildaten (Name, Studiengang, Avatar/Profilbild) erlauben.
UC03-F3: System muss die Änderungen speichern und erneut anzeigen.
### Nicht-funktionale Anforderungen (minimal)
UC03-NF1: Nur der/die eingeloggte Nutzer:in darf sein/ihr eigenes Profil ändern.
UC03-NF2: Bei Fehlern (Pflichtfeld leer, zu lang) zeigt das System eine verständliche Fehlermeldung.

## A4 – Lernquest starten
**Typ:** Benutzerinteraktion (Typ 2)

**Beschreibung:**  
Wenn ein:e eingeloggte:r Nutzer:in eine verfügbare Lernquest auswählt, muss das System die Möglichkeit bieten, diese Quest zu starten.  
Nach der Bestätigung durch den Nutzer wird der Quest-Status im System auf **„aktiv“** gesetzt und der Startzeitpunkt gespeichert.

**Rationale:**  
Der Beginn einer Lernquest ist der Einstiegspunkt in den gamifizierten Lernprozess.  
Nur durch den Statuswechsel auf *aktiv* kann das System Fortschritt, XP-Zuwachs und Timer-Tracking korrekt zuordnen.

**Fit Criterion:**  
Nach dem Start muss im Benutzerkonto sofort eine aktive Quest mit dem Status „aktiv“ erscheinen, und der Startzeitstempel wird in der Datenbank protokolliert.  
Messbar: Abfrage der Datenbank zeigt neuen Eintrag `quest_status='aktiv'` innerhalb von ≤ 1 Sekunde.

---

## A5 – Lernquest abschließen (XP & Level-Up)
**Typ:** Selbstständige Systemaktivität (Typ 1)

**Beschreibung:**  
Wenn eine aktive Quest vom Nutzer beendet wird, muss das System automatisch die zugehörigen XP gutschreiben und den neuen Gesamt-XP-Stand speichern.  
Wird durch die Gutschrift eine Level-Schwelle überschritten, muss das System das neue Level freischalten und visuell bestätigen.

**Rationale:**  
Das automatische XP- und Level-System ist der zentrale Motivationsmechanismus der App.  
Nur durch eine konsistente XP-Verbuchung und unmittelbares Feedback bleibt der Spielfortschritt nachvollziehbar und fälschungssicher.

**Fit Criterion:**  
Nach dem Abschluss einer Quest mit z. B. 50 XP muss der Gesamt-XP-Wert des Nutzers exakt um 50 steigen.  
Wenn die neue Summe ≥ Levelgrenze, wird das neue Level mit Zeitstempel freigeschaltet.  
Messbar: XP-Differenz = XP der Quest ± 1 ; Leveländerung tritt innerhalb ≤ 2 Sekunden auf.

---

## A6 – Lern-Session per Timer tracken
**Typ:** Kombination aus Benutzerinteraktion (Typ 2) und Systemaktivität (Typ 1)

**Beschreibung:**  
Wenn ein:e eingeloggte:r Nutzer:in den Lern-Timer startet, muss das System die Startzeit speichern und während der Session die Laufzeit erfassen.  
Beim Stoppen wird die Sessiondauer berechnet, persistiert und optional in XP umgewandelt.  
Der Timer darf während des Trackings pausiert oder fortgesetzt werden, darf aber nicht mehrfach parallel gestartet werden.

**Rationale:**  
Die Timer-Funktion misst tatsächliche Lernzeit und ist Grundlage für Echtzeit-Statistiken sowie faire XP-Vergabe.  
Sie fördert Fokussierung und erlaubt objektive Auswertungen des Lernverhaltens.

**Fit Criterion:**  
Nach dem Stoppen muss eine neue Session in der Datenbank existieren mit korrekter Dauer (± 1 Minute Toleranz) und optionaler XP-Vergabe gemäß Regel (1 XP pro 5 Minuten, Cap 100 XP pro Tag).  
Messbar: Abweichung Timer UI ↔ DB ≤ 1 Minute in 95 % der Fälle.

---
