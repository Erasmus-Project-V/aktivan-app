<script lang="ts">
    import { page } from "$app/stores";
    import { scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let link: string;
</script>

<div class="flex flex-col justify-center items-center cursor-pointer">
    <span class:blue-bottom-border={$page.url.pathname.includes(link)} class="pb-1 px-3">
        <a href={link}>
            <slot/>
        </a>
    </span>
</div>

<style lang="postcss">
    .blue-bottom-border {
        @apply border-b-lightblue border-b-4 transition-all;
    }
</style>

