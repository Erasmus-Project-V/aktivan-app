<script lang="ts">
    export let exerciseName: string;
    export let time: string;
</script>

<div class="flex flex-col justify-center p-4 w-10/12 h-16 bg-gray rounded-xl text-white font-open-sans">
    <span class="font-semibold">
        {exerciseName}
    </span>
    <span class="text-lightblue text-xs">
        {time}
    </span>
</div>