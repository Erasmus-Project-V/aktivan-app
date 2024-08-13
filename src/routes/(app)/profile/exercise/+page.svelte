<script lang="ts">
    import climbingImg from "$lib/assets/climbing-1.png";
    import { Body } from "svelte-body";
    import Button from "$lib/components/Button.svelte";
    import RightArrowIcon from "$lib/components/icons/RightArrowIcon.svelte";
    import ExerciseSelector from "$lib/components/ExerciseSelector.svelte";
    import { exercises } from "$lib/types/exercises";
    import { selectedExerciseStore } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { quintOut } from "svelte/easing";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    // let selectedExercise: string;

    onMount(() => {
        selectedExerciseStore.set(exercises[0]);
    });
</script>

<Body class="overflow-y-hidden"/>

{#key $selectedExerciseStore.background}
    <img transition:fade={{ delay:200, duration:500, easing:quintOut }} src={$selectedExerciseStore.background} class="w-full h-full absolute" alt="A person exercising on a hill">
{/key}

<div class="w-full h-full flex justify-center items-center overflow-hidden">

    <ExerciseSelector class="absolute bottom-48" {exercises} bind:selectedExercise={$selectedExerciseStore} selectedExerciseIdx={1} />

    <Button on:click={() => goto("/profile/exercise/start/test")} class="absolute bottom-[6.5rem]">
        <span class="uppercase">Start</span>
        <RightArrowIcon slot="icon" />
    </Button>
</div>

