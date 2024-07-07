import { writable } from "svelte/store";
import type { SignUpDetails, StageOneSignUpAlerts } from "$lib/types/auth";

const signUpDetailsStore = writable<SignUpDetails>();

export { signUpDetailsStore };