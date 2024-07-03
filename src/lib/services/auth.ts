import { pb } from "$lib/services/pocketbase";
import { type Alert, AlertType } from "$lib/types/components";
import type { SignUpDetails, StageOneSignUpAlerts, StageOneSignUpDetails } from "$lib/types/auth";
import { signUpStageOneAlerts } from "$lib/stores";

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

function validateStageOneSignUpDataLength(data: StageOneSignUpDetails, alerts: StageOneSignUpAlerts): boolean {

    if (data.username.length === 0) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                usernameAlert: {
                    text: "Username must not be empty",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.email.length === 0) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                emailAlert: {
                    text: "Email must not be empty",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.password.length === 0) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                passwordAlert: {
                    text: "Password must not be empty",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.confirmPassword.length === 0) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                confirmPasswordAlert: {
                    text: "Confirm password must not be empty",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.username.length === 0 || data.email.length === 0 || data.password.length === 0 || data.confirmPassword.length === 0) {
        return false;
    }

    // ensure the data isn't too long
    if (data.username.length > 30) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                usernameAlert: {
                    text: "Username must have a length of 30 or less",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.email.length > 100) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                emailAlert: {
                    text: "Email must have a length of 100 or less",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.password.length > 512) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                passwordAlert: {
                    text: "Password must have a length of 512 or less",
                    type: AlertType.WARNING,
                }
            }
        });
    }
    if (data.confirmPassword.length > 512) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                confirmPasswordAlert: {
                    text: "Confirm password must have a length of 512 or less",
                    type: AlertType.WARNING,
                }
            }
        });
    }


    return true;
}

export function validateStageOneSignUpData(data: StageOneSignUpDetails, alerts: StageOneSignUpAlerts): boolean {
    if (!validateStageOneSignUpDataLength(data, alerts)) {
        return false;
    }

    if (data.password !== data.confirmPassword) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                confirmPasswordAlert: {
                    text: "Password doesn't match",
                    type: AlertType.WARNING,
                }
            }
        });
        return false;
    }
    if (!isEmailValid(data.email)) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                emailAlert: {
                    text: "Email is invalid",
                    type: AlertType.WARNING,
                }
            }
        });
        return false;
    }
    if (data.password.length < 8) {
        signUpStageOneAlerts.update(v => {
            return { ...v,
                passwordAlert: {
                    text: "Password must have a length of 8 or more",
                    type: AlertType.WARNING,
                }
            }
        });
        return false;
    }

    return true;
}

export { UsernameAlreadyTakenErr, EmailAlreadyTakenErr }