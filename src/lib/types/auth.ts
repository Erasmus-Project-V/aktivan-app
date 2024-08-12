import type { Alert } from "$lib/types/components";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    NON_BINARY = "non-binary",
}

export interface StageOneSignUpDetails {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface StageTwoSignUpDetails {
    emailVerified: boolean;
    age: number;
    weight: number;
    height: number;
    gender: string;
}

export type SignUpDetails = StageOneSignUpDetails & StageTwoSignUpDetails;

export interface StageOneSignUpAlerts {
    username: Alert | undefined;
    email: Alert | undefined;
    password: Alert | undefined;
    confirmPassword: Alert | undefined;
}