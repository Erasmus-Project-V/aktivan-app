<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import Title from "$lib/components/Title.svelte";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import { goto } from "$app/navigation";
    import { type Alert, AlertType } from "$lib/types/components";
    import { z } from "zod";
    import { pb } from "$lib/services/pocketbase";

    let email: string;
    let alert: Alert | undefined;

    async function redirectToStageTwo() {
        if (!isValidEmail(email)) {
            alert = {
                type: AlertType.WARNING,
                text: "Invalid email address"
            };
            return;
        }
        await pb.collection("users").requestPasswordReset(email);
        await goto("/auth/restart-password/stage-two");
    }

    function isValidEmail(email: string): boolean {
        try {
            z.object({
                email: z.string().email()
            }).parse({ email });
        } catch (err) {
            return false;
        }

        return true;
    }
</script>

<div class="bg-black flex flex-col p-4 text-gray-300 min-h-screen">
    <BackHeader href="/auth/stage-one/login" class="mt-4 mb-8 pt-12"></BackHeader>

    <Title title="Forgot Password?" description="Enter your email address"></Title>

    <div class="pl-4 pt-20">
        <Input bind:alert={alert} on:input={() => alert = undefined} className="text" placeholder="Email" bind:value={email}></Input>
    </div>

    <div class="pt-36 flex flex-col items-center">
        <span class="text-lightblue font-bold text-sm">
            <span>Send the code to my email address:</span>
        </span>
        <Button class="mt-6 w-64" on:click={async () => await redirectToStageTwo()}>
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Send</span>
            </span>
        </Button>
    </div>
</div>