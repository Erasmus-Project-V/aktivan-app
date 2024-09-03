<script lang="ts">
    import { onMount } from "svelte";
    import { Body } from "svelte-body";

    export let isOpen = false;

    function open() {
        isOpen = true;
    }

    function close() {
        isOpen = false;
    }
</script>

<Body class={isOpen ? "opacity-50" : ""} />

{#if isOpen}
    <div class="fixed inset-0 pointer-events-none">
        <div class="bg-lightergray opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-[50vw] h-[50vh] flex items-center justify-center pointer-events-auto">
            <!-- Modal content goes here -->
        </div>
    </div>
{/if}