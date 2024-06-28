import { pb } from "$lib/services/pocketbase";

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

export function isEmailValid(email: string): boolean {
    return email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    ) !== null;
}

export { UsernameAlreadyTakenErr, EmailAlreadyTakenErr }