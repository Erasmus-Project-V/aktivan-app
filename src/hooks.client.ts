/*
import { onRequest } from '@sveltejs/kit';
import { Preferences } from "@capacitor/preferences";

onRequest(async ({ request }) => {
    const authToken = (await Preferences.get({ key: "authToken" })).value;
    if (authToken) {
        request.headers.set('cookie', `authToken=${authToken}`);
    }
});*/

import { Preferences } from "@capacitor/preferences";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = (await Preferences.get({ key: "authToken" })).value;

    // Prosljeđivanje zahtjeva dalje
    const response = await resolve(event);
    response.headers.set("Cookie", `authToken=${authToken}`);

    return response;
}

