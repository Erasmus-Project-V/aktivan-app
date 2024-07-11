<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import Title from "$lib/components/Title.svelte";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import { writable } from 'svelte/store';

    const email = writable('');

    function redirectToStageTwo() {
        email.subscribe(value => {
            if (isValidEmail(value)) {
                window.location.href = '/auth/restart-password/stage-two';
            } else {
                console.error('Invalid email address');
            }
        })();
    }

    function isValidEmail(email: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
</script>

<div class="bg-black flex flex-col p-4 text-gray-300 min-h-screen">
    <BackHeader href="/auth/stage-one/login" class="mt-4 mb-8 pt-12"></BackHeader>

    <Title title="Forgot Password?" description="Enter your email address"></Title>

    <div class="pl-4 pt-20">
        <Input className="text" placeholder="Email" bind:value={$email}></Input>
    </div>

    <div class="pt-36 flex flex-col items-center">
        <span class="text-lightblue font-bold text-sm">
            <span>Send the code to my email address:</span>
        </span>
        <Button class="mt-6 w-64" on:click={redirectToStageTwo}>
            <span class="flex flex-row gap-1 items-center justify-center">
                <span>Send</span>
            </span>
        </Button>
    </div>
</div>