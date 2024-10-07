<script lang="ts">
    import bg from "$lib/assets/login-background.webp";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import RightArrow from "$lib/components/icons/RightArrowIcon.svelte";
    import PasswordInput from "$lib/components/PasswordInput.svelte";
    import { signIn } from "$lib/services/auth";
    import { goto } from "$app/navigation";
    import { type Alert, AlertType } from "$lib/types/components";

    let passwordHidden = true;

    let identity: string;
    let password: string;

    let alert: Alert;

    function togglePassword() {
        passwordHidden = !passwordHidden;
    }

    async function login() {
        try {
            await signIn(identity, password);
        } catch (err: any) {
            if (err.status === 400) {
                alert = {
                    type: AlertType.WARNING,
                    text: "Invalid credentials",
                };
            }
            return;
        }
        await goto("/profile/exercise");
    }
</script>

<svelte:head>
    <link rel="preload" as="image" href={bg}>
</svelte:head>

<div class="z-10">
    <img src={bg} class="w-screen" alt="A man running.">
</div>

<main class="mt-5">
    <form class="flex flex-col justify-center items-center gap-8 mx-8">
        <Input bind:alert={alert} bind:value={identity} className="w-10/12" type="text" placeholder="Email or username"/>
        <PasswordInput bind:alert={alert} bind:value={password} {passwordHidden} {togglePassword}/>

        <button class="bg-none self-end -mt-3">
            <span class="text-lightblue font-bold text-sm">
                <a href="/auth/restart-password/stage-one">Forgot password?</a>
            </span>
        </button>

        <Button on:click={async () => await login()} class="self-end mt-2">
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Log In</span>
                <RightArrow/>
            </span>
        </Button>
    </form>
</main>
