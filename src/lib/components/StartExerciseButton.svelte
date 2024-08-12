<script>
    import ExerciseButton from "$lib/components/ExerciseButton.svelte";
    import RightArrowIcon from "$lib/components/icons/RightArrowIcon.svelte";
</script>

<ExerciseButton class={$$props.class} on:click>
    <RightArrowIcon width="38" height="38" color="white" />
</ExerciseButton>