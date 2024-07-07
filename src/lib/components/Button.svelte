<script lang="ts">
    import RightArrow from "$lib/components/icons/RightArrowIcon.svelte";

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
    <span class="flex flex-row gap-1 items-center justify-center">
        <span class="text-black">
            <slot/>
        </span>
        <slot name="icon"/>
    </span>
</button>