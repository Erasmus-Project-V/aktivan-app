<script lang="ts">
    import { writable } from 'svelte/store';
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import ArrowRightIcon from "$lib/components/icons/ArrowRightIcon.svelte";
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import Avatar from "$lib/components/Avatar.svelte";

    import { userStore } from "$lib/stores";
    import { signOut } from "$lib/services/auth";
    import { goto } from "$app/navigation";

    const progressValue = writable(72);
    const levelValue = writable(1);

    function addProgress(amount: number) {
        if (amount <= 0){
            console.log("Amount must be greater than 0!")
        }
        else{
            progressValue.update(value => {
                let newValue = value + amount;
                if (newValue > 100) newValue = 100;
                if (newValue < 0) newValue = 0;
                return newValue;
            });
        }
    }

    function addLevel(level: number) {
        if (level <= 0){
            console.log("Level must be greater than 0!")
        }
        else{
            levelValue.update(value => {
                let newValue = value + level;
                if (newValue > 999) newValue = 999;
                if (newValue < 1) newValue = 1;
                return newValue;
            });
        }
    }

    const avatarSrc = `https://api.aktivan.green-stem.eu/api/files/${$userStore?.collectionId}/${$userStore?.id}/${$userStore?.avatar}`;
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

    @keyframes progress-animation {
        from {
            width: var(--previous-progress);
        }
        to {
            width: var(--progress);
        }
    }

    .vertical-line {
        width: 1px;
        background-color: #474747;
        height: 80px;
        margin: 0 16px;
    }
</style>

<div class="bg-black text-white p-4">
    <BackHeader href="/profile/exercise" class="my-4">Dashboard</BackHeader>
    <div class="flex flex-col items-center mt-6 w-full justify-items-center justify-center content-center">
        <div class="flex items-center w-full px-4">
            <Avatar src={avatarSrc} width="160" height="160" />
            <div class="vertical-line"></div>
            <p class="text-gray-400">Joined July 2024</p>
        </div>
<!--        <div class="progress-container">

            <ProgressBar progress={$progressValue} level={$levelValue}></ProgressBar>
        </div>-->
    </div>
    <MenuButtonList class="mt-8">
<!--        <MenuButton href="/profile/profile-settings/points">
            Points & Levels
            <ArrowRightIcon slot="icon"/>
        </MenuButton>-->
        <MenuButton on:click={() => goto("/profile/profile-settings/edit")}>
            Edit Profile
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton on:click={() => goto("/profile/profile-settings/privacy")}>
            Privacy
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton on:click={() => goto("/profile/profile-settings/settings")}>
            Settings
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton on:click={() => goto("/profile/profile-settings/awards")}>
            Awards
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton on:click={signOut}>
          <span class="text-warning">
            Sign Out
          </span>
        </MenuButton>
    </MenuButtonList>
</div>