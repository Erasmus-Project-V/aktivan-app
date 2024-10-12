import { writable } from "svelte/store";
import type { SignUpDetails } from "$lib/types/auth";
import { exercises, type ExerciseType } from "$lib/types/exercises";
import type { Location } from "@capacitor-community/background-geolocation";
import type { AuthModel } from "pocketbase";
import type { DateTime } from "luxon";

export const signUpDetailsStore = writable<SignUpDetails>({} as SignUpDetails);
export const selectedExerciseStore = writable<ExerciseType>(exercises[0]);
export const userStore = writable<AuthModel>();

export const distanceStore = writable(0);
export const locationStore = writable<Array<Location>>([]);
export const stepStore = writable(0);
export const timeStore = writable(0);
export const caloriesStore = writable(0);
export const startStore = writable("");
export const endStore = writable("");
export const isRunningStore = writable(false);
export const pauseStartStore = writable<DateTime>();
export const totalPausedSecondsStore = writable(0);
export const currentActivityIdStore = writable(0);
export const isUploadingExerciseStore = writable(false);

export const isLoadingStore = writable(true);
