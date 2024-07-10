<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import ArrowRightIcon from "$lib/components/icons/ArrowRightIcon.svelte";
</script>

<div class="bg-black text-white p-4">
    <BackHeader class="mt-4 mb-8" href="/profile/profile-settings">Settings</BackHeader>
    <MenuButtonList class="mt-4">
        <MenuButton href="/profile/profile-settings/settings/notifications">
            Notifications
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings/settings/personalization">
            Personalization
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings/settings/aboutus">
            About Us
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
    </MenuButtonList>
</div>
