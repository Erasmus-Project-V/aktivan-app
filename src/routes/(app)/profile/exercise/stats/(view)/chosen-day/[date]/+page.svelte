<script>
    import ExerciseCard from "$lib/components/ExerciseCard.svelte";
    import ChosenDayExerciseBlock from "$lib/components/ChosenDayExerciseBlock.svelte";
</script>

<main class="h-screen overflow-y-scroll flex flex-col m-4 pb-20">
    <ChosenDayExerciseBlock exerciseName="Running" blockOneUnit="Steps" blockOneValue={320} blockTwoUnit="Calories"
                            blockTwoValue={1556}></ChosenDayExerciseBlock>
    <div class="text-white text-base font-semibold">
        <span>Exercise history</span>
        <div class="mt-2 flex flex-col justify-center">
            <ExerciseCard exerciseName="Running" time="14:23"/>
        </div>
    </div>
</main>
