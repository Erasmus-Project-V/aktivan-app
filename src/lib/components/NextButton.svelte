<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import RightArrowIcon from "$lib/components/icons/RightArrowIcon.svelte";
</script>

<Button class="my-10 self-end {$$props.class}" on:click>
    <RightArrowIcon slot="icon"/>
    Next
</Button>