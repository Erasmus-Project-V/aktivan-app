<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { App } from "@capacitor/app";
    import { SQLiteService } from "$lib/services/sqlite";
    import { Network } from "@capacitor/network";
    import { userStore } from "$lib/stores";
    import { pb } from "$lib/services/pocketbase";

    onMount(async () => {
        await App.addListener("appStateChange", async ({ isActive }) => {
            if (isActive) {
                await SQLiteService.initializeDatabase();
            }
        });

        Network.addListener("networkStatusChange", async (status) => {
            if (!status.connected) {
                return;
            }

            const activites = await SQLiteService.getAllActivities();
            if (!activites || (activites as [])?.length === 0) {
                return;
            }

            for (const activity of activites) {
                const remoteActivity = await pb.collection("activities").create({
                    user: $userStore?.id,
                    start: activity.start,
                    end: activity.end,
                    distance: activity.end,
                    steps: activity.steps,
                    duration: activity.duration,
                    type: activity.type,
                    calories: activity.calories,
                });

                await SQLiteService.saveLocations(activity.id, remoteActivity);
            }
        });
    });
</script>

<slot />
