<script lang="ts">
    import "../app.css";
    import { onDestroy, onMount } from "svelte";
    import { App } from "@capacitor/app";
    import { SQLiteService } from "$lib/services/sqlite";

    onMount(async () => {
        App.addListener("appStateChange", ({ isActive }) => {
            if (isActive) {
                SQLiteService.initializeDatabase();
            }
        });
    });

    onDestroy(() => {
        App.removeAllListeners();
    });
</script>

<slot/>