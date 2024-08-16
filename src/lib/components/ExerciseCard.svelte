<script lang="ts">
    import { goto } from "$app/navigation";

    export let exerciseName: string;
    export let time: string;
    export let id: string;
</script>

<button on:click={async () => await goto(`/profile/exercise/stats/chosen-day/activity/${id}`)} class="flex flex-col justify-center p-4 w-10/12 h-16 bg-gray rounded-xl text-white font-open-sans">
    <span class="font-semibold">
        {exerciseName}
    </span>
    <span class="text-lightblue text-xs">
        {time}
    </span>
</button>