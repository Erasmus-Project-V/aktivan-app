<script lang="ts">
    export let size: "md" | "lg" = "md";

    const sizes = {
        md: {
            main: "h-32 w-36 text-xl",
            value: "text-2xl",
            unit: "text-xl"
        },
        lg: {
            main: "h-48 w-60",
            value: "text-6xl",
            unit: "text-2xl"
        },
    };
</script>

<div class="flex flex-col justify-center items-center rounded-2xl bg-lightgray text-blue bg-opacity-30 {sizes[size].main} gap-2 {$$props.class}">
    <span class="{sizes[size].value} font-open-sans font-semibold">
        <slot />
    </span>
    <span class="text-lightergray text-opacity-80 font-bold uppercase {sizes[size].unit}">
        <slot name="unit" />
    </span>
</div>