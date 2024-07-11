<script lang="ts">
    export let progress = 0;
</script>

<div class="relative w-full h-2 bg-lightgray rounded-full">
    <div class="absolute h-full bg-blue rounded-full" style="width: {progress}%"></div>
</div>