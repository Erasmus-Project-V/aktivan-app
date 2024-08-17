<script lang="ts">
    import ExerciseSelectionCard from "$lib/components/ExerciseSelectionCard.svelte";
    import { goto } from "$app/navigation";

    import runningBg from "$lib/assets/backgrounds/running-square.png";
    import cyclingBg from "$lib/assets/backgrounds/cycling-square.png";
    import hikingBg from "$lib/assets/backgrounds/hiking-square.png";
    import walkingBg from "$lib/assets/backgrounds/walking-square.png";
    import skatingBg from "$lib/assets/backgrounds/skating-square.png";
</script>

<main class="grid grid-cols-2 gap-2 p-2 w-screen">
    <ExerciseSelectionCard on:click={async () => await goto(`/profile/exercise/stats/this-week/activity/running`)} exercise="Running" backgroundUrl={runningBg}/>
    <ExerciseSelectionCard on:click={async () => await goto(`/profile/exercise/stats/this-week/activity/cycling`)} exercise="Cycling" backgroundUrl={cyclingBg} />
    <ExerciseSelectionCard on:click={async () => await goto(`/profile/exercise/stats/this-week/activity/hiking`)} exercise="Hiking" backgroundUrl={hikingBg} />
    <ExerciseSelectionCard on:click={async () => await goto(`/profile/exercise/stats/this-week/activity/walking`)} exercise="Walking" backgroundUrl={walkingBg} />
    <ExerciseSelectionCard on:click={async () => await goto(`/profile/exercise/stats/this-week/activity/skating`)} exercise="Skating" backgroundUrl={skatingBg} class="justify-self-center col-span-2" />
</main>