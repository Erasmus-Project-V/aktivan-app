<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { App } from "@capacitor/app";
    import { SQLiteService } from "$lib/services/sqlite";
    import { Network } from "@capacitor/network";
    import { isLoadingStore, isUploadingExerciseStore, userStore } from "$lib/stores";
    import { pb } from "$lib/services/pocketbase";
    import { SplashScreen } from "@capacitor/splash-screen";

    onMount(async () => {
        const unsubscribe = isLoadingStore.subscribe(loading => {
          if (!loading) {
            SplashScreen.hide();
          }
        });

        await App.addListener("appStateChange", async ({ isActive }) => {
            if (isActive) {
                await SQLiteService.initializeDatabase();
            }
        });

        Network.addListener("networkStatusChange", async (status) => {
          if (!status.connected) {
            return;
          }

          if ($isUploadingExerciseStore) {
            return;
          }

          try {
            const activities = await SQLiteService.getAllActivities();
            if (!activities || activities.length === 0) {
              return;
            }

            for (const activity of activities) {
              try {
                const remoteActivity = await pb.collection("activities").create({
                  user: $userStore?.id,
                  start: activity.start,
                  end: activity.end,
                  distance: Math.round(activity.distance),
                  steps: Math.round(activity.steps),
                  duration: Math.round(activity.duration),
                  type: activity.type,
                  calories: Math.round(activity.calories),
                });

                if (remoteActivity) {
                  await SQLiteService.saveLocations(activity.id, remoteActivity);
                }
              } catch (error) {
                console.error("Error saving activity:", error);
              }
            }
          } catch (error) {
            console.error("Error processing activities:", error);
          }
        });

        return () => {
          unsubscribe();
        }
    });
</script>

<slot />
