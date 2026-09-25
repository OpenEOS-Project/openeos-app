# Google Play — alle Angaben zum Ausfüllen

Stand: 2026-09-25. Alles hier ist aus dem Quelltext belegt, nicht geraten.
Wo eine Entscheidung offen ist, steht das ausdrücklich dabei.

---

## 1. Grunddaten

| Feld im Formular | Wert |
|---|---|
| Paketname (endgültig!) | `de.openeos.display` |
| App-Name (max. 30) | `OpenEOS Anzeige` — 15 Zeichen |
| Standardsprache | Deutsch (Deutschland) |
| App oder Spiel | App |
| Kostenlos oder kostenpflichtig | Kostenlos |
| Kategorie | Unternehmen |
| Tags | Unternehmensverwaltung, Produktivität |
| Website | `https://openeos.de` |
| E-Mail (öffentlich) | `hello@openeos.de` |
| Telefon (optional) | `+49 15678 142392` |
| Datenschutzerklärung | `https://openeos.de/privacy` |
| Version | `versionName 1.0`, `versionCode 1` |
| minSdk / targetSdk | 24 / 36 |
| Formfaktoren | Telefon, Tablet, **Android TV** |

> **Android TV mit anhaken.** Das Manifest bringt `LEANBACK_LAUNCHER` mit und
> erklärt Touchscreen als nicht erforderlich — ohne das Häkchen im Formular
> taucht die App auf Fire TV und Android TV trotzdem nicht auf.

---

## 2. Kurzbeschreibung (max. 80 Zeichen)

```
Macht Fernseher und Tablets zur Küchen- und Kundenanzeige für OpenEOS.
```
*70 Zeichen.*

---

## 3. Vollständige Beschreibung (max. 4000 Zeichen)

```
OpenEOS Anzeige verwandelt einen Fernseher, einen Fire TV Stick oder ein
Tablet in einen Bildschirm für Ihre Veranstaltung.

ZWEI ARTEN VON ANZEIGEN

• Küchen- und Stationsanzeige — zeigt die offenen Bestellungen, damit die
  Ausgabe sieht, was ansteht, statt Zettel zu sortieren.
• Kundenanzeige — spiegelt an der Kasse den laufenden Einkauf, damit Ihr
  Gast mitlesen kann, was gebucht wird.

EINRICHTEN OHNE TASTATUR

Nach dem Start zeigt die App einen sechsstelligen Code. Den geben Sie in
Ihrem OpenEOS-Konto unter „Geräte" ein und wählen aus, was der Bildschirm
anzeigen soll. Danach ist das Gerät verbunden.

Auf dem Fernseher selbst tippt niemand eine Adresse ein und gibt kein
Passwort ein — mit einer Fernbedienung wäre das ohnehin eine Zumutung.

FÜR DEN DAUERBETRIEB GEBAUT

• Der Bildschirm bleibt an und schaltet sich nicht nach ein paar Minuten ab.
• Nach einem Stromausfall startet die Anzeige von selbst wieder. Auf einem
  Festplatz ist das keine Seltenheit, und hinter der Theke kommt niemand
  mehr an das Gerät heran.
• Fällt das Netz aus, sagt die App das in klaren Worten und versucht es
  weiter, statt eine Browser-Fehlerseite zu zeigen, die wie ein Defekt
  aussieht.
• Bedienbar mit der Fernbedienung, am Touchscreen und mit der Maus.

WAS SIE BRAUCHEN

Ein OpenEOS-Konto auf openeos.de und eine Internetverbindung.

OpenEOS ist ein Kassensystem für Vereine, Veranstaltungen und
Festbewirtungen — von der Planung über Bestellung und Küche bis zur
Abrechnung. Der Quelltext ist offen.

Diese App ist die Anzeige. Kassieren, Produkte pflegen und auswerten
findet in der Weboberfläche statt.
```

---

## 4. Was ist neu (max. 500 Zeichen)

```
Erste Veröffentlichung.

• Kopplung über einen sechsstelligen Code, ohne Tastatur am Gerät
• Küchen- und Stationsanzeige sowie Kundenanzeige
• Bildschirm bleibt wach, Neustart nach Stromausfall von selbst
• Fire TV und Android TV werden unterstützt
• Eigene Hinweisseite statt Browser-Fehlerseite, wenn das Netz fehlt
```

---

