<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { Preferences } from "@capacitor/preferences";

    onMount(async () => {
        const authToken = (await Preferences.get({key: "authToken"})).value;

        document.cookie = `authToken=${authToken}`;
    });
</script>

<slot/>