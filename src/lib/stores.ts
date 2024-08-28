import { writable } from "svelte/store";
import type { SignUpDetails } from "$lib/types/auth";
import { exercises, type ExerciseType } from "$lib/types/exercises";
import type { Location } from "@capacitor-community/background-geolocation";
import type { AuthModel } from "pocketbase";

const signUpDetailsStore = writable<SignUpDetails>({} as SignUpDetails);
const selectedExerciseStore = writable<ExerciseType>(exercises[0]);
const userStore = writable<AuthModel>();

const distanceStore = writable(0);
const locationStore = writable<Array<Location>>([]);
const stepStore = writable(0);
const timeStore = writable(0);
const caloriesStore = writable(0);
const startStore = writable("");
const endStore = writable("");
const isRunningStore = writable(false);

export { isRunningStore, signUpDetailsStore, selectedExerciseStore, userStore, distanceStore, locationStore, stepStore, timeStore, caloriesStore, startStore, endStore };