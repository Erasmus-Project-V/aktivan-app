<script lang="ts">
    import ExerciseButton from "$lib/components/ExerciseButton.svelte";
    import { goto } from "$app/navigation";
    import { quintOut } from "svelte/easing";
    import { fade } from "svelte/transition";
    import { caloriesStore, distanceStore, locationStore, stepStore, timeStore } from "$lib/stores";


    async function onHold() {
        await goto("/profile/exercise");
        distanceStore.set(0);
        stepStore.set(0);
        locationStore.set([]);
        timeStore.set(0);
        caloriesStore.set(0);
    }
</script>


<div class="flex flex-col items-center {$$props.class}">
    <!--    {#if showExitTooltip}
            <div transition:fade={{ delay: 100, duration: 400, easing: quintOut }} class="bg-lightgray w-48 bg-opacity-70 h-9 absolute bottom-[7.5rem] rounded-full flex items-center justify-center">
                <span class="text-white opacity-50 text-[0.925rem] font-bold">Hold to finish the exercise</span>
            </div>
        {/if}-->
    <ExerciseButton on:click class="transition-all" on:touchstart={onHold} color="red">
        <div class="w-5 h-5 drop-shadow-xl bg-white"></div>
    </ExerciseButton>
</div>