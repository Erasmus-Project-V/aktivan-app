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

        let compressedBlob: Blob | null = null;

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

<div class="bg-black flex flex-col p-4 text-gray-300">
    <BackHeader class="my-6" href="/profile/profile-settings">Edit Profile</BackHeader>
    <div class="relative flex items-center justify-center mb-8">
        <div class="w-[150px] h-[150px] rounded-full overflow-hidden relative">
            <button on:click={async () => await pickAvatar()} class="w-full h-full">
                <Avatar width="160" height="160" src={avatarSrc}></Avatar>
                <div class="absolute bottom-2.5 right-2.5 bg-[#474747] rounded-full p-2">
                    <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
                        <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"/>
                        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                    </svg>
                </div>
            </button>
        </div>
    </div>
    <LineSeparator/>
    <div class="flex flex-col gap-4">
        <div>
            <label for="username" class="text-[#5FA3C9] mb-1 block">Username</label>
            <Input className="w-10/12" id="username" class="w-full" type="text" bind:value={username}/>
        </div>
        <div>
            <label for="email" class="text-[#5FA3C9] mb-1 block">Email</label>
            <Input className="w-10/12" id="email" class="w-full" type="text" bind:value={email}/>
        </div>
        <div>
            <label for="weight" class="text-[#5FA3C9] mb-1 block">Weight (kg)</label>
            <Input className="w-10/12" id="weight" class="w-full" type="text" bind:value={weight}/>
        </div>
        <div>
            <label for="height" class="text-[#5FA3C9] mb-1 block">Height (cm)</label>
            <Input className="w-10/12" id="height" class="w-full" type="text" bind:value={height}/>
        </div>
    </div>
    <Button class="self-center mt-5" on:click={async () => await onSave()}>
        <span class="flex flex-row gap-1 items-center justify-center">
            <span>Save</span>
        </span>
    </Button>
</div>
