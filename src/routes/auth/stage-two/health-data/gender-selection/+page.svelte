<script lang="ts">
    import GenderSelector from "$lib/components/GenderSelector.svelte";
    import { goto } from "$app/navigation";
    import NextButton from "$lib/components/NextButton.svelte";

    export let selected: "male" | "female";

    const nextPage = "/auth/stage-two/health-data/age-selection";

    function next() {
        goto(nextPage);
    }
</script>


<div class="flex flex-col gap-10">
    <GenderSelector on:click={() => selected = "female"} selected={selected === "female"} gender="female"/>
    <GenderSelector on:click={() => selected = "male"} selected={selected === "male"} gender="male"/>
</div>

<NextButton class="mr-6" on:click={next}/>

