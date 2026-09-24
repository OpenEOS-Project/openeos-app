import type { CapacitorConfig } from '@capacitor/cli';

/**
 * OpenEOS Anzeige.
 *
 * Die App ist der Rahmen, nicht der Inhalt: Sie startet mit einem
 * eigenen Bildschirm, hält das Display wach und wechselt dann in die
 * Kopplung unter app.openeos.de. Dadurch wirkt jede Änderung an der
 * Anzeige sofort, ohne dass jemand ein neues Release in den Store
 * bringen und auf jedem Fernseher installieren muss.
 *
 * Genau das ist bei einem Fernseher hinter der Theke der Punkt: An das
 * Gerät geht nach dem Aufhängen niemand mehr heran.
 */
const config: CapacitorConfig = {
  appId: 'de.openeos.display',
  appName: 'OpenEOS Anzeige',
  webDir: 'www',

  server: {
    /* Die Oberfläche liegt im Netz; der lokale Startbildschirm schickt
       den Browser dorthin. Beide Hosts stehen hier, damit sich mit
       derselben App auch gegen Staging prüfen lässt. */
    allowNavigation: ['app.openeos.de', 'app.staging.openeos.de'],
    androidScheme: 'https',
  },

  android: {
    /* Fehlerseiten des Systems sehen auf einem Fernseher aus wie ein
       Defekt. Unsere eigene Seite erklärt stattdessen, was zu tun ist. */
    webContentsDebuggingEnabled: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#14180f',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
};

export default config;
