<script lang="ts">
    import bg from "$lib/assets/signup-background.webp";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import RightArrow from "$lib/components/icons/RightArrowIcon.svelte";
    import { type Alert, AlertType } from "$lib/types/components";
    import PasswordInput from "$lib/components/PasswordInput.svelte";
    import {
        dryCreateUser,
        EmailAlreadyTakenErr,
        UsernameAlreadyTakenErr,
        validateStageOneSignUpData
    } from "$lib/services/auth";
    import { type SignUpDetails, type StageOneSignUpAlerts } from "$lib/types/auth";

    import { goto } from "$app/navigation";
    import { signUpDetailsStore } from "$lib/stores";
    import { z } from "zod";

    let passwordHidden = true;
    let confirmPasswordHidden = true;

    let username: string;
    let email: string;
    let password = "";
    let confirmPassword = "";

    let alerts: StageOneSignUpAlerts = {
        username: {} as Alert,
        email: {} as Alert,
        password: {} as Alert,
        confirmPassword: {} as Alert,
    };


    function validateSignUpData(): boolean {
        try {
            validateStageOneSignUpData({ username, email, password, confirmPassword })
        } catch (err) {
            if (err instanceof z.ZodError) {
                for (const issue of err.errors) {
                    alerts[issue.path[0] as keyof StageOneSignUpAlerts] = {
                        text: issue.message,
                        type: AlertType.WARNING
                    } as Alert;
                    alerts = alerts;
                }
            }
            return false;
        }

        return true;
    }

    function togglePassword() {
        passwordHidden = !passwordHidden;
    }

    function toggleConfirmPassword() {
        confirmPasswordHidden = !confirmPasswordHidden;
    }

    function onSignUp() {
        console.log(username);
        if (!validateSignUpData()) {
            return;
        }

        try {
            dryCreateUser(username, email, confirmPassword);
        } catch (err) {
            if (err === UsernameAlreadyTakenErr) {
                alerts = {
                    ...alerts,
                    username: {
                        text: "Username already taken",
                        type: AlertType.WARNING
                    },
                };
            } else if (err === EmailAlreadyTakenErr) {
                alerts = {
                    ...alerts,
                    email: {
                        text: "Email already taken",
                        type: AlertType.WARNING
                    },
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
    <form on:submit|preventDefault class="flex flex-col justify-center items-center gap-8 mx-8">
        <Input bind:alert={alerts.username} bind:value={username} className="w-10/12" type="text" placeholder="Username"/>
        <Input bind:alert={alerts.email} bind:value={email} className="w-10/12" type="text" placeholder="Email"/>
        <PasswordInput bind:alert={alerts.password} bind:value={password} {passwordHidden} {togglePassword}/>
        <PasswordInput bind:alert={alerts.confirmPassword} bind:value={confirmPassword} passwordHidden={confirmPasswordHidden} togglePassword={toggleConfirmPassword} placeholder="Confirm password"/>

        <Button on:click={onSignUp} class="self-end mt-8">
            Sign Up
            <RightArrow slot="icon"/>
        </Button>
    </form>
</main>

