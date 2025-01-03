 <script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import ArrowRightIcon from "$lib/components/icons/ArrowRightIcon.svelte";
    import { goto } from "$app/navigation";

    import erasmusLogo from "$lib/assets/eu-erasmus-logo.png";
</script>

<link rel="preload" as="image" href={erasmusLogo}>

<div class="bg-black text-white min-h-screen p-4 flex flex-col ">
    <BackHeader href="/profile/profile-settings/settings" class="mt-4 mb-8">About Us</BackHeader>
    <MenuButtonList class="mt-4">
        <MenuButton on:click={async () => await goto("/profile/profile-settings/settings/about-us/credits")}>
            Credits
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton on:click={async () => await goto("/profile/profile-settings/settings/about-us/contact")}>
            Contact Us
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
    </MenuButtonList>

    <img class="w-56 self-center mt-auto" src={erasmusLogo} alt="Erasmus project logo">
</div>
