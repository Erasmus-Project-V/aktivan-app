<script lang="ts">
    import bg from "$lib/assets/login-background.webp";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import RightArrow from "$lib/components/icons/RightArrowIcon.svelte";
    import PasswordInput from "$lib/components/PasswordInput.svelte";

    let passwordHidden = true;
    
    function togglePassword() {
        passwordHidden = !passwordHidden;
    }
</script>

<div class="z-10">
    <img src={bg} alt="A man running.">
</div>

<main class="mt-5">
    <form class="flex flex-col justify-center items-center gap-8 mx-8">
        <Input className="w-10/12" type="text" placeholder="Email or username"/>
        <PasswordInput {passwordHidden} {togglePassword}/>

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