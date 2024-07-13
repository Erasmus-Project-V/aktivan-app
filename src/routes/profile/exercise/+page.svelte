<script lang="ts">
    import climbingImg from "$lib/assets/climbing-1.png";
    import { Body } from "svelte-body";
    import Button from "$lib/components/Button.svelte";
    import RightArrowIcon from "$lib/components/icons/RightArrowIcon.svelte";
    import ExerciseSelector from "$lib/components/ExerciseSelector.svelte";

    const exercises = ["Running", "Walking", "Cycling", "Swimming", "Hiking"]

    let selectedExercise: string;
</script>

<Body class="overflow-y-hidden"/>

<div class="w-full h-full flex justify-center items-center overflow-hidden">
    <img src={climbingImg} class="w-full h-full absolute" alt="A man hiking on a hill">

    <ExerciseSelector class="absolute bottom-48" {exercises} bind:selectedExercise={selectedExercise} selectedExerciseIdx={1} />

    <Button class="absolute bottom-[6.5rem]">
        <span class="uppercase">Start</span>
        <RightArrowIcon slot="icon" />
    </Button>
</div>

