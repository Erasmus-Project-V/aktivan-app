<script lang="ts">
    import BackArrowIcon from "$lib/components/icons/BackArrowIcon.svelte";
    import ArrowButton from "$lib/components/ArrowButton.svelte";
    import ShareIcon from "$lib/components/icons/ShareIcon.svelte";
    import { goto } from "$app/navigation";
    import ActiveExerciseInfo from "$lib/components/ActiveExerciseInfo.svelte";
    import StartExerciseButton from "$lib/components/StartExerciseButton.svelte";
    import { selectedExerciseStore } from "$lib/stores";
    import { Body } from "svelte-body";
    import ExitExerciseButton from "$lib/components/ExitExerciseButton.svelte";
    import ExerciseMap from "$lib/components/ExerciseMap.svelte";
    import BackNavBar from "$lib/components/BackNavBar.svelte";
</script>

<Body class="overflow-hidden" />

<BackNavBar backPath="/profile/exercise/stats/">
    <span slot="first" class="font-semibold">Running</span>
    <span slot="second" class="text-blue">15:30 - 15:36</span>
    <ShareIcon slot="icon" />
</BackNavBar>

<main class="h-screen w-screen flex flex-col items-center gap-12 overflow-auto">
    <ExerciseMap class="mt-6 rounded-2xl min-h-52 w-11/12"></ExerciseMap>
    <!--        <img src={$selectedExerciseStore.background} class="w-screen h-screen absolute opacity-15" alt="A person exercising on a hill">-->
    <div>
        <ActiveExerciseInfo size="lg">
            <span>1550</span>
            <span slot="unit">Steps</span>
        </ActiveExerciseInfo>
    </div>
    <div class="grid grid-cols-2 gap-8 mb-10">
        <ActiveExerciseInfo size="md">
            <span>00:05:50</span>
            <span slot="unit">Time</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>1.5</span>
            <span slot="unit">Km</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>3</span>
            <span slot="unit">Tempo</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>52</span>
            <span slot="unit">Calories</span>
        </ActiveExerciseInfo>
    </div>
    <div class="flex flex-row mt-16 gap-4">
        <StartExerciseButton />
        <ExitExerciseButton />
    </div>
</main>
