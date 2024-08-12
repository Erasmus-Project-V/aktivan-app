<script lang="ts">
    import ActiveExerciseInfo from "$lib/components/ActiveExerciseInfo.svelte";

    export let blockOneUnit: string;
    export let blockOneValue: number;
    export let blockTwoUnit: string;
    export let blockTwoValue: number;
</script>

<div class="flex flex-row gap-2 items-center mb-3 {$$props.class}">
    <ActiveExerciseInfo>
        <span>{blockOneValue}</span>
        <span slot="unit">{blockOneUnit}</span>
    </ActiveExerciseInfo>
    <ActiveExerciseInfo>
        <span>{blockTwoValue}</span>
        <span slot="unit">{blockTwoUnit}</span>
    </ActiveExerciseInfo>
</div>