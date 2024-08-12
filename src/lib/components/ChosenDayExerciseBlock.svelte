<script lang="ts">
    import ActiveExerciseInfo from "$lib/components/ActiveExerciseInfo.svelte";
    import LineSeparator from "$lib/components/LineSeparator.svelte";
    import TwoBlockExerciseInfo from "$lib/components/TwoBlockExerciseInfo.svelte";

    export let exerciseName: string;
    export let blockOneUnit: string;
    export let blockOneValue: number;
    export let blockTwoUnit: string;
    export let blockTwoValue: number;
</script>

<div class="flex flex-col gap-1 text-white {$$props.class}">
    <span class="font-open-sans font-semibold text-base mx-0">{exerciseName}</span>
    <TwoBlockExerciseInfo {blockOneUnit} {blockOneValue} {blockTwoUnit} {blockTwoValue} />
    <LineSeparator/>
</div>