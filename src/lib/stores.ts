import { writable } from "svelte/store";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    NON_BINARY = "non-binary",
}

export interface SignUpDetails {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    emailVerified: boolean;
    age: number;
    weight: number;
    height: number;
    gender: Gender;
}

const signUpDetailsStore = writable<SignUpDetails>();

export { signUpDetailsStore };