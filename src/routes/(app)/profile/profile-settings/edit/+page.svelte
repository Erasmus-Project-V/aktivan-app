<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import BackHeader from "$lib/components/BackHeader.svelte";
    import LineSeparator from "$lib/components/LineSeparator.svelte";
    import Avatar from "$lib/components/Avatar.svelte";
    import { userStore } from "$lib/stores";
    import { pb } from "$lib/services/pocketbase";
    import { Camera, CameraResultType } from "@capacitor/camera";
    import { compressImage } from "$lib/services/utils";

    let avatarSrc = `https://api.aktivan.green-stem.eu/api/files/${$userStore?.collectionId}/${$userStore?.id}/${$userStore?.avatar}`;

    // input variable bindings
    let username: string = $userStore?.username;
    let email: string = $userStore?.email;
    let weight: string = $userStore?.weight;
    let height: string = $userStore?.height;

    async function onSave() {
        await pb.collection("users").update($userStore?.id, {
            username,
            email,
            weight,
            height,
        });
    }

    async function pickAvatar() {
        const avatar = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
        });

        if (!avatar) {
            return;
        }

        avatarSrc = avatar?.webPath!;
        // get avatar file
        const avatarFile = await fetch(avatar.webPath!);
        const avatarBlob = await avatarFile.blob();

        let compressedBlob: Blob;

        try {
            compressedBlob = await compressImage(avatarBlob, 50, 0.5);
        } catch (err) {
            console.log(err);
        }

        if (!compressedBlob) {
            console.log("Error");
        }

        // upload avatar
        await pb.collection("users").update($userStore?.id, {
            avatar: compressedBlob,
        });
    }
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
    <div class="relative flex items-center justify-center mb-8">
        <div class="profile-image relative flex items-center justify-center">
            <button on:click={async () => await pickAvatar()}>
                <Avatar width="160" height="160" src={avatarSrc}></Avatar>
            </button>
        </div>
    </div>
    <LineSeparator/>
    <div class="input-container">
        <label for="username" class="text-[#5FA3C9] mb-1 block">Username</label>
        <Input className="w-10/12" id="username" class="w-full" type="text" bind:value={username}/>
    </div>
    <div class="input-container">
        <label for="email" class="text-[#5FA3C9] mb-1 block">Email</label>
        <Input className="w-10/12" id="email" class="w-full" type="text" bind:value={email}/>
    </div>
    <div class="input-container">
        <label for="weight" class="text-[#5FA3C9] mb-1 block">Weight (kg)</label>
        <Input className="w-10/12" id="weight" class="w-full" type="text" bind:value={weight}/>
    </div>
    <div class="input-container">
        <label for="height" class="text-[#5FA3C9] mb-1 block">Height (cm)</label>
        <Input className="w-10/12" id="height" class="w-full" type="text" bind:value={height}/>
    </div>
    <Button class="self-center mt-5" on:click={async () => await onSave()}>
        <span class="flex flex-row gap-1 items-center justify-center">
            <span>Save</span>
        </span>
    </Button>
</div>
