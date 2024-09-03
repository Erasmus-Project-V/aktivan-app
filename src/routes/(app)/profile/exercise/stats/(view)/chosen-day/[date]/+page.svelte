<script lang="ts">
    import ExerciseCard from "$lib/components/ExerciseCard.svelte";
    import ChosenDayExerciseBlock from "$lib/components/ChosenDayExerciseBlock.svelte";
    import type {
        LayoutData
    } from "./$types";
    import { DateTime } from "luxon";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { exercises } from "$lib/types/exercises";

    export let data: LayoutData;

    let activities: Array<any> = [];

    let perType: Map<string, { meters: number; calories: number; }> = new Map();

    onMount(() => {
        let selectedDay = +$page.params.date?.split("-")[0];
        let selectedMonth = +$page.params.date?.split("-")[1];
        let selectedYear = +$page.params.date?.split("-")[2];

        console.log(data.activities);
        activities = data.activities.filter((activity: any) => {
            const activityDate = DateTime.fromSQL(activity.start);
            console.log(activityDate);
            return activityDate.day === selectedDay && activityDate.month === selectedMonth && activityDate.year === selectedYear;
        });
        activities = activities.toSorted((a, b) => DateTime.fromSQL(b.start).diff(DateTime.fromSQL(a.start)).toMillis());
        console.log(activities);
        console.log(`Activities: ${activities.length}`)

        for (const activity of activities) {
            if (!perType.get(activity.type)) {
                perType.set(activity.type, { meters: 0, calories: 0 });
            }
            console.log(activity);
            // perType.set(activity.type, { meters: activity.distance + , calories: 0 });
            perType.get(activity.type).meters += activity.distance;
            perType.get(activity.type).calories += activity.calories;
        }

        perType = perType;
        console.log(`Per type: ${perType}`);
    });

    function findNameById(id: string) {
        return exercises.find(exercise => exercise.id === id)?.name ?? id;
    }

    // find all activities for the chosen day stored in th [date] param in the form YYYY-MM-DD
</script>

<section class="h-screen overflow-scroll flex flex-col m-4">
    {#each perType.entries() as [ id, activity ]}
        <ChosenDayExerciseBlock exerciseName={findNameById(id)} blockOneUnit="Meters" blockOneValue={Math.round(activity?.meters)} blockTwoUnit="Calories"
                                blockTwoValue={Math.round(activity?.calories)}></ChosenDayExerciseBlock>
    {/each}
    <div class="text-white text-base font-semibold flex flex-col justify-center gap-2 mb-80">
        <span>Exercise history</span>
        {#each activities as activity}
            <ExerciseCard id={activity.id} exerciseName={findNameById(activity.type)} time={`${DateTime.fromSQL(activity.start).toLocal().hour.toString().padStart(2, "0")}:${DateTime.fromSQL(activity.start).toLocal().minute.toString().padStart(2, "0")}`}/>
        {/each}
    </div>
</section>

<!--
<main class="min-h-screen overflow-y-auto flex flex-col m-4 pb-4">
    <ChosenDayExerciseBlock exerciseName="Running" blockOneUnit="Meters" blockOneValue={320} blockTwoUnit="Calories"
                            blockTwoValue={1556}></ChosenDayExerciseBlock>
    <div class="text-white text-base font-semibold flex flex-col justify-center gap-2">
        <span>Exercise history</span>
        {#each activities as activity, index}
            <ExerciseCard
                    exerciseName={exercises.find(exercise => exercise.id === activity.type)?.name ?? activity.type}
                    time={`${DateTime.fromSQL(activity.start).toLocal().hour.toString().padStart(2, "0")}:${DateTime.fromSQL(activity.start).toLocal().minute.toString().padStart(2, "0")}`}
                    class={index === activities.length - 1 ? "mb-4" : ""}
            />
        {/each}
    </div>
</main>-->
