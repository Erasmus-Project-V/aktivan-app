<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    export let progress: number = 0;
    export let level: number = 1;

    let animatedProgress = tweened(0, {
        duration: 1000,
        easing: cubicOut
    });

    let mounted = false;

    onMount(() => {
        mounted = true;
        animatedProgress.set(progress);
    });

    $: if (mounted) {
        animatedProgress.set(progress);
    }
</script>

<style>
    .progress-bar {
        transition: width 1s cubic-bezier(0.25, 0.5, 0.75, 1);
    }
</style>

<div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold pb-2">Level {level}</h2>
</div>
<div class="relative w-full h-2 bg-lightgray rounded-full">
    <div class="absolute h-full bg-[#3498db] rounded-full progress-bar"
         style="width: {$animatedProgress}%">
    </div>
</div>