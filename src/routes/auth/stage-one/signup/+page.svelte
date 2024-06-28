<script lang="ts">
    import bg from "$lib/assets/signup-background.svg";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import RightArrow from "$lib/components/icons/RightArrow.svelte";
    import { type Alert, AlertType } from "$lib/types/components";
    import PasswordInput from "$lib/components/PasswordInput.svelte";
    import { dryCreateUser, EmailAlreadyTakenErr, isEmailValid, UsernameAlreadyTakenErr } from "$lib/services/auth";
    import { type SignUpDetails, signUpDetailsStore } from "$lib/stores";
    import { goto } from "$app/navigation";

    let passwordHidden = true;
    let confirmPasswordHidden = true;

    let username: string;
    let email: string;
    let password: string;
    let confirmPassword: string;

    let passwordAlert: Alert;
    let confirmPasswordAlert: Alert;
    let usernameAlert: Alert;
    let emailAlert: Alert;

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

    function validateData(): boolean {
        if (username.length === 0) {
            usernameAlert = {
                text: "Username must not be empty",
                type: AlertType.WARNING,
            };
        }
        if (email.length === 0) {
            emailAlert = {
                text: "Email must not be empty",
                type: AlertType.WARNING,
            };
        }
        if (password.length === 0) {
            passwordAlert = {
                text: "Password must not be empty",
                type: AlertType.WARNING,
            };
        }
        if (confirmPassword.length === 0) {
            confirmPasswordAlert = {
                text: "Confirm password must not be empty",
                type: AlertType.WARNING,
            };
        }
        if (username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            console.log("Test")
            return false;
        }

        if (password !== confirmPassword) {
            confirmPasswordAlert = {
                text: "Password doesn't match",
                type: AlertType.WARNING,
            };
            return false;
        }
        if (!isEmailValid(email)) {
            emailAlert = {
                text: "Email is invalid",
                type: AlertType.WARNING,
            };
            return false;
        }
        if (password.length < 8) {
            passwordAlert = {
                text: "Password must have a length of 8 or more",
                type: AlertType.WARNING,
            };
            return false;
        }

        return true;
    }

    function onSignUp() {
        console.log("Sign up")
        if (!validateData()) {
            return;
        }

        try {
            dryCreateUser(username, email, confirmPassword);
        } catch (err) {
            if (err === UsernameAlreadyTakenErr) {
                usernameAlert = {
                    text: "Username already taken",
                    type: AlertType.WARNING
                };
            } else if (err === EmailAlreadyTakenErr) {
                emailAlert = {
                    text: "Email already taken",
                    type: AlertType.WARNING
                };
            }

            return;
        }

        $signUpDetailsStore = {
            username,
            email,
            password,
            confirmPassword,
        } as SignUpDetails;
        goto("/auth/stage-two/gender-selection");
    }
</script>


<div class="z-10">
    <img src={bg} alt="A man running.">
</div>

<main class="mt-5">
    <form on:submit|preventDefault={onSignUp} class="flex flex-col justify-center items-center gap-8 mx-8">
        <Input bind:alert={usernameAlert} bind:value={username} className="w-10/12" type="text" placeholder="Username"/>
        <Input bind:alert={emailAlert} bind:value={email} className="w-10/12" type="text" placeholder="Email"/>
        <PasswordInput bind:alert={passwordAlert} bind:value={password} {passwordHidden} {togglePassword}/>
        <PasswordInput bind:alert={confirmPasswordAlert} bind:value={confirmPassword} passwordHidden={confirmPasswordHidden} togglePassword={toggleConfirmPassword} placeholder="Confirm password"/>

        <Button on:click={onSignUp} class="self-end mt-8">
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Sign Up</span>
                <RightArrow/>
            </span>
        </Button>
    </form>
</main>

