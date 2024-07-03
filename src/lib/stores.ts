import { writable } from "svelte/store";
import type { SignUpDetails, StageOneSignUpAlerts } from "$lib/types/auth";

const signUpDetailsStore = writable<SignUpDetails>();
const signUpStageOneAlerts = writable<StageOneSignUpAlerts>({
    confirmPasswordAlert: undefined,
    emailAlert: undefined,
    passwordAlert: undefined,
    usernameAlert: undefined
});

export { signUpDetailsStore, signUpStageOneAlerts };