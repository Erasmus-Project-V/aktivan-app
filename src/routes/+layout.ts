import { pb } from "$lib/services/pocketbase";

export const ssr = false;
export const csr = true;

import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { Preferences } from "@capacitor/preferences";
import { userStore } from "$lib/stores";
import { removePreferences, signOut } from "$lib/services/auth";
import { SplashScreen } from "@capacitor/splash-screen";

export const load: LayoutLoad = async ({ url }) => {
  // await SplashScreen.show();

  const authToken = (await Preferences.get({ key: "authToken" })).value;
  const userId = (await Preferences.get({ key: "userId" })).value;

  /*    console.log(`Auth token: ${authToken}`);
    console.log(`User id: ${userId}`);*/

  if (!authToken && !url.pathname.includes("/auth/")) {
    // SplashScreen.hide();
    redirect(307, "/auth/stage-one/login");
  }
  if (authToken) {
    const user = await pb
      .collection("users")
      .getOne(userId as string)
      .catch(async (err) => {
        if (err) {
          await removePreferences();
          redirect(307, "/auth/stage-one/login");
        }
      });

    if (user) {
      userStore.set(user);
      pb.authStore.save(authToken, user);
      if (!pb.authStore.model?.verified) {
        // SplashScreen.hide();
        redirect(307, "/auth/stage-two/email-verification");
      }
      if (!url.pathname.includes("/profile")) {
        // SplashScreen.hide();
        redirect(307, "/profile/exercise");
      }
    }
  }

  // SplashScreen.hide();
};
