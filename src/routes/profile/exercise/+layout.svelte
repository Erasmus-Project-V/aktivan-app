<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import NavbarItem from "$lib/components/NavbarItem.svelte";
    import HomeIcon from "$lib/components/icons/HomeIcon.svelte";
    import StatsIcon from "$lib/components/icons/StatsIcon.svelte";
    import PeopleIcon from "$lib/components/icons/PeopleIcon.svelte";
    import Avatar from "$lib/components/Avatar.svelte";

    import avatar from "$lib/assets/avatar.png";
</script>

<main class="w-screen h-screen flex-1 justify-evenly items-center overflow-hidden">
    <slot />

    <Navbar class="absolute bottom-0 h-fit">
        <NavbarItem link="/profile/exercise">
            <HomeIcon width="24" height="24" />
        </NavbarItem>
        <NavbarItem link="/profile/exercise/stats">
            <StatsIcon width="24" height="24" />
        </NavbarItem>
        <NavbarItem link="/profile/exercise/stats">
            <PeopleIcon width="24" height="24" />
        </NavbarItem>
        <NavbarItem link="/profile/profile-settings">
            <Avatar width="24" height="24" src={avatar}></Avatar>
        </NavbarItem>
    </Navbar>
</main>