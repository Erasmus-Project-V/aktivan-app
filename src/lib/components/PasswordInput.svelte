<script lang="ts">
    import passwordHiddenLine from "$lib/assets/password-hidden-line.svg";
    import passwordToggle from "$lib/assets/password-show-toggle.svg";
    import Input from "$lib/components/Input.svelte";
    import type { Alert } from "$lib/types/components";

    export let passwordHidden: boolean;
    export let togglePassword: () => void;
    export let value: string = "";
    export let placeholder = "Password";
    export let alert = {} as Alert;
</script>

<Input {alert} bind:value={value} className="w-10/12" type={passwordHidden ? "password" : "text"} {placeholder}>
    <button on:click={togglePassword}
          class="flex flex-row justify-center items-center relative cursor-pointer">
        {#if !passwordHidden}
            <img class="absolute top-[0.2rem]" src={passwordHiddenLine} alt="Showing password is hidden">
        {/if}
        <img src={passwordToggle} alt="Password show/hide toggle">
    </button>
</Input>