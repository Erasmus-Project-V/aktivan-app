/*
export const ssr = false;
export const csr = true;

import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ( { url, cookies } ) => {
    const authToken = cookies.get("authToken");

    console.log(`From cookie: ${authToken}`);

    if (!authToken && !url.pathname.includes("/auth/")) {
        redirect(307, "/auth/stage-one/login");
    }
    if (authToken && !url.pathname.includes("/profile")) {
        redirect(307, "/profile/exercise");
    }
};*/

/*import type { LayoutServerLoad } from "./$types";
import { pb } from "$lib/services/pocketbase";
import { userStore } from "$lib/stores";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ( { url, cookies } ) => {
    const user = await pb.collection("users").getOne(userId as string);

    if (user) {
        userStore.set(user);
        pb.authStore.save(authToken, user);
        if (!url.pathname.includes("/profile")) {
            redirect(307, "/profile/exercise");
        }
    }

    return {
        user,
    };
}*/
