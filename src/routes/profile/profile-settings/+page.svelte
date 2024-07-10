<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import ArrowRightIcon from "$lib/components/icons/ArrowRightIcon.svelte";
</script>

<style>
    .profile-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
    }

    .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .progress-container {
        width: 100%;
        padding: 0 16px;
        margin-top: 16px;
    }

    .progress-bar {
        height: 8px;
        background-color: #474747;
        border-radius: 4px;
        position: relative;
        width: 100%;
    }

    .progress {
        height: 100%;
        background-color: #3498db;
        border-radius: 4px;
        width: 50%;
    }

    .vertical-line {
        width: 1px;
        background-color: #474747;
        height: 80px;
        margin: 0 16px;
    }
</style>

<div class="bg-black text-white p-4">
    <BackHeader href="/" class="my-4">Dashboard</BackHeader>
    <div class="flex flex-col items-center mt-6 w-full">
        <div class="flex items-center w-full px-4">
            <div class="profile-image">
                <img src="https://st.depositphotos.com/1144472/2003/i/950/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg"
                     alt="Profile Avatar"/>
            </div>
            <div class="vertical-line"></div>
            <p class="text-gray-400">Joined July 2024</p>
        </div>
        <div class="progress-container">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold">Level 2</h2>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
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
