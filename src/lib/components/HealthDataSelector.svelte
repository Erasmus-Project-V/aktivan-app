<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import NextButton from "$lib/components/NextButton.svelte";
    import { goto } from "$app/navigation";
    import BackButton from "$lib/components/BackButton.svelte";

    export let dataOffset: number;
    export let itemHeight = 60;
    export let nextPage: string;
    export let backPage: string;
    export let selectedData: number;
    export let dataUnit: string;

    let data = Array.from({ length: 300 }, (_, i) => i + dataOffset);
    let container: HTMLDivElement;

    const dispatch = createEventDispatcher();

    onMount(() => {
        if (container) {
            container.scrollTop = ((selectedData - dataOffset) - dataOffset - 1 - 3) * itemHeight;
        }
    });

    function handleScroll(e: any) {
        const scrollTop = e.target.scrollTop;
        selectedData = Math.floor(scrollTop / itemHeight) + 1 + dataOffset;
        console.log(selectedData);
    }

    function next() {
        dispatch("next", {
            selectedData,
        });

        goto(nextPage);
    }

    function back() {
        goto(backPage);
    }
</script>

<div class="w-36 h-72 overflow-y-scroll bg-gray-900 text-white rounded-lg" bind:this={container}
     on:scroll={handleScroll}>
    <div class="py-24">
        {#each data as data}
            <div
                    class="h-[60px] flex items-end justify-center transition-all duration-200 border-y-lightblue"
                    class:text-white={Math.abs(data - selectedData) === 1}
                    class:opacity-30={Math.abs(data - selectedData) > 1}
                    class:opacity-10={Math.abs(data - selectedData) > 2}
                    class:border-y-2={data === selectedData}
                    class:text-6xl={data === selectedData}
                    class:text-4xl={Math.abs(data - selectedData) === 1}
                    class:text-3xl={Math.abs(data - selectedData) === 2}
                    class:text-xl={Math.abs(data - selectedData) > 2}
            >
                {data} <p class="text-xs opacity-80">{dataUnit}</p>
            </div>
        {/each}
    </div>
</div>

<div class="px-6 w-full flex flex-row justify-between items-center">
    <BackButton on:click={back}/>
    <NextButton on:click={next}/>
</div>