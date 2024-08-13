import { pb } from "$lib/services/pocketbase";
import type { StageOneSignUpDetails } from "$lib/types/auth";
import { z } from "zod";
import type { SignUpDetails } from "$lib/types/auth";
import type { RecordModel } from "pocketbase";
import { Preferences } from "@capacitor/preferences";
import { userStore } from "$lib/stores";
import { CapacitorCookies } from "@capacitor/core";
import { goto } from "$app/navigation";
import { createAvatar, type Result } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { toJpeg, toPng } from "@dicebear/converter";

const UsernameAlreadyTakenErr = new Error("username already taken");
const EmailAlreadyTakenErr = new Error("username already taken");

export async function dryCreateUser(username: string, email: string, password: string) {
    const userByUsername = await pb.collection("users").getFirstListItem(
        `username="${username}"`
    );
    console.log(userByUsername);
    if (userByUsername.id?.length > 0) {
        throw UsernameAlreadyTakenErr;
    }

    const userByEmail = await pb.collection("users").getFirstListItem(
        `email="${email}"`
    );
    console.log(userByEmail);
    if (userByEmail.id?.length > 0) {
        throw EmailAlreadyTakenErr;
    }
}

export async function createUser(signUpDetails: SignUpDetails): Promise<RecordModel> {
    const data = new FormData();

    const avatar = createUserAvatar(signUpDetails.username);
    const avatarPng = await toPng(avatar).toArrayBuffer();

    data.append("username", signUpDetails.username);
    data.append("email", signUpDetails.email);
    data.append("password", signUpDetails.password);
    data.append("passwordConfirm", signUpDetails.confirmPassword);
    data.append("age", signUpDetails.age.toString());
    data.append("weight", signUpDetails.weight.toString());
    data.append("height", signUpDetails.height.toString());
    data.append("avatar", new Blob([avatarPng]));
    data.append("sex", signUpDetails.gender);

    const user = await pb.collection("users").create(data);

    return user;
}

function dataURItoFile(dataURI: string, filename: string) {
    // Extract the base64 encoded SVG content
    const svgContent = atob(dataURI.split(',')[1]);

    // Create a Blob from the SVG content
    const blob = new Blob([svgContent], { type: "image/svg+xml" });

    // Create a File object from the Blob
    return new File([blob], filename, { type: "image/svg+xml" });
}

export async function getAuthToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: "authToken" });

    return value;
}

export async function signIn(identity: string, password: string) {
    const authData = await pb.collection("users").authWithPassword(
        identity,
        password
    );

    userStore.set(authData.record);

    await CapacitorCookies.setCookie({
        key: "authToken",
        value: authData.token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    });
    // document.cookie = `authToken=${authData.token}; path=/`;

    await Preferences.set({
        key: "authToken",
        value: authData.token,
    });
    await Preferences.set({
        key: "userId",
        value: authData.record.id,
    });
}

export async function removePreferences() {
    await Preferences.remove({
        key: "authToken",
    });
    await Preferences.remove({
        key: "userId",
    });
}

export async function signOut() {
    await goto("/auth/stage-one/login");

    await removePreferences();
}

export async function verifyEmail(email: string): Promise<boolean> {
    return await pb.collection("users").requestVerification(email).catch(resp => resp);
}

export function createUserAvatar(username: string): Result {
    const avatar = createAvatar(adventurer, {
        seed: username,
    });

    return avatar;
}

/*export async function updateUserAvatar() {
    let user: any = null;
    userStore.subscribe(value => user = value as RecordModel)();

    const avatar = createUserAvatar(user.username);

    const formData = new FormData();

    formData.append("avatar", avatar.toDataUri());

    await pb.collection("users").update(user.id, formData);
}*/

export function validateStageOneSignUpData(data: StageOneSignUpDetails): boolean {
    const signUpData = z.object({
        username: z.string()
            .min(3, { message: "Username must contain at least 3 characters" })
            .max(25, { message: "Username must have 25 characters or less" }),
        email: z.string()
            .email({ message: "Invalid email" })
            .max(512, { message: "Email must have 512 characters or less" }),
        password: z.string()
            .min(8, { message: "Password must contain at least 8 characters" })
            .max(512, { message: "Password must have 512 characters or less" }),
        confirmPassword: z.string().refine((password) => password === data.password && password.length > 0, { message: "Passwords do not match" })
    });

    try {
        signUpData.parse(data);
    } catch (err) {
        throw err;
    }

    return true;
}

export { UsernameAlreadyTakenErr, EmailAlreadyTakenErr }