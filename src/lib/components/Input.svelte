<script lang="ts">
    import { AlertType } from "$lib/types/components";
    import type { Alert } from "$lib/types/components";

    export let type: "text" | "password" = "text";
    export let placeholder = "";
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
    <span class="absolute top-0 right-3">
        <slot/>
    </span>
    <div class="flex flex-col">
        {#if type === "password"}
            <input on:input={onChange} bind:this={input} on:change={() => value = input?.value} bind:value={value}
                   class="peer py-2 w-full input-transition placeholder-white text-white outline-none border-b-[1.5px] {alert.type === AlertType.WARNING ? 'border-b-warning' : 'text-white border-b-gray'} bg-black {$$props.class}"
                   type="password">
        {:else}
            <input on:input={onChange} bind:this={input} on:change={() => value = input?.value} bind:value={value}
                   class="peer py-2 w-full input-transition placeholder-white text-white outline-none border-b-[1.5px] {alert.type === AlertType.WARNING ? 'border-b-warning' : 'text-white border-b-gray'} bg-black {$$props.class}"
                   type="text">
        {/if}
        <span class="peer-focus:text-[0] {value.length > 0 ? 'text-[0]' : ''} absolute placeholder cursor-auto
            {alert.type === AlertType.WARNING ? 'text-warning' : 'text-white'}">
                {placeholder}
        </span>
        {#if alert.text}
            <span class="opacity-0 peer-focus:opacity-100 absolute mt-11 text-xs {typeColors.get(alert.type)}">
                {alert.text}
            </span>
        {/if}
    </div>
</div>

<style lang="postcss">
    .input-transition span {
        transition: 50ms all;
    }
</style>