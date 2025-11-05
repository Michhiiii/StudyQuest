## UC01 – Registrieren & Einloggen
### Funktionale Anforderungen
UC01-F1: System muss die Registrierung mit E-Mail und Passwort erlauben.  
UC01-F2: System muss prüfen, ob die E-Mail schon existiert; bei vorhandener E-Mail kein neues Konto anlegen.  
UC01-F3: System muss den Login mit E-Mail und Passwort erlauben.  
UC01-F4: Bei erfolgreichem Login muss das System das Dashboard anzeigen.  
### Nicht-funktionale Anforderungen  
UC01-NF1: Passwort darf nicht im Klartext gespeichert werden (gehashter Speicher).  
UC01-NF2: Fehlermeldungen dürfen nicht verraten, ob ein Account existiert („E-Mail oder Passwort falsch“).  
## UC02 – Passwort zurücksetzen
### Funktionale Anforderungen
UC02-F1: System muss über „Passwort vergessen“ eine E-Mail zum Zurücksetzen anfordern lassen.  
UC02-F2: System muss einen zeitlich begrenzten Link/Token generieren und an die angegebene E-Mail senden.  
UC02-F3: Über den Link muss der/die Nutzer:in ein neues Passwort setzen können.  
UC02-F4: Nach Setzen des neuen Passworts muss das alte Passwort ungültig sein.  
### Nicht-funktionale Anforderungen  
UC02-NF1: Antwort bei „Passwort vergessen“ ist immer neutral (kein Account-Leak).  
UC02-NF2: Reset-Link hat eine Ablaufzeit (z. B. 30 min).  
## UC03 – Profil & Einstellungen verwalten
### Funktionale Anforderungen
UC03-F1: System muss die aktuellen Profildaten des eingeloggten Nutzers anzeigen.  
UC03-F2: System muss das Ändern grundlegender Profildaten (Name, Studiengang, Avatar/Profilbild) erlauben.  
UC03-F3: System muss die Änderungen speichern und erneut anzeigen.  
### Nicht-funktionale Anforderungen    
UC03-NF1: Nur der/die eingeloggte Nutzer:in darf sein/ihr eigenes Profil ändern.  
UC03-NF2: Bei Fehlern (Pflichtfeld leer, zu lang) zeigt das System eine verständliche Fehlermeldung.  

## A4 – Lernquest starten

**ID:** A4.1  
**Typ:** 2 (Benutzerinteraktion)  
**Beschreibung:**  
Wenn ein:e eingeloggte:r Nutzer:in eine verfügbare Lernquest auswählt, dann muss das System die Möglichkeit bieten, diese Quest zu starten.  
Nach der Bestätigung wird der Queststatus auf **„aktiv“** gesetzt und der Startzeitpunkt gespeichert.

---

## A5 – Lernquest abschließen (XP & Level-Up)

**ID:** A5.1  
**Typ:** 1 (Selbstständige Systemaktivität)  
**Beschreibung:**  
Wenn eine aktive Lernquest vom Nutzer abgeschlossen wird, dann muss das System automatisch die zugehörigen XP gutschreiben und den Gesamt-XP-Stand aktualisieren.  
Wird eine Level-Schwelle überschritten, dann muss das System das neue Level freischalten und visuell bestätigen.

---

## A6 – Lern-Session per Timer tracken

**ID:** A6.1  
**Typ:** Kombination 1 + 2 (Systemaktivität + Benutzerinteraktion)  
**Beschreibung:**  
Wenn ein:e eingeloggte:r Nutzer:in den Lern-Timer startet, dann muss das System den Startzeitpunkt speichern und die Laufzeit erfassen.  
Beim Stoppen wird die Gesamtdauer berechnet, gespeichert und optional in XP umgewandelt.  
Der Timer darf während des Trackings pausiert oder fortgesetzt werden, aber es darf nur ein Timer gleichzeitig laufen.

---
