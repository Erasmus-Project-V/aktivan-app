<script lang="ts">
    import ArrowLeftIcon from "$lib/components/icons/ArrowLeftIcon.svelte";
</script>

<button on:click class="w-11 h-11 border-none rounded-full bg-gray flex items-center justify-center {$$props.class}">
    <ArrowLeftIcon/>
</button>
