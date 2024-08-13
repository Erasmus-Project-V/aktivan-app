<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import NavbarItem from "$lib/components/NavbarItem.svelte";
    import HomeIcon from "$lib/components/icons/HomeIcon.svelte";
    import StatsIcon from "$lib/components/icons/StatsIcon.svelte";
    import PeopleIcon from "$lib/components/icons/PeopleIcon.svelte";
    import Avatar from "$lib/components/Avatar.svelte";

    import avatar from "$lib/assets/avatar.png";
    import { page } from "$app/stores";
    import { pb } from "$lib/services/pocketbase.js";
    import { userStore } from "$lib/stores";
    import { onMount } from "svelte";

    const avatarSrc = `https://api.aktivan.green-stem.eu/api/files/${$userStore?.collectionId}/${$userStore?.id}/${$userStore?.avatar}`;

    onMount(() => {
        console.log($userStore);
    });
</script>

<svelte:head>
    <link rel="preload" as="image" href={avatarSrc}>
</svelte:head>

<main class="w-screen h-screen flex-1 justify-evenly items-center overflow-hidden">
    <slot />

    <Navbar class="absolute bottom-0 h-fit">
        <NavbarItem link="/profile/exercise" isShow={$page.url.pathname === "/profile/exercise"}>
            <HomeIcon width="24" height="24" />
        </NavbarItem>
        <NavbarItem link="/profile/exercise/stats/this-week" isShow={$page.url.pathname.includes("/profile/exercise/stats")}>
            <StatsIcon width="24" height="24" />
        </NavbarItem>
        <NavbarItem link="" isShow={$page.url.pathname.includes("/profile/exercise/friends")}>
            <PeopleIcon width="24" height="24" />
        </NavbarItem>
        <NavbarItem link="/profile/profile-settings" isShow={false}>
            <Avatar width="36" height="36" src={avatarSrc}></Avatar>
        </NavbarItem>
    </Navbar>
</main>