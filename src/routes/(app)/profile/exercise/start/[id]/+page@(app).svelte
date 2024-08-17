<script lang="ts">
    import ActiveExerciseInfo from "$lib/components/ActiveExerciseInfo.svelte";
    import StartExerciseButton from "$lib/components/StartExerciseButton.svelte";
    import {
        caloriesStore,
        distanceStore, endStore,
        locationStore,
        selectedExerciseStore, startStore,
        stepStore,
        timeStore,
        userStore
    } from "$lib/stores";
    import { Body } from "svelte-body";
    import ExitExerciseButton from "$lib/components/ExitExerciseButton.svelte";
    import type { BackgroundGeolocationPlugin, Location } from "@capacitor-community/background-geolocation";
    import { registerPlugin } from "@capacitor/core";
    import { onDestroy, onMount } from "svelte";
    import { LocalNotifications } from "@capacitor/local-notifications";
    import StopExerciseButton from "$lib/components/StopExerciseButton.svelte";
    import { calculateCaloriesBurned, calculateSteps, type StepCalculatorParams } from "$lib/services/exercise";
    import { pb } from "$lib/services/pocketbase";
    import { DateTime } from "luxon";
    import { Geolocation } from "@capacitor/geolocation";

    const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

    let watcherId: string | null;
    let intervalId: any | null;
    let speed = Number(0).toFixed(1);

    async function startExercise() {
        if (watcherId && intervalId) {
            return;
        }
        if (watcherId && !intervalId) {
            await resumeExercise();
            return;
        }

        await LocalNotifications.requestPermissions();
        await watchLocation();
        if (!watcherId) {
            return;
        }
        startStore.set(DateTime.now().toISO());
        const firstLocation = await guessLocation(5000);
        if (firstLocation) {
            $locationStore.push(firstLocation);
        }
        trackTime();
    }

    async function resumeExercise() {
        trackTime();
    }

    function trackTime() {
        intervalId = setInterval(() => {
            const diff = DateTime.now().toLocal().diff(DateTime.fromISO($startStore), "seconds").seconds;
            if (diff >= 1) {
                timeStore.set(diff);
            }
        }, 1000);
    }

    async function stopExercise() {
        if (!intervalId) {
            return;
        }
        if (watcherId) {
            await BackgroundGeolocation.removeWatcher({
                id: watcherId,
            });
            await saveExercise();
            watcherId = null;
        }

        distanceStore.set(0);
        stepStore.set(0);
        locationStore.set([]);
        timeStore.set(0);
        caloriesStore.set(0);
        endStore.set(DateTime.now().toISO());
        clearInterval(intervalId);
        intervalId = null
    }

    async function watchLocation() {
        try {
            await Geolocation.checkPermissions();
        } catch (err) {
            window.alert("Please enable your location.")
            return;
        }

        watcherId = await BackgroundGeolocation.addWatcher({
            backgroundMessage: "aktiVan is tracking your exercise.",
            backgroundTitle: "aktiVan",
            requestPermissions: true,
            stale: false,
            distanceFilter: 0,
        }, (currLoc, err) => {
            if (!intervalId) {
                return;
            }
            if (!currLoc || err) {
                if (err?.code === "NOT_AUTHORIZED") {
                    if (window.confirm(
                        "We need your location, " +
                        "but do not have permission.\n\n" +
                        "Open settings now?"
                    )) {
                        BackgroundGeolocation.openSettings();
                    }
                }
                return;
            }
            if (currLoc.accuracy >= 8) {
                return;
            }
            if (!currLoc?.speed || currLoc.speed < 0.1) {
                speed = Number(0).toFixed(1);
                return;
            }

            const stepsPerMeter = $stepStore / $distanceStore;
            speed = Math.round((currLoc.speed ?? 0)).toFixed(1);
            if ($locationStore.length > 0) {
                let distance: number;
                if (!currLoc.altitude || !$locationStore[$locationStore.length - 1].altitude) {
                    distance = calculateDistanceWithoutAltitude($locationStore[$locationStore.length - 1], currLoc);
                } else {
                    distance = calculateDistance($locationStore[$locationStore.length - 1], currLoc);
                }
                distanceStore.update(value => value + distance);
                countStepsAndCalories(distance);
            }
            $locationStore.push(currLoc);
        });
    }

    async function guessLocation(timeout: number): Promise<Location | undefined> {
        let lastLocation: Location | undefined;
        const id = await BackgroundGeolocation.addWatcher(
            {
                requestPermissions: false,
                stale: true
            },
            (location) => {
                lastLocation = location || undefined;
            }
        );
        setTimeout(async () => {
            await BackgroundGeolocation.removeWatcher({id});
        }, timeout);

        return lastLocation;
    }


    async function saveExercise() {
        const activity = await pb.collection("activities").create({
            user: $userStore?.id,
            start: $startStore,
            end: $endStore,
            distance: $distanceStore,
            steps: $stepStore,
            duration: $timeStore,
            type: $selectedExerciseStore.id,
            calories: $caloriesStore,
        });

        for (const loc of $locationStore) {
            await pb.collection("locations").create({
                activity: activity.id,
                latitude: loc.latitude,
                longitude: loc.longitude,
                altitude: loc.altitude,
                accuracy: loc.accuracy,
                speed: loc.speed,
                time: loc.time,
            });
        }
    }

    onDestroy(async () => {
        await stopExercise();
        if (watcherId) {
            await BackgroundGeolocation.removeWatcher({
                id: watcherId,
            });
            await saveExercise();
            watcherId = null;
        }

        distanceStore.set(0);
        stepStore.set(0);
        locationStore.set([]);
        timeStore.set(0);
        caloriesStore.set(0);
    });


    function calculateDistanceWithoutAltitude(loc1: Location, loc2: Location): number {
        const earthRadiusKm = 6371; // Earth's radius in kilometers

        const dLat = degreesToRadians(loc2.latitude - loc1.latitude);
        const dLon = degreesToRadians(loc2.longitude - loc1.longitude);

        const lat1 = degreesToRadians(loc1.latitude);
        const lat2 = degreesToRadians(loc2.latitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = earthRadiusKm * c;

        return distanceKm * 1000; // Convert to meters
    }

    function calculateDistance(loc1: Location, loc2: Location): number {
        const earthRadiusKm = 6371; // Earth's radius in kilometers

        const dLat = degreesToRadians(loc2.latitude - loc1.latitude);
        const dLon = degreesToRadians(loc2.longitude - loc1.longitude);

        const lat1 = degreesToRadians(loc1.latitude);
        const lat2 = degreesToRadians(loc2.latitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Calculate the distance along the surface of the Earth
        const surfaceDistanceKm = earthRadiusKm * c;

        // Calculate the altitude difference in kilometers
        const altitudeDifferenceKm = (loc2.altitude! - loc1.altitude!) / 1000;

        // Use the Pythagorean theorem to calculate the final 3D distance
        const distanceKm = Math.sqrt(surfaceDistanceKm * surfaceDistanceKm + altitudeDifferenceKm * altitudeDifferenceKm);

        return distanceKm * 1000; // Convert to meters
    }

    function degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    function countStepsAndCalories(deltaDistance: number) {
        const params: StepCalculatorParams = {
            distanceMeters: $distanceStore,
            sex: $userStore?.sex,
            heightCm: $userStore?.height,
            speedMS: $locationStore[$locationStore.length - 1].speed ?? 1,
            weightKg: $userStore?.weight,
        };
        stepStore.set(calculateSteps(params));
        params.distanceMeters = deltaDistance;
        caloriesStore.update(value => value + calculateCaloriesBurned(params));
    }
</script>

<Body class="overflow-y-hidden"/>

<main class="w-screen h-screen flex flex-col items-center gap-12 relative">
    <img src={$selectedExerciseStore.background} class="w-screen h-screen absolute opacity-15 z-0"
         alt="A person exercising on a hill">
    <div class="mt-8">
        {#if $selectedExerciseStore.showSteps}
            <ActiveExerciseInfo size="lg">
                <span>{$stepStore}</span>
                <span slot="unit">Steps</span>
            </ActiveExerciseInfo>
        {:else}
            <ActiveExerciseInfo size="lg">
                <span>{Math.round($distanceStore)}</span>
                <span slot="unit">Meters</span>
            </ActiveExerciseInfo>
        {/if}
    </div>
    <div class="grid grid-cols-2 gap-8">
        <ActiveExerciseInfo size="md">
            <span>{Math.trunc(($timeStore / 3600)).toString().padStart(2, "0")}:{Math.trunc((($timeStore % 3600) / 60)).toString().padStart(2, "0")}:{Math.trunc(($timeStore % 60)).toString().padStart(2, "0")}</span>
            <span slot="unit">Time</span>
        </ActiveExerciseInfo>
        {#if $selectedExerciseStore.showSteps}
            <ActiveExerciseInfo size="md">
                <span>{Math.round($distanceStore)}</span>
                <span slot="unit">Meters</span>
            </ActiveExerciseInfo>
        {/if}
        <ActiveExerciseInfo size="md">
            <span>{speed}</span>
            <span slot="unit">Tempo</span>
        </ActiveExerciseInfo>
        <ActiveExerciseInfo class="{$selectedExerciseStore.showSteps ? '' : 'col-span-2 justify-self-center'}"
                            size="md">
            <span>{Math.round($caloriesStore)}</span>
            <span slot="unit">Calories</span>
        </ActiveExerciseInfo>
    </div>
    <div class="flex flex-row mt-16 gap-4">
        {#if intervalId}
            <StopExerciseButton class="z-10" on:click={async () => await stopExercise()}/>
        {:else}
            <StartExerciseButton class="z-10" on:click={async () => await startExercise()}/>
            <ExitExerciseButton class="z-10"/>
        {/if}
    </div>
</main>
