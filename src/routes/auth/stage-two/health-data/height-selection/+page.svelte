<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import NextButton from "$lib/components/NextButton.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import { goto } from "$app/navigation";

    const heightOffset = 40;
    const itemHeight = 60;
    const nextPage = "";

    let heights = Array.from({ length: 210 }, (_, i) => i + heightOffset);
    let selectedHeight = 165;
    let container: HTMLDivElement;

    onMount(() => {
        if (container) {
            container.scrollTop = (selectedHeight - heightOffset - 1 - 3) * itemHeight;
        }
    });

    function handleScroll(e: any) {
        const scrollTop = e.target.scrollTop;
        selectedHeight = Math.floor(scrollTop / itemHeight) + 1;
    }

    function next() {

    }

    function back() {
        goto("/auth/stage-two/health-data/weight-selection");
    }
</script>

<div class="w-36 h-72 overflow-y-scroll bg-gray-900 text-white rounded-lg" bind:this={container}
     on:scroll={handleScroll}>
    <div class="py-24">
        {#each heights as height}
            <div
                    class="h-[60px] flex items-end justify-center transition-all duration-200 border-y-lightblue"
                    class:text-white={Math.abs(height - heightOffset - selectedHeight) === 1}
                    class:opacity-30={Math.abs(height - heightOffset - selectedHeight) > 1}
                    class:opacity-10={Math.abs(height - heightOffset - selectedHeight) > 2}
                    class:border-y-2={height - heightOffset === selectedHeight}
                    class:text-6xl={height - heightOffset === selectedHeight}
                    class:text-4xl={Math.abs(height - heightOffset - selectedHeight) === 1}
                    class:text-3xl={Math.abs(height - heightOffset - selectedHeight) === 2}
                    class:text-xl={Math.abs(height - heightOffset - selectedHeight) > 2}
            >
                {height} <p class="text-xs opacity-80">cm</p>
            </div>
        {/each}
    </div>
</div>

<div class="px-6 w-full flex flex-row justify-between items-center">
    <BackButton on:click={back} />
    <NextButton on:click={next}/>
</div>

