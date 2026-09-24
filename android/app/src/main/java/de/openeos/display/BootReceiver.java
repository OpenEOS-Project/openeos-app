package de.openeos.display;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Startet die Anzeige nach einem Neustart des Geräts wieder.
 *
 * Ein Fernseher hinter der Theke hängt oft an derselben Steckdosenleiste
 * wie alles andere. Nach einem Stromausfall im Zelt soll die Anzeige von
 * selbst zurückkommen — sonst sucht mitten im Betrieb jemand die
 * Fernbedienung und weiß nicht, welche App er öffnen muss.
 */
public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null || !Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            return;
        }

        Intent start = new Intent(context, MainActivity.class);
        start.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(start);
    }
}
