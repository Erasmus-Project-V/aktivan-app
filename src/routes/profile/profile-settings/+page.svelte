<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import ArrowRightIcon from "$lib/components/icons/ArrowRightIcon.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import ProgressBar from "$lib/components/ProgressBar.svelte";
</script>

<div class="bg-black text-white p-4">
    <BackHeader href="/" class="my-4">Dashboard</BackHeader>
    <div class="flex flex-col items-center mt-6 w-full">
        <div class="flex items-center w-full px-4">
            <Avatar src="https://st.depositphotos.com/1144472/2003/i/950/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg" />
            <div class="w-[1px] mx-4 bg-lightgray h-20" />
            <p class="text-gray-400">Joined July 2024</p>
        </div>
        <div class="w-full px-4 mt-4">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold">Level 2</h2>
            </div>
            <ProgressBar progress={50} />
        </div>
    </div>
    <MenuButtonList class="mt-8">
        <MenuButton href="/profile/profile-settings/points">
            Points & Levels
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings/edit">
            Edit Profile
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings/privacy">
            Privacy
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings/settings">
            Settings
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings">
      <span class="text-warning">
        Sign Out
      </span>
        </MenuButton>
    </MenuButtonList>
</div>
