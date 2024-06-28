<script lang="ts">
    import { AlertType } from "$lib/types/components";
    import type { Alert } from "$lib/types/components";

    export let type: "text" | "password" = "text";
    export let placeholder = "";
    export let className: string;
    export let value = "";
    export let alert: Alert = <Alert>{};

    let input: HTMLInputElement;

    const typeColors = new Map<AlertType, string>([
        [AlertType.WARNING, "text-warning"],
    ]);

    function onChange() {
        alert = {} as Alert;
    }
</script>

<div class="group w-72 input-transition relative">
    {#if alert.text}
        <span class="absolute -mt-4 text-sm {typeColors.get(alert.type)}">
            {alert.text}
        </span>
    {/if}
    <span class="absolute top-0 right-3">
        <slot/>
    </span>
    <input on:input={onChange} bind:this={input} on:change={() => value = input?.value} value={value}
           class="peer py-2 w-full input-transition placeholder-white outline-none text-white border-b-2 border-b-gray bg-black {$$props.class}"
           {type}>
    <span class="peer-focus:text-[0] {value.length > 0 ? 'text-[0]' : ''} absolute ml-[-18rem] placeholder cursor-auto text-white">{placeholder}</span>
</div>

<style lang="postcss">

    .input-transition span {
        transition: 250ms all;
    }
</style>