<script lang="ts">
    import { goto } from "$app/navigation";
    import BackArrowIcon from "$lib/components/icons/BackArrowIcon.svelte";
    import ArrowButton from "$lib/components/ArrowButton.svelte";
    import ShareIcon from "$lib/components/icons/ShareIcon.svelte";

    export let backPath: string;
</script>

<nav class="w-full font-open-sans text-white h-24 bg-gray rounded-b-3xl flex items-center p-6 justify-between {$$props.class}">
    <ArrowButton disabled={false} on:click={async () => await goto(backPath)}>
        <BackArrowIcon/>
    </ArrowButton>
    <span class="font-semibold">
        <slot name="first" />
    </span>
    <slot name="second" />
    <slot name="icon" />
    <!--        <span class="text-blue">15:30 - 15:36</span>-->
    <!--        <ShareIcon/>-->
</nav>
