import { pb } from "$lib/services/pocketbase";
import type { StageOneSignUpDetails } from "$lib/types/auth";
import { z } from "zod";

const UsernameAlreadyTakenErr = new Error("username already taken");
const EmailAlreadyTakenErr = new Error("username already taken");


export async function dryCreateUser(username: string, email: string, password: string) {
    const userByUsername = await pb.collection("users").getFirstListItem(
        `username="${username}"`
    );
    if (userByUsername.id) {
        throw UsernameAlreadyTakenErr;
    }

    const userByEmail = await pb.collection("users").getFirstListItem(
        `email="${email}"`
    );
    if (userByEmail.id) {
        throw EmailAlreadyTakenErr;
    }
}

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