<script lang="ts">
    import GenderSelector from "$lib/components/GenderSelector.svelte";
    import { goto } from "$app/navigation";
    import NextButton from "$lib/components/NextButton.svelte";
    import { signUpDetailsStore } from "$lib/stores";
    import BackButton from "$lib/components/BackButton.svelte";

    export let selected: "male" | "female";

    const nextPage = "/auth/stage-two/health-data/age-selection";

    function next() {
        if (!selected) {
            return;
        }

        $signUpDetailsStore.gender = selected;
        goto(nextPage);
    }

    function back() {
        goto("/auth/stage-one/signup");
    }
</script>


<div class="flex flex-col gap-10">
    <GenderSelector on:click={() => selected = "female"} selected={selected === "female"} gender="female"/>
    <GenderSelector on:click={() => selected = "male"} selected={selected === "male"} gender="male"/>
</div>

<div class="px-6 w-full flex flex-row justify-between items-center">
    <BackButton on:click={back}/>
    <NextButton disabled={!selected} class="{selected ? '' : 'opacity-50'}" on:click={next}/>
</div>
