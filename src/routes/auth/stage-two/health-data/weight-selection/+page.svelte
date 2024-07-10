<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import Button from "$lib/components/Button.svelte";
    import RightArrowIcon from "$lib/components/icons/RightArrowIcon.svelte";
    import NextButton from "$lib/components/NextButton.svelte";
    import { goto } from "$app/navigation";
    import BackButton from "$lib/components/BackButton.svelte";

    const weightOffset = 30;
    const itemHeight = 60;
    const nextPage = "/auth/stage-two/health-data/height-selection";

    let weights = Array.from({ length: 300 }, (_, i) => i + weightOffset);
    let selectedWeight = 75;
    let container: HTMLDivElement;


    onMount(() => {
        if (container) {
            container.scrollTop = (selectedWeight - weightOffset - 1 - 3) * itemHeight;
        }
    });

    function handleScroll(e: any) {
        const scrollTop = e.target.scrollTop;
        selectedWeight = Math.floor(scrollTop / itemHeight) + 1;
    }

    function next() {
        goto(nextPage);
    }

    function back() {
        goto("/auth/stage-two/health-data/age-selection");
    }
</script>

<div class="w-36 h-72 overflow-y-scroll bg-gray-900 text-white rounded-lg" bind:this={container}
     on:scroll={handleScroll}>
    <div class="py-24">
        {#each weights as weight}
            <div
                    class="h-[60px] flex items-end justify-center transition-all duration-200 border-y-lightblue"
                    class:text-white={Math.abs(weight - weightOffset - selectedWeight) === 1}
                    class:opacity-30={Math.abs(weight - weightOffset - selectedWeight) > 1}
                    class:opacity-10={Math.abs(weight - weightOffset - selectedWeight) > 2}
                    class:border-y-2={weight - weightOffset === selectedWeight}
                    class:text-6xl={weight - weightOffset === selectedWeight}
                    class:text-4xl={Math.abs(weight - weightOffset - selectedWeight) === 1}
                    class:text-3xl={Math.abs(weight - weightOffset - selectedWeight) === 2}
                    class:text-xl={Math.abs(weight - weightOffset - selectedWeight) > 2}
            >
                {weight} <p class="text-xs opacity-80">kg</p>
            </div>
        {/each}
    </div>
</div>

<div class="px-6 w-full flex flex-row justify-between items-center">
    <BackButton on:click={back} />
    <NextButton on:click={next}/>
</div>