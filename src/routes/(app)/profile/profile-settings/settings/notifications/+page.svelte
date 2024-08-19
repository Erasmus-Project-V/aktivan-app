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

<div class="text-white p-4">
    <BackHeader href="/profile/profile-settings/settings" class="mt-4 mb-8">Notifications</BackHeader>
    <MenuButtonList class="mt-4">
        <MenuButton on:click={() => toggleNotification("motivational")}>
            Motivational Notifications
            <label class="relative inline-block w-[50px] h-6">
                <input type="checkbox" bind:checked={motivationalNotifications} class="opacity-0 w-0 h-0">
                <span class="absolute cursor-pointer inset-0 bg-gray-300 transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-0.5 before:bg-white before:transition-all before:duration-400 before:rounded-full checked:bg-blue-500 checked:before:translate-x-[26px]"></span>
            </label>
        </MenuButton>
        <MenuButton on:click={() => toggleNotification("friend")}>
            Friend Notifications
            <label class="relative inline-block w-[50px] h-6">
                <input type="checkbox" bind:checked={friendNotifications} class="opacity-0 w-0 h-0">
                <span class="absolute cursor-pointer inset-0 bg-gray-300 transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-0.5 before:bg-white before:transition-all before:duration-400 before:rounded-full checked:bg-blue-500 checked:before:translate-x-[26px]"></span>
            </label>
        </MenuButton>
    </MenuButtonList>
</div>
