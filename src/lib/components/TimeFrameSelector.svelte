<script lang="ts">
    export let selected: string;
    export let options: string[];

    function selectOption(option: string): void {
        selected = option;
    }
</script>

<style>

</style>

<div class="bg-[#2C2C2E] rounded-b-3xl h-16">
    <div class="flex justify-center text-white">
        {#each options as option}
            <div
                class="cursor-pointer pt-4 pl-4 pr-4 pb-1 {selected === option ? 'font-bold text-[#5FA3C9] border-b-[#5FA3C9] border-b-2' : ''}"
                on:click={() => selectOption(option)}
            >
                {option}
            </div>
        {/each}
    </div>
</div>

<div class="flex-1 flex items-center justify-center pt-14">
    {#if selected}
        <span id="title" class="text-white text-2xl font-bold">{selected}</span>
    {/if}
</div>
