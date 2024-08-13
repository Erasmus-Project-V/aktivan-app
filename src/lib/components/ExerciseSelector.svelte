<script lang="ts">
    import { onMount } from "svelte";
    import type { ExerciseType } from "$lib/types/exercises";
    import { selectedExerciseStore } from "$lib/stores";

    export let itemWidth = 120;
    export let selectedExerciseIdx: number;
    export let exercises: Array<ExerciseType>;
    export let selectedExercise = $selectedExerciseStore;
    
    let container: HTMLDivElement;

    onMount(() => {
        if (container) {
            container.scrollLeft = (selectedExerciseIdx - 1) * itemWidth + 10;
        }
    });

    function handleScroll(e: any) {
        const scrollLeft = e.target.scrollLeft;
        selectedExerciseIdx = Math.max(0, Math.min(Math.round(scrollLeft / itemWidth), exercises.length - 1));
        selectedExercise = exercises[selectedExerciseIdx];
    }
</script>

<div class="w-11/12 h-12 flex justify-center bg-gray-900 text-white rounded-lg {$$props.class}">
    <div class="w-full pl-[7.5rem] pr-40 flex flex-row gap-3 overflow-x-scroll" bind:this={container} on:scroll={handleScroll}>
        {#each exercises as exercise, idx}
            <div
                    class="w-[120px] px-3 py-1 flex items-end justify-center transition-all duration-200 border-white border-opacity-60 font-bold uppercase text-sm"
                    class:text-white={Math.abs(idx - selectedExerciseIdx) === 1}
                    class:opacity-30={Math.abs(idx - selectedExerciseIdx) > 1}
                    class:opacity-10={Math.abs(idx - selectedExerciseIdx) > 2}
                    class:border-x={idx === selectedExerciseIdx}
                    class:text-lg={idx === selectedExerciseIdx}
                    class:text-sm={Math.abs(idx - selectedExerciseIdx) === 2}
            >
                {exercise.name}
            </div>
        {/each}
    </div>
</div>

