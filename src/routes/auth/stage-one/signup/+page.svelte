<script lang="ts">
    import bg from "$lib/assets/signup-background.svg";
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
    import { signUpDetailsStore, signUpStageOneAlerts } from "$lib/stores";
    import { onDestroy } from "svelte";
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

    const signUpData = z.object({
        username: z.string()
            .min(3, { message: "Username must contain at least 3 characters" })
            .max(25, { message: "Username must have 25 characters or less" }),
        email: z.string()
            .email({ message: "Invalid email" })
            .max(512, { message: "Email must have 512 characters or less" }),
        password: z.string()
            .min(8, { message: "Password must contain at least 8 characters" })
            .max(512, { message: "Password must have 512 characters or less" }),
        confirmPassword: z.string().refine((data) => data === password && data.length > 0, { message: "Passwords do not match" })
    });

    function validateSignUpData(): boolean {
        try {
            signUpData.parse({
                username,
                email,
                password,
                confirmPassword,
            });
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
    <form on:submit|preventDefault={onSignUp} class="flex flex-col justify-center items-center gap-8 mx-8">
        <Input bind:alert={alerts.username} bind:value={username} className="w-10/12" type="text" placeholder="Username"/>
        <Input bind:alert={alerts.email} bind:value={email} className="w-10/12" type="text" placeholder="Email"/>
        <PasswordInput bind:alert={alerts.password} bind:value={password} {passwordHidden} {togglePassword}/>
        <PasswordInput bind:alert={alerts.confirmPassword} bind:value={confirmPassword} passwordHidden={confirmPasswordHidden} togglePassword={toggleConfirmPassword} placeholder="Confirm password"/>

        <Button on:click={onSignUp} class="self-end mt-8">
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Sign Up</span>
                <RightArrow/>
            </span>
        </Button>
    </form>
</main>

