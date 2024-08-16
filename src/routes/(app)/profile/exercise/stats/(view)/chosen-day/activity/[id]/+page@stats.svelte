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
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import { DateTime } from "luxon";
    import { onMount } from "svelte";
    import { exercises } from "$lib/types/exercises";

    export let data: PageData;

    let activity: any;
    let duration: any;

    onMount(() => {
        activity = data.activities?.find((activity: any) => {
            console.log(activity.id);
            return activity.id === $page.params.id;
        });
        console.log(activity);
        duration = DateTime.fromSQL(activity?.end)?.toLocal()?.diff(DateTime.fromSQL(activity.start).toLocal(), ["hours", "minutes", "seconds"]).toFormat("hh:mm:ss");
    });

    $: activityName = findNameById(activity?.type);
    $: activityDuration = `${dateTimeToHoursAndMinutes(DateTime.fromSQL(activity?.start))} - ${dateTimeToHoursAndMinutes(DateTime.fromSQL(activity?.end))}`;

    function findNameById(id: string) {
        return exercises.find(exercise => exercise.id === id)?.name ?? id;
    }

    function dateTimeToHoursAndMinutes(date: DateTime) {
        if (!date) {
            return "";
        }
        return `${date?.toLocal?.().hour?.toString()?.padStart(2, "0")}:${date?.toLocal()?.minute?.toString()?.padStart(2, "0")}`;
    }
</script>

<Body class="overflow-hidden" />

<BackNavBar backPath="/profile/exercise/stats/">
    <span slot="first" class="font-semibold">{activityName}</span>
    <span slot="second" class="text-blue">{activityDuration}</span>
    <ShareIcon slot="icon" />
</BackNavBar>

<main class="h-screen w-screen flex flex-col items-center gap-12 overflow-auto">
    <ExerciseMap class="mt-6 rounded-2xl min-h-52 w-11/12"></ExerciseMap>
    <!--        <img src={$selectedExerciseStore.background} class="w-screen h-screen absolute opacity-15" alt="A person exercising on a hill">-->
    <div>
        <ActiveExerciseInfo size="lg">
            <span>{activity?.steps}</span>
            <span slot="unit">Steps</span>
        </ActiveExerciseInfo>
    </div>
    <div class="grid grid-cols-2 gap-8 mb-10">
        <ActiveExerciseInfo size="md">
            <span>{duration}</span>
            <span slot="unit">Duration</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>{Math.round(activity?.distance)}</span>
            <span slot="unit">Meters</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>{Number(activity?.distance / activity?.duration).toFixed(1)}</span>
            <span slot="unit">Tempo</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo size="md">
            <span>{Math.round(activity?.calories)}</span>
            <span slot="unit">Calories</span>
        </ActiveExerciseInfo>
    </div>
    <div class="flex flex-row mt-16 gap-4">
        <StartExerciseButton />
        <ExitExerciseButton />
    </div>
</main>
