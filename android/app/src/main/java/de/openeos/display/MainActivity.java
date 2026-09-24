package de.openeos.display;

import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.getcapacitor.BridgeActivity;

/**
 * Die Anzeige läuft als Vollbild und hält den Bildschirm an.
 *
 * Beides ist für ein Gerät gedacht, an das nach dem Aufhängen niemand
 * mehr herangeht: Ohne das Wachhalten schaltet ein Tablet nach Minuten
 * ab, und die Küche steht vor einem schwarzen Schirm. Die Systemleisten
 * wiederum haben auf einer Anzeige nichts zu suchen — sie laden nur dazu
 * ein, versehentlich die App zu verlassen.
 */
public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);

        /* Erst wenn das Fenster den Fokus hat, greift das Verstecken —
           vorher setzt das System die Leisten gleich wieder ein. */
        if (hasFocus) {
            versteckeSystemleisten();
        }
    }

    private void versteckeSystemleisten() {
        View wurzel = getWindow().getDecorView();

        wurzel.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                /* Wischt jemand die Leisten hervor, verschwinden sie von
                   selbst wieder, statt dauerhaft über der Anzeige zu
                   liegen. */
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );
    }
}
