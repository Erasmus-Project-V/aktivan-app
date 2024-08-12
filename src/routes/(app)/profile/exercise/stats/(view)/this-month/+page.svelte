<script lang="ts">
    import ExerciseSelectionCard from "$lib/components/ExerciseSelectionCard.svelte";

    import runningBg from "$lib/assets/backgrounds/running-square.png";
    import cyclingBg from "$lib/assets/backgrounds/cycling-square.png";
    import hikingBg from "$lib/assets/backgrounds/hiking-square.png";
    import walkingBg from "$lib/assets/backgrounds/walking-square.png";
    import skatingBg from "$lib/assets/backgrounds/skating-square.png";
</script>

<main class="grid grid-cols-2 gap-2 p-2 w-screen">
    <ExerciseSelectionCard exercise="Running" backgroundUrl={runningBg}/>
    <ExerciseSelectionCard exercise="Cycling" backgroundUrl={cyclingBg} />
    <ExerciseSelectionCard exercise="Hiking" backgroundUrl={hikingBg} />
    <ExerciseSelectionCard exercise="Walking" backgroundUrl={walkingBg} />
    <ExerciseSelectionCard exercise="Skating" backgroundUrl={skatingBg} class="justify-self-center col-span-2" />
</main>