# Veröffentlichen im Google Play Store

Stand dieser Anleitung: die App ist so weit, dass ein signiertes Paket
gebaut und hochgeladen werden kann. Was hier steht, ist der Rest.

## 1. Was nur du tun kannst

### Entwicklerkonto
Ein Google-Play-Entwicklerkonto, **25 $ einmalig**, unter
[play.google.com/console](https://play.google.com/console). Die
Verifizierung der Identität dauert nach unserer Erfahrung ein bis
mehrere Tage — das ist der längste Posten, also am besten zuerst.

Für ein Firmenkonto (statt Privatperson) verlangt Google zusätzlich
einen Nachweis über die D-U-N-S-Nummer. Als Einzelperson entfällt das.

### Signierschlüssel — **ist bereits erzeugt**

| | |
|---|---|
| Datei | `~/.openeos-keys/openeos-release.p12` (nicht im Repo, `600`) |
| Format | PKCS12, RSA 4096, SHA384withRSA |
| Alias | `openeos` |
| Inhaber | `CN=Lukas Lukic-Spitznagel, OU=OpenEOS, O=OpenEOS, L=St. Georgen im Schwarzwald, ST=Baden-Wuerttemberg, C=DE` |
| Gültig bis | 10. Februar 2054 |
| SHA-256 | `16:28:9E:56:43:C1:EA:9C:BA:69:99:97:ED:A1:0F:AB:99:A0:81:B7:23:CF:51:8C:4E:95:F2:FF:3A:F3:50:B8` |
| SHA-1 | `56:B0:BC:88:30:F6:65:A9:BA:16:9D:8B:DE:C5:85:41:42:F7:A3:19` |

Das Passwort steht in `android/keystore.properties` (ebenfalls nicht im
Repo). Auslesen mit:

```bash
grep storePassword android/keystore.properties
```

Der Schlüssel liegt bewusst **außerhalb** des Projektordners: so nimmt ihn
weder ein ZIP des Repos noch ein versehentliches `git add -f` mit.

Neu erzeugen müsste man ihn so — nur nötig, wenn er verloren geht, und dann
ist es für eine bereits veröffentlichte App zu spät:

```bash
keytool -genkeypair -v \
  -keystore openeos-release.p12 -storetype PKCS12 \
  -keyalg RSA -keysize 4096 -validity 10000 \
  -alias openeos
```

:::danger
**Den Schlüssel sichern, an zwei getrennten Orten.** Geht er verloren,
lässt sich die App im Play Store **nie wieder aktualisieren** — es bleibt
nur, sie unter neuem Namen neu zu veröffentlichen und alle Installationen
aufzugeben. Das Passwort gehört in einen Passwortspeicher, nicht in eine
Textdatei neben dem Schlüssel.
:::

## 2. Paket bauen

```bash
pnpm install
npx cap sync android
cd android && ./gradlew bundleRelease
```

Ergebnis: `android/app/build/outputs/bundle/release/app-release.aab`.
Play will das **AAB**, nicht die APK.

## 3. Angaben im Play-Formular

### Grunddaten

| Feld | Wert |
|---|---|
| Paketname | `de.openeos.display` |
| App-Name | OpenEOS Anzeige |
| Kategorie | Unternehmen (Business) |
| Datenschutzerklärung | `https://openeos.de/privacy` |
| Zielgruppe | Keine Kinder — „Nicht für Kinder konzipiert" |
| Anzeigen | Nein |
| Zugriff auf Inhalte | Eingeschränkt: Anmeldedaten nötig, siehe unten |

### Kurzbeschreibung (max. 80 Zeichen)

> Verwandelt Fernseher und Tablets in Küchen- und Kundenanzeigen für OpenEOS.

### Vollständige Beschreibung

> OpenEOS Anzeige macht aus einem Fernseher, Fire TV oder Tablet einen
> Bildschirm für Ihre Veranstaltung: Die Küche sieht offene Bestellungen,
> Ihre Gäste sehen an der Kasse ihren Einkauf.
>
> **So einfach ist die Einrichtung:** Die App zeigt beim Start eine
> sechsstellige Zahl. Diese Zahl geben Sie in OpenEOS ein — fertig. Kein
> Passwort, keine Tastatur, keine Einrichtung am Gerät selbst.
>
> **Gemacht für Bildschirme, an die niemand mehr herangeht:**
> • Der Bildschirm bleibt an, solange die Anzeige läuft
> • Vollbild ohne Systemleisten
> • Nach einem Stromausfall startet die Anzeige von selbst
> • Bei Verbindungsverlust ein verständlicher Hinweis statt einer
>   Fehlermeldung
>
> **Aussehen und Inhalt steuern Sie aus der Verwaltung:** hell oder
> dunkel, normale oder große Schrift für weit entfernte Monitore, eigene
> Überschrift und Begrüßungstext. Änderungen erscheinen sofort.
>
> Für die Nutzung brauchen Sie ein OpenEOS-Konto. OpenEOS ist ein
> Kassensystem für Vereine, Veranstaltungen und Festbewirtungen.

### Zugang für die Prüfung

Google prüft jede App manuell und braucht einen Weg hinein. Ohne diese
Angabe wird abgelehnt, weil die Prüfer nur eine Zahl sehen und nicht
weiterkommen. Ins Feld „Anweisungen für die Überprüfung":

> Die App zeigt beim Start einen sechsstelligen Code. Zum Prüfen:
> 1. Auf app.openeos.de mit dem bereitgestellten Testkonto anmelden
> 2. Geräte → Gerät verbinden → den Code vom Bildschirm eingeben
> 3. Die App wechselt dann von selbst in die Anzeige
>
> Testzugang: <E-Mail> / <Passwort>

**Lege dafür ein eigenes Testkonto an**, nicht deinen echten Zugang.

### Datensicherheit (Data Safety)

Das Formular ist Pflicht und muss stimmen. Für diese App:

| Frage | Antwort |
|---|---|
| Werden Daten erhoben? | Ja |
| Werden Daten geteilt? | Nein |
| Übertragung verschlüsselt? | Ja (HTTPS) |
| Löschung anfragbar? | Ja, über den Support |

Erhoben werden: **App-Aktivität** (welche Bestellungen angezeigt werden)
und **Geräte-IDs** (der Kopplungs-Token). Beides ist für den Betrieb
nötig, nicht optional, und dient nicht der Werbung.

## 4. Grafiken, die Play verlangt

Alles Folgende liegt fertig unter `store/`:

| Was | Größe | Datei |
|---|---|---|
| App-Symbol | 512×512 | `play-icon-512.png` |
| Grafik für die Vorschau | 1024×500 | `play-feature-1024x500.png` |
| Screenshots Fernseher | 1920×1080 | `screenshot-tv-*.png` |

**Screenshots vom Telefon fehlen noch.** Play verlangt mindestens zwei,
sobald die App auch für Telefone angeboten wird. Sie entstehen am
einfachsten auf einem echten Gerät: App öffnen, Kopplungsbildschirm und
laufende Anzeige aufnehmen.

Für die TV-Version zusätzlich ein **Banner 320×180** — das liegt bereits
im Projekt (`res/drawable-xhdpi/tv_banner.png`).

## 5. Was erfahrungsgemäß hakt

**Fire TV ist nicht Google Play.** Amazon hat einen eigenen Store mit
eigenem Konto (kostenlos) und eigener Prüfung. Dieselbe AAB/APK, zwei
Einreichungen. Wer die App im Play Store veröffentlicht, findet sie auf
einem Fire TV **nicht**.

**Die Prüfung dauert.** Für die erste Einreichung rechne mit mehreren
Tagen, gelegentlich länger. Aktualisierungen gehen schneller.

**Geschlossener Test zuerst.** Google verlangt für neue Entwicklerkonten
inzwischen häufig einen geschlossenen Test mit einer Mindestzahl an
Testern über einen Zeitraum, bevor eine öffentliche Veröffentlichung
möglich ist. Prüfe das früh im Formular — es verschiebt den Termin
deutlich.
