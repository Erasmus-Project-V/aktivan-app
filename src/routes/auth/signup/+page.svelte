<script lang="ts">
    import bg from "$lib/assets/signup-background.svg";
    import Input from "$lib/components/Input.svelte";
    import passwordToggle from "$lib/assets/password-show-toggle.svg";
    import passwordHiddenLine from "$lib/assets/password-hidden-line.svg";

    let passwordHidden = true;
    let confirmPasswordHidden = true;

    function togglePassword(e: KeyboardEventInit) {
        if (e.key && e.key !== "Enter") {
            return;
        }
        passwordHidden = !passwordHidden;
    }

    function toggleConfirmPassword(e: KeyboardEventInit) {
        if (e.key && e.key !== "Enter") {
            return;
        }
        confirmPasswordHidden = !confirmPasswordHidden;
    }
</script>

<div class="z-10">
    <img src={bg} alt="A man running.">
</div>

<main class="mt-5">
    <form action="" class="flex flex-col justify-center items-center gap-8">
        <Input className="w-10/12" type="password" placeholder="Username"/>
        <Input className="w-10/12" type="text" placeholder="Email"/>
        <Input className="w-10/12" type={passwordHidden ? "password" : "text"} placeholder="Password">
            <span on:click={togglePassword} on:keydown={togglePassword} tabindex="0" role="button" class="flex flex-row justify-center items-center relative cursor-pointer">
                {#if !passwordHidden}
                    <img class="absolute top-[0.2rem]" src={passwordHiddenLine} alt="Showing password is hidden">
                {/if}
                <img src={passwordToggle} alt="Password show/hide toggle">
            </span>
        </Input>
        <Input className="w-10/12" type={confirmPasswordHidden ? "password" : "text"} placeholder="Confirm password">
            <span on:click={toggleConfirmPassword} on:keydown={toggleConfirmPassword} tabindex="0" role="button" class="flex flex-row justify-center items-center relative cursor-pointer">
                {#if !confirmPasswordHidden}
                    <img class="absolute top-[0.2rem]" src={passwordHiddenLine} alt="Showing password is hidden">
                {/if}
                <img src={passwordToggle} alt="Password show/hide toggle">
            </span>
        </Input>
    </form>
</main>