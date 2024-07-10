<script lang="ts">
    import Input from "../../../../lib/components/Input.svelte";
    import Button from "../../../../lib/components/Button.svelte";
    import BackHeader from "$lib/components/BackHeader.svelte";
    import LineSeparator from "$lib/components/LineSeparator.svelte";
</script>

<style>
    .profile-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
    }

    .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .profile-image .camera-icon {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: #474747;
        border-radius: 50%;
        padding: 8px;
    }

    .profile-image .camera-icon svg {
        width: 24px;
        height: 24px;
        fill: white;
    }

    .input-container {
        margin-bottom: 16px;
    }
</style>

<div class="bg-black flex flex-col p-4 text-gray-300">
    <BackHeader class="my-6" href="/profile/profile-settings">Edit Profile</BackHeader>
    <div class="relative flex items-center justify-center mb-20">
        <div class="profile-image relative flex items-center justify-center">
            <img src="https://st.depositphotos.com/1144472/2003/i/950/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg"
                 alt="Profile avatar"/>
        </div>
    </div>
    <LineSeparator/>
    <div class="input-container">
        <label for="username" class="text-[#5FA3C9] mb-1 block">Username</label>
        <Input className="w-10/12" id="username" class="w-full" type="text" value="marko45"/>
    </div>
    <div class="input-container">
        <label for="email" class="text-[#5FA3C9] mb-1 block">Email</label>
        <Input className="w-10/12" id="email" class="w-full" type="text" value="markojurić@gmail.com"/>
    </div>
    <div class="input-container">
        <label for="weight" class="text-[#5FA3C9] mb-1 block">Weight</label>
        <Input className="w-10/12" id="weight" class="w-full" type="text" value="71 kg"/>
    </div>
    <div class="input-container">
        <label for="height" class="text-[#5FA3C9] mb-1 block">Height</label>
        <Input className="w-10/12" id="height" class="w-full" type="text" value="175 cm"/>
    </div>
    <Button class="self-center mt-8">
        <span class="flex flex-row gap-1 items-center justify-center">
            <span>Save</span>
        </span>
    </Button>
</div>
