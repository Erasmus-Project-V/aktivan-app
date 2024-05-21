<script lang="ts">
    import bg from "$lib/assets/login-background.png";
    import Input from "$lib/components/Input.svelte";
    import passwordToggle from "$lib/assets/password-show-toggle.svg";
    import passwordHiddenLine from "$lib/assets/password-hidden-line.svg";
    import Button from "$lib/components/Button.svelte";
    import RightArrow from "$lib/components/icons/RightArrow.svelte";

    let passwordHidden = true;
    
    function togglePassword(e: KeyboardEventInit) {
        if (e.key && e.key !== "Enter") {
            return;
        }
        passwordHidden = !passwordHidden;
    }
</script>

<div class="z-10">
    <img src={bg} alt="A man running.">
</div>

<main class="mt-5">
    <form class="flex flex-col justify-center items-center gap-8 mx-8">
        <Input className="w-10/12" type="text" placeholder="Email or username"/>
        <Input className="w-10/12" type={passwordHidden ? "password" : "text"} placeholder="Password">
            <span on:click={togglePassword} on:keydown={togglePassword} tabindex="0" role="button" class="flex flex-row justify-center items-center relative cursor-pointer">
                {#if !passwordHidden}
                    <img class="absolute top-[0.2rem]" src={passwordHiddenLine} alt="Showing password is hidden">
                {/if}
                <img src={passwordToggle} alt="Password show/hide toggle">
            </span>
        </Input>

        <button class="bg-none self-end -mt-3">
            <span class="text-lightblue font-bold text-sm">
                Forgot password?
            </span>
        </button>

        <Button class="self-end mt-8">
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Log In</span>
                <RightArrow/>
            </span>
        </Button>
    </form>
</main>