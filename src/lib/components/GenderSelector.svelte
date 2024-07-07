<script lang="ts">
    import MarsIcon from "$lib/components/icons/MarsIcon.svelte";
    import VenusIcon from "$lib/components/icons/VenusIcon.svelte";

    export let gender: "male" | "female";
    export let selected = false;

    let iconFill = "#fff";
    let backgroundFill = "gray";

    $: {
        if (selected) {
            backgroundFill = "lightblue";
        } else {
            backgroundFill = "gray";
        }

        if (selected) {
            iconFill = "#000";
        } else {
            iconFill = "#fff";
        }
    }

</script>

<button on:click class="flex flex-col justify-center items-center gap-4 border-non rounded-full bg-{backgroundFill} w-36 h-36 {$$props.class}">
    {#if gender === "male"}
        <MarsIcon fill={iconFill}/>
    {:else if gender === "female"}
        <VenusIcon fill="{iconFill}"/>
    {/if}
    <span class="text-[{iconFill}]">{gender.slice(0, 1).toUpperCase().concat(gender.slice(1))}</span>
</button>