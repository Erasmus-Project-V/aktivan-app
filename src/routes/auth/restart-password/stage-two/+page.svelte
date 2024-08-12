<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import Button from "$lib/components/Button.svelte";
    import { goto } from "$app/navigation";

    async function redirectToLogin() {
        await goto("/auth/stage-one/login");
    }
</script>

<div class="bg-black flex flex-col p-4 text-gray-300 min-h-screen">
    <BackHeader href="/auth/restart-password/stage-one" class="mt-4 mb-8 pt-12"></BackHeader>

    <h1 class="text-white text-2xl pt-16 font-light text-center">Open the link that was sent to you via email</h1>

    <div class="pt-48 flex flex-col items-center">
        <span class="text-lightblue font-bold text-sm">
            <span>Click after changing your password:</span>
        </span>
        <Button class="mt-6 w-64" on:click={redirectToLogin}>
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Take me back to login</span>
            </span>
        </Button>
    </div>
</div>
