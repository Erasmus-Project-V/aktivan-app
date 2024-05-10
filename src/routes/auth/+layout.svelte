<script lang="ts">
    import { Body } from "svelte-body";
    import { page } from "$app/stores";
</script>

<Body class="bg-black" />

<div class="absolute text-white text-xs font-semibold">
    <nav class="mt-16 ml-4">
        <div class="flex flex-row gap-9">
            <a href="/auth/login" class:blue-bottom-border={$page.route.id?.includes("/auth/login")}>Log in</a>
            <a href="/auth/signup" class:blue-bottom-border={$page.route.id?.includes("/auth/signup")}>Sign up</a>
        </div>
    </nav>
</div>

<style lang="postcss">
    .blue-bottom-border {
        @apply pb-1 border-b-lightblue border-b-4 transition-all;
    }
</style>

<slot/>