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
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";

    export let data: LayoutData;

    const activity = data.activities.find((activity: any) => activity.id === $page.params.id);
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
            <span>{activity.steps}</span>
            <span slot="unit">Steps</span>
        </ActiveExerciseInfo>
    </div>
    <div class="grid grid-cols-2 gap-8 mb-10">
        <ActiveExerciseInfo size="md">
            <span>{activity.}</span>
            <span slot="unit">Time</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>{activity.distance}</span>
            <span slot="unit">Meters</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>{Math.round(activity.distance / activity.duration)}</span>
            <span slot="unit">Tempo</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>{activity.calories}</span>
            <span slot="unit">Calories</span>
        </ActiveExerciseInfo>
    </div>
    <div class="flex flex-row mt-16 gap-4">
        <StartExerciseButton />
        <ExitExerciseButton />
    </div>
</main>
