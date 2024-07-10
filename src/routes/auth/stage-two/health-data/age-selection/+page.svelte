<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import NextButton from "$lib/components/NextButton.svelte";
    import { goto } from "$app/navigation";
    import BackButton from "$lib/components/BackButton.svelte";

    const itemHeight = 60;
    const nextPage = "/auth/stage-two/health-data/weight-selection";

    let ages = Array.from({length: 100}, (_, i) => i + 1);
    let selectedAge = 20;
    let container: HTMLDivElement;

    onMount(() => {
        if (container) {
            container.scrollTop = (selectedAge - 1 - 3) * itemHeight;
        }
    });

    function handleScroll(e: any) {
        const scrollTop = e.target.scrollTop;
        selectedAge = Math.floor(scrollTop / itemHeight) + 1;
    }

    function next() {
        goto(nextPage);
    }

    function back() {
        goto("/auth/stage-two/health-data/gender-selection");
    }
</script>

<div class="w-20 h-72 overflow-y-scroll bg-gray-900 text-white rounded-lg" bind:this={container}
     on:scroll={handleScroll}>
    <div class="py-24">
        {#each ages as age}
            <div
                    class="h-[60px] flex items-center justify-center transition-all duration-200 border-y-lightblue"
                    class:text-white={Math.abs(age - selectedAge) === 1}
                    class:opacity-30={Math.abs(age - selectedAge) > 1}
                    class:opacity-10={Math.abs(age - selectedAge) > 2}
                    class:border-y-2={age === selectedAge}
                    class:text-6xl={age === selectedAge}
                    class:text-4xl={Math.abs(age - selectedAge) === 1}
                    class:text-3xl={Math.abs(age - selectedAge) === 2}
                    class:text-xl={Math.abs(age - selectedAge) > 2}
            >
                {age}
            </div>
        {/each}
    </div>
</div>

<div class="px-6 w-full flex flex-row justify-between items-center">
    <BackButton on:click={back} />
    <NextButton on:click={next} />
</div>
<!--
<Button class="self-end mx-4 my-10">
    <RightArrowIcon slot="icon"/>
    Next
</Button>
-->
