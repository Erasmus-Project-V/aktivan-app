<script lang="ts">
    export let color: "green" | "red" = "green";

    const colors = {
        "green": "bg-green",
        "red": "bg-red"
    }
</script>

<button on:click on:touchstart on:touchend class="rounded-full flex {colors[color]} bg-opacity-75 w-14 h-12 {$$props.class}">
    <span class="flex justify-center items-center w-full h-full">
        <slot />
    </span>
</button>