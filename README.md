# OpenEOS Anzeige

Die App für Bildschirme: Fire TV, alte Tablets, jeder Monitor mit einem
Android- oder iOS-Gerät daran. Sie zeigt die Kopplung mit Code und
QR-Code und danach die Küchen-, Theken- oder Kundenanzeige.

Kassen laufen weiterhin im Browser — dafür braucht es keine App.

## Eine App für Anzeigen, später eine zweite für Kassen

Entschieden am 2026-09-25: Diese App bleibt `de.openeos.display` und
bedient nur Bildschirme. Die Kasse bekommt später ein eigenes Paket
(`de.openeos.pos`).

Der Grund liegt nicht in der Hülle — die wäre identisch, nur der
Parameter `?type=` unterscheidet sich. Er liegt in dem, was eine Kasse
zusätzlich braucht und ein Fernseher nie: den SumUp-Kartenleser über
App-zu-App-Aufrufe, Bondrucker über Bluetooth, und Offline-Betrieb.
Diese Teile in der Anzeigen-App mitzuführen hieße, einem Fernseher
Zahlungsberechtigungen mitzugeben.

Der Preis der Entscheidung: zwei Store-Einträge, zwei Prüfungen, zwei
Signierschlüssel. Und der Paketname hier ist damit endgültig — er lässt
sich nach der ersten Veröffentlichung nicht mehr ändern.

## Warum eine Hülle und keine eigene Oberfläche

Die App startet mit einem eigenen Bildschirm, hält das Display wach und
wechselt dann in `app.openeos.de/de/device/pair?type=display`. Der
Inhalt bleibt also die Weboberfläche.

Das ist Absicht: An einen Fernseher hinter der Theke geht nach dem
Aufhängen niemand mehr heran. Jede Änderung an der Anzeige wirkt so
sofort, ohne ein neues Release im Store und ohne dass jemand auf jedem
Gerät eine Aktualisierung anstößt.

Was die App **selbst** mitbringt und ein Browser nicht kann:

- **Bildschirm wachhalten** — sonst schaltet ein Tablet nach Minuten ab
  und die Küche steht vor einem schwarzen Schirm
- **Vollbild ohne Systemleisten** — kein versehentliches Verlassen
- **Start nach Stromausfall** — die Anzeige kommt von selbst zurück
- **Eigene Fehlerseite** — „Keine Verbindung, prüfen Sie das WLAN"
  statt der Fehlerseite des Systems, die auf einem Fernseher aussieht
  wie ein Defekt
- **Serverwahl** für unsere eigenen Tests, hinter einem langen Druck
  oben links versteckt

## Bauen

### Android und Fire TV

```bash
pnpm install
npx cap sync android
cd android && ./gradlew assembleDebug     # zum Ausprobieren
cd android && ./gradlew assembleRelease   # signiert, für den Store
```

Vorher `android/local.properties` mit `sdk.dir=<Pfad zum Android-SDK>`
anlegen.

Fire TV nimmt dieselbe APK. Entscheidend sind zwei Dinge im Manifest,
ohne die das Gerät die App gar nicht erst anzeigt:

- `LEANBACK_LAUNCHER` in den Intent-Filtern — der Fernseher zeigt nur,
  was sich ausdrücklich als TV-App ausweist
- `android.hardware.touchscreen` als **nicht erforderlich** — sonst
  blendet der Amazon Appstore die App auf Fire-TV-Geräten aus

Zum Ausprobieren ohne Store: `adb connect <IP des Fire TV>:5555` und
`adb install app-debug.apk`.

### iOS

**Geht nur auf einem Mac.** Das Projekt liegt unter `ios/`, bauen und
signieren verlangen Xcode:

```bash
npx cap sync ios
npx cap open ios
```

Auf einem Linux-Rechner lässt sich das Projekt pflegen, aber nicht
übersetzen. Für einen Build ohne Mac käme ein CI-Dienst mit
macOS-Läufern infrage (GitHub Actions, Codemagic).

## Was vor dem Store noch fehlt

- **App-Symbole und Startbild** in den Größen beider Plattformen. Es
  stecken bisher die Vorgaben von Capacitor darin.
- **Signierschlüssel** für Android (`keystore`), sicher abgelegt und
  gesichert — geht er verloren, lässt sich die App im Play Store nie
  wieder aktualisieren.
- **Entwicklerkonten**: Apple 99 $/Jahr, Google 25 $ einmalig, Amazon
  kostenlos.
- **Datenschutzangaben** in beiden Stores.

Ein Punkt, der bei der Einreichung Ärger machen kann: Apple weist Apps
zurück, die im Wesentlichen nur eine Website anzeigen (Richtlinie 4.2).
Die eigenen Funktionen oben sind das Gegenargument — Wachhalten,
Vollbild, Neustart, Offline-Bildschirm. Sicher ist es trotzdem nicht;
im Zweifel hilft es, in der Einreichung zu erklären, dass die App für
fest montierte Bildschirme im Gastronomiebetrieb gedacht ist.
