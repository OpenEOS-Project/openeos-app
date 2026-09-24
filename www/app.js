/**
 * Der Startbildschirm der Anzeige-App.
 *
 * Aufgabe: das Display wachhalten, prüfen ob OpenEOS erreichbar ist, und
 * dann in die Kopplung wechseln. Alles Weitere passiert in der
 * Weboberfläche.
 *
 * Warum die Prüfung vorweg: Ein Fernseher hängt oft am Rand des WLANs.
 * Ohne sie zeigte die App die Fehlerseite des Systems — auf einem Gerät
 * ohne Tastatur und Maus sieht das aus wie ein Defekt, und niemand kommt
 * auf die Idee, das WLAN zu prüfen.
 */

const SPEICHER_HOST = 'openeos.host';
/* Debug-Builds zeigen auf Staging: Wer die App zum Pruefen installiert,
   soll keine echten Geraete in der Produktion anlegen. Der Store-Build
   (release) nimmt weiterhin die Produktion. */
const STANDARD_HOST = window.OPENEOS_DEFAULT_HOST || 'app.openeos.de';
const ZIEL_PFAD = '/de/device/pair?type=display';

/** Wie lange bis zum nächsten Versuch, wenn kein Netz da ist. */
const ERNEUT_NACH_SEKUNDEN = 15;

/** Nach dieser Zeit gilt der Server als nicht erreichbar. */
const ZEITGRENZE_MS = 8000;

const $ = (id) => document.getElementById(id);

function host() {
  try {
    return localStorage.getItem(SPEICHER_HOST) || STANDARD_HOST;
  } catch {
    return STANDARD_HOST;
  }
}

function zeige(welcher) {
  for (const block of ['start', 'offline', 'server']) {
    $(`block-${block}`).hidden = block !== welcher;
  }
}

/**
 * Bildschirm wachhalten.
 *
 * Ohne das schaltet ein Tablet nach wenigen Minuten ab, und die Küche
 * steht vor einem schwarzen Schirm. Auf dem Fire TV greift zusätzlich
 * das Flag in der Activity — die Sperre hier deckt Tablets ab.
 */
async function wachHalten() {
  const plugin = window.Capacitor?.Plugins?.KeepAwake;
  if (plugin) {
    try {
      await plugin.keepAwake();
      return;
    } catch {
      /* Fällt auf den Weg über den Browser zurück. */
    }
  }

  try {
    if ('wakeLock' in navigator) {
      let sperre = await navigator.wakeLock.request('screen');
      /* Die Sperre fällt weg, sobald die App in den Hintergrund geht —
         etwa wenn jemand am Fernseher die Quelle wechselt. */
      document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
          try {
            sperre = await navigator.wakeLock.request('screen');
          } catch {
            /* Kein Wachhalten möglich; die Anzeige läuft trotzdem. */
          }
        }
      });
    }
  } catch {
    /* Nicht jede Plattform kann das. Kein Grund, hier abzubrechen. */
  }
}

/** Ist OpenEOS erreichbar? */
async function erreichbar() {
  const abbruch = new AbortController();
  const wecker = setTimeout(() => abbruch.abort(), ZEITGRENZE_MS);

  try {
    /* Gegen die Startseite der Anzeige, nicht gegen die API: Genau diese
       Seite muss laden, und nur ihre Erreichbarkeit sagt etwas aus. */
    await fetch(`https://${host()}${ZIEL_PFAD}`, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: abbruch.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(wecker);
  }
}

let countdownTimer = null;

function starteCountdown() {
  let rest = ERNEUT_NACH_SEKUNDEN;
  $('countdown').textContent = String(rest);

  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    rest -= 1;
    $('countdown').textContent = String(Math.max(0, rest));
    if (rest <= 0) {
      clearInterval(countdownTimer);
      versuchen();
    }
  }, 1000);
}

async function versuchen() {
  clearInterval(countdownTimer);
  zeige('start');

  if (await erreichbar()) {
    window.location.replace(`https://${host()}${ZIEL_PFAD}`);
    return;
  }

  $('offline-ziel').textContent = host();
  zeige('offline');
  $('erneut').focus();
  starteCountdown();
}

// --- Serverwahl, über einen langen Druck oben links ---

let druckTimer = null;

function haltenStart() {
  druckTimer = setTimeout(() => {
    clearInterval(countdownTimer);
    zeige('server');
    document.querySelector('#block-server .knopf')?.focus();
  }, 3000);
}

function haltenEnde() {
  clearTimeout(druckTimer);
}

$('geheim').addEventListener('pointerdown', haltenStart);
$('geheim').addEventListener('pointerup', haltenEnde);
$('geheim').addEventListener('pointerleave', haltenEnde);

for (const knopf of document.querySelectorAll('#block-server [data-host]')) {
  knopf.addEventListener('click', () => {
    try {
      localStorage.setItem(SPEICHER_HOST, knopf.dataset.host);
    } catch {
      /* Ohne Speicher bleibt es bei der Vorgabe. */
    }
    versuchen();
  });
}

$('server-zurueck').addEventListener('click', versuchen);
$('erneut').addEventListener('click', versuchen);

/* Kommt das Netz von selbst zurück, soll niemand hinlaufen müssen. */
window.addEventListener('online', versuchen);

wachHalten();
versuchen();
