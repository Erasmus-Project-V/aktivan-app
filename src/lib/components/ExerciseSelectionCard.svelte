<script lang="ts">
    import { goto } from "$app/navigation";

    export let exercise: string;
    export let backgroundUrl: string;
</script>

<button on:click class="{$$props.class}">
    <div class="flex items-center justify-center w-44 h-44 rounded-3xl shadow-2xl {$$props.class}"
         style="background: url({backgroundUrl}); background-size: cover;">
            <span class="flex items-center justify-center w-full h-8 bg-lightgray bg-opacity-70 drop-shadow-2xl text-white font-semibold">
                {exercise}
            </span>
    </div>
</button>
