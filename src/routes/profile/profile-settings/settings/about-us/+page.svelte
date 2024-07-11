<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import MenuButtonList from "$lib/components/MenuButtonList.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";
    import ArrowRightIcon from "$lib/components/icons/ArrowRightIcon.svelte";
</script>

<div class="bg-black text-white min-h-screen p-4">
    <BackHeader href="/profile/profile-settings/settings" class="mt-4 mb-8">About Us</BackHeader>
    <MenuButtonList class="mt-4">
        <MenuButton href="/profile/profile-settings/settings/about-us/credits">
            Credits
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
        <MenuButton href="/profile/profile-settings/settings/about-us/contact">
            Contact Us
            <ArrowRightIcon slot="icon"/>
        </MenuButton>
    </MenuButtonList>
</div>
