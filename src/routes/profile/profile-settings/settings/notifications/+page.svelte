<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";

    let motivationalNotifications = false;
    let friendNotifications = false;

    function toggleMotivationalNotifications() {
        motivationalNotifications = !motivationalNotifications;
    }

    function toggleFriendNotifications() {
        friendNotifications = !friendNotifications;
    }
</script>


<div class="text-white p-4">
    <BackHeader href="/profile/profile-settings/settings" class="mt-4 mb-8">Notifications</BackHeader>
    <MenuButtonList class="mt-4">
        <MenuButton on:click={toggleMotivationalNotifications}>
            Motivational Notifications
            <Checkbox bind:checked={motivationalNotifications} />
        </MenuButton>
        <MenuButton on:click={toggleFriendNotifications}>
            Friend Notifications
            <Checkbox bind:checked={friendNotifications} />
        </MenuButton>
    </MenuButtonList>
</div>
