<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import BackButton from "$lib/components/BackButton.svelte";
    import { goto } from "$app/navigation";

    function back() {
        goto("/auth/stage-one/signup")
    }
</script>

<main class="h-full flex flex-col px-6 text-center mt-12">
    <BackButton on:click={back} />
    <h1 class="text-white font-sans text-2xl mt-20">Open the link that was sent to you via email</h1>

    <div class="mt-36">
        <p class="text-lightblue text-xs font-semibold">Click here after confirming your account</p>
        <Button class="w-72 h-11 mt-5">Continue</Button>
    </div>
</main>