<script lang="ts">
    export let color: "blue" = "blue";
    export let size: "sm" = "sm";

    const colors = new Map<string, string>([
        ["blue", ""]
    ]);

    const sizes = new Map<string, string>([
        ["", ""]
    ]);
</script>

<button class="rounded-full bg-lightblue font-semibold font-sans text-lg w-36 h-14 {$$props.class}" on:click>
    <slot/>
</button>