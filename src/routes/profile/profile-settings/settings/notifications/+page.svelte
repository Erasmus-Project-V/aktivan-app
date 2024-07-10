<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";

    let motivationalNotifications = false;
    let friendNotifications = false;

    function toggleNotification(type: string) {
        if (type === 'motivational') {
            motivationalNotifications = !motivationalNotifications;
            console.log('Motivational Notifications:', motivationalNotifications);
        } else if (type === 'friend') {
            friendNotifications = !friendNotifications;
            console.log('Friend Notifications:', friendNotifications);
        }
    }
</script>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }
</style>

<div class="text-white p-4">
    <BackHeader href="/profile/profile-settings/settings" class="mt-4 mb-8">Notifications</BackHeader>
    <MenuButtonList class="mt-4">
        <MenuButton on:click={() => toggleNotification("motivational")}>
            Motivational Notifications
            <span class="switch">
                <input type="checkbox" bind:checked={motivationalNotifications}>
                <span class="slider"></span>
            </span>
        </MenuButton>
        <MenuButton on:click={() => toggleNotification("friend")}>
            Friend Notifications
            <span class="switch">
                <input type="checkbox" bind:checked={friendNotifications}>
                <span class="slider"></span>
            </span>
        </MenuButton>
    </MenuButtonList>
</div>
