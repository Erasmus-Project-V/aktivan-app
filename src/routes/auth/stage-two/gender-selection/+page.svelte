<script lang="ts">
    import GenderSelector from "$lib/components/GenderSelector.svelte";
    import Button from "$lib/components/Button.svelte";
    import RightArrowIcon from "$lib/components/icons/RightArrowIcon.svelte";

    export let selected: "male" | "female";
</script>


<div class="flex flex-col gap-10">
    <GenderSelector on:click={() => selected = "female"} selected={selected === "female"} gender="female"/>
    <GenderSelector on:click={() => selected = "male"} selected={selected === "male"} gender="male"/>
</div>

<Button class="self-end mx-4 my-10">
    <RightArrowIcon slot="icon"/>
    Next
</Button>