## 5. Datensicherheit (Data Safety)

Diese Antworten sind aus dem Quelltext abgeleitet, nicht geschätzt.
Grundlage: `openeos-web/sentry.client.config.ts` (läuft auch auf den
`/device`-Routen) und `AndroidManifest.xml`.

### Werden Daten erhoben oder geteilt?

**Ja, erhoben. Nein, nicht geteilt.** Keine Weitergabe an Dritte zu deren
eigenen Zwecken, keine Werbung, kein Verkauf.

| Datentyp | Erhoben | Geteilt | Zweck | Pflicht? |
|---|---|---|---|---|
| App-Interaktionen | Ja | Nein | Analyse, Fehlerbehebung | erforderlich |
| Absturzprotokolle | Ja | Nein | Fehlerbehebung | erforderlich |
| Diagnosen | Ja | Nein | Fehlerbehebung, Leistung | erforderlich |

Alles andere: **nein.** Kein Standort, keine Kontakte, keine Fotos, keine
Nachrichten, keine Finanzdaten, keine Werbe-ID, keine Geräte-ID im Sinne
des Formulars (der Kopplungs-Token ist eine App-eigene Anmeldung, keine
Gerätekennung).

### Sicherheitsangaben

| Frage | Antwort |
|---|---|
| Übertragung verschlüsselt? | Ja (HTTPS/TLS) |
| Löschung der Daten anfordern? | Ja — über `hello@openeos.de` |
| Nach Families-Richtlinie geprüft? | Nein, App richtet sich nicht an Kinder |

### Warum „App-Interaktionen" mit Ja beantwortet werden muss

Die Weboberfläche bindet Sentry ein, mit Session Replay bei 10 % der
Sitzungen und bei 100 % nach einem Fehler. Texte sind maskiert
(`maskAllText: true`) und Medien blockiert, aber es ist eine Aufzeichnung
des Ablaufs und damit erhebungspflichtig.

> **Zwei Dinge dazu, bevor du absendest — siehe Abschnitt 9.**

---

## 6. Inhaltseinstufung (IARC-Fragebogen)

| Frage | Antwort |
|---|---|
| Kategorie | Dienstprogramm / Produktivität / Kommunikation |
| Gewalt | Nein |
| Sexualität, Nacktheit | Nein |
| Schimpfwörter | Nein |
| Kontrollierte Substanzen | **siehe Hinweis** |
| Glücksspiel | Nein |
| Nutzer können interagieren | Nein |
| Standort wird geteilt | Nein |
| Käufe in der App | Nein |

**Hinweis zu „kontrollierte Substanzen":** Die App zeigt Produktnamen an,
die der Veranstalter selbst anlegt — auf einem Vereinsfest steht da auch
„Pils 0,5". Die App bewirbt keinen Alkohol, sie stellt eine Bestellliste
dar. Übliche Praxis ist hier **Nein**; die Einstufung landet dann bei
USK 0 / PEGI 3. Wenn du sichergehen willst, beantworte die Frage mit Ja —
das hebt die Einstufung, kostet aber sonst nichts.

Erwartetes Ergebnis: **USK 0, PEGI 3, Everyone.**

---

## 7. Zielgruppe und Inhalte

| Feld | Wert |
|---|---|
| Altersgruppen | 18 und älter |
| Richtet sich an Kinder | Nein |
| Werbung enthalten | Nein |
| Nutzergenerierte Inhalte | Nein |
| Regierungs-App | Nein |
| Finanz-App | Nein |
| Gesundheits-App | Nein |

---

## 8. App-Zugriff für die Prüfung — **das wird gebraucht**

Play lehnt Apps ab, deren Funktion sich ohne Anmeldung nicht beurteilen
lässt. Ohne OpenEOS-Konto sieht die prüfende Person nur den Kopplungscode
und kommt nicht weiter.

Im Formular „Alle Funktionen sind eingeschränkt" wählen und eintragen:

```
Die App zeigt nach dem Start einen sechsstelligen Kopplungscode. Um den
Bildschirm zu sehen, muss das Gerät einmalig einer Organisation zugeordnet
werden.

So geht es:
1. App starten. Es erscheint ein sechsstelliger Code.
2. Im Browser https://app.openeos.de öffnen und anmelden:
   Benutzer:  <DEMO-KONTO EINTRAGEN>
   Passwort:  <DEMO-PASSWORT EINTRAGEN>
3. Links auf „Geräte", dann „Gerät hinzufügen".
4. Den sechsstelligen Code aus der App eingeben.
5. Als Gerätetyp „Anzeige" wählen und speichern.
6. Die App wechselt innerhalb weniger Sekunden selbsttätig auf die Anzeige.

Das Demo-Konto enthält eine Beispielveranstaltung mit offenen
Bestellungen, damit die Anzeige nicht leer bleibt.
```

