<script>
    import ExerciseButton from "$lib/components/ExerciseButton.svelte";
</script>

<ExerciseButton on:click class="{$$props.class}" color="red">
    <div class="flex flex-row gap-1">
        <span class="w-1 h-6 bg-white rounded-full" />
        <span class="w-1 h-6 bg-white rounded-full" />
    </div>
</ExerciseButton>