> **Offen:** Das Demo-Konto gibt es noch nicht. Es braucht einen Login und
> eine Veranstaltung mit ein paar offenen Bestellungen — sonst bleibt der
> Bildschirm nach dem Koppeln leer, und genau das wird als „Funktion nicht
> nachvollziehbar" abgelehnt.

---

## 9. Zwei Punkte, die vor dem Absenden zu klären sind

### a) Sentry in der Datenschutzerklärung — erledigt, aber noch nicht live

`https://openeos.de/privacy` nannte IONOS, Hetzner und Cloudflare, **Sentry
nicht** — obwohl die Weboberfläche Fehlerdaten und Sitzungsaufzeichnungen an
Functional Software, Inc. in den USA schickt. Das ist eine
Drittlandsübermittlung und gehört in die Erklärung.

Für Play zählt das doppelt: Die Datensicherheitsangaben müssen sich mit der
verlinkten Erklärung decken. Ein Widerspruch dort ist ein üblicher
Ablehnungsgrund.

Abschnitt 7 „Fehlerdiagnose mit Sentry" ist geschrieben und liegt auf
`dev`. **Vor der Einreichung muss er auf openeos.de stehen.**

### b) Session Replay läuft auch auf den Anzeige-Routen

`replaysSessionSampleRate: 0.1` gilt für die gesamte Weboberfläche, also
auch für einen Fernseher, der zwölf Stunden in einer Küche hängt. Das
bringt keine Erkenntnis, verbraucht Kontingent und ist genau der Punkt, der
die Antwort „App-Interaktionen: ja" erzwingt.

Schaltet man Replay auf den `/device`-Routen ab, wird die Antwort zu einem
schlichten „nur Absturzprotokolle und Diagnosen".

---

## 10. Grafiken — was Play verlangt

| Asset | Format | Zustand |
|---|---|---|
| App-Symbol | 512×512 PNG | ✅ `play-icon-512.png` |
| Feature-Grafik | 1024×500 PNG | ✅ `play-feature-1024x500.png` |
| TV-Banner | 1280×720 PNG | ✅ `play-tv-banner-1280x720.png` |
| TV-Screenshot: Anzeige im Betrieb | 1920×1080 | ✅ `screenshot-tv-1920x1080.png` |
| TV-Screenshot: Kopplung | 1920×1080 | ✅ `screenshot-tv-kopplung-1920x1080.png` |
| TV-Screenshot: leerer Zustand | 1920×1080 | ✅ `screenshot-tv-leer-1920x1080.png` |
| Telefon-Screenshots | mind. 2, 16:9 oder 9:16 | ⬜ **fehlt** |
| Tablet-Screenshots (7"/10") | je mind. 1 | ⬜ **fehlt** |

Zusätzlich, nicht von Play verlangt, aber für Website und Presse brauchbar:
`marketing-kueche-1920x1080.jpg`.

### Wie die Grafiken entstanden sind

Die Szenen (Festzelt, Küche, Nachtaufnahme) sind mit Higgsfield erzeugt und
liegen als Quellen unter `store/roh/`. Logo und Schrift sind **nicht**
erzeugt, sondern aus den echten Markenassets gesetzt — erzeugte Schrift und
erzeugte Logos werden unweigerlich falsch.

Auf der Feature-Grafik und auf `marketing-kueche-1920x1080.jpg` ist in den
Bildschirm jeweils der echte Screenshot perspektivisch eingerechnet. Damit
zeigt **kein** Store-Asset eine erfundene Oberfläche — auch dort nicht, wo
Play es erlauben würde.

> **Screenshots müssen die echte App zeigen.** Erzeugte oder nachgebaute
> Oberflächen fallen unter „irreführende Darstellung" und sind ein
> verbreiteter Ablehnungsgrund. Die Marketing-Grafiken (Feature-Grafik,
> TV-Banner) dürfen gestaltet sein — die Screenshots nicht.
