<script lang="ts">
    import ActiveExerciseInfo from "$lib/components/ActiveExerciseInfo.svelte";
    import StartExerciseButton from "$lib/components/StartExerciseButton.svelte";
    import {
        caloriesStore,
        currentActivityIdStore,
        distanceStore, endStore,
        isRunningStore,
        isUploadingExerciseStore,
        locationStore,
        pauseStartStore,
        selectedExerciseStore, startStore,
        stepStore,
        timeStore,
        totalPausedSecondsStore,
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
    import type { RecordModel } from "pocketbase";
    import { SQLiteService } from "$lib/services/sqlite";
    import { Network } from "@capacitor/network";

    const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

    let watcherId: string | null;
    let intervalId: any;
    let speed = Number(0).toFixed(1);

    async function startExercise() {
        if (watcherId && $isRunningStore) {
            return;
        }
        if (watcherId && !$isRunningStore) {
            await resumeExercise();
            return;
        }

        isRunningStore.set(true);
        await LocalNotifications.requestPermissions();
        await watchLocation();
        if (!watcherId) {
            return;
        }
        startStore.set(DateTime.now().toISO());
/*         const firstLocation = await guessLocation(5000);
        if (firstLocation) {
            $locationStore.push(firstLocation);
        } */
        trackTime();
        $currentActivityIdStore = await SQLiteService.addActivity({
            start: DateTime.now(),
            end: DateTime.now(),
            duration: 0,
            type: $selectedExerciseStore.id,
            calories: 0,
            steps: 0,
            distance: 0,
        }) ?? 0;
        alert("Please wait until we acquire your location.");
    }

    async function resumeExercise() {
        totalPausedSecondsStore.update(value => value + DateTime.now().toLocal().diff($pauseStartStore, "seconds").seconds);
        trackTime();
        isRunningStore.set(true);
    }

    function trackTime() {
        intervalId = setInterval(() => {
            if (!$isRunningStore) {
                return;
            }
            console.log($isRunningStore)
            const diff = DateTime.now().toLocal().diff(DateTime.fromISO($startStore), "seconds").seconds;
            if (diff >= 1) {
                timeStore.set(diff);
                timeStore.update(value => value - $totalPausedSecondsStore);
            }
        }, 1000);
    }

    async function stopExercise() {
        if (!watcherId) {
            return;
        }

        endStore.set(DateTime.now().toISO());
        isRunningStore.set(false);
        if (watcherId) {
            await BackgroundGeolocation.removeWatcher({
                id: watcherId,
            });

            const activity = await saveExercise()
            await SQLiteService.saveLocations($currentActivityIdStore, activity!);
            isUploadingExerciseStore.set(false);
            watcherId = null;
            clearInterval(intervalId);
        }

        distanceStore.set(0);
        stepStore.set(0);
        locationStore.set([]);
        timeStore.set(0);
        caloriesStore.set(0);
        isRunningStore.set(false);
    }

    async function watchLocation() {
        try {
            await Geolocation.checkPermissions();
        } catch (err) {
            window.alert("Please enable your location.")
            return;
        }

        let locationTimeoutId: any = setTimeout(async () => {
            alert("Location accuracy is too low, tracking will be stopped.");
            stopExercise();
        }, 120 * 1000);

        watcherId = await BackgroundGeolocation.addWatcher({
            backgroundMessage: "aktiVan is tracking your exercise.",
            backgroundTitle: "aktiVan",
            requestPermissions: true,
            stale: false,
            distanceFilter: 0,
        }, async (currLoc, err) => {
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

            if (currLoc.accuracy >= 10) {
                return;
            } else {
                if (locationTimeoutId) {
                    alert("We've successfully acquired your location.")
                    clearTimeout(locationTimeoutId);
                    locationTimeoutId = null;
                }
            }

            if (!currLoc?.speed || currLoc.speed < 0.1) {
                speed = Number(0).toFixed(1);
                return;
            }
            if (!$isRunningStore) {
                $locationStore.push(currLoc);
                return;
            }

            const stepsPerMeter = $stepStore / $distanceStore;
            speed = (currLoc.speed ?? 0).toFixed(1);
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

            if ($locationStore.length === 100) {
                await saveAllLocationsLocally();
                locationStore.set([currLoc]);
            }
        });
    }

    async function saveAllLocationsLocally() {
        for (const loc of $locationStore) {
            await SQLiteService.addLocationForActivity($currentActivityIdStore, loc);
        }
    }

    async function saveActivityLocally() {
        await SQLiteService.updateActivity({
            id: $currentActivityIdStore,
            start: DateTime.fromISO($startStore),
            end: DateTime.fromISO($endStore),
            duration: $timeStore,
            type: $selectedExerciseStore.id,
            calories: $caloriesStore,
            steps: $stepStore,
            distance: $distanceStore,
        });
    }

    // async function guessLocation(timeout: number): Promise<Location | undefined> {
    //     let lastLocation: Location | undefined;
    //     const id = await BackgroundGeolocation.addWatcher(
    //         {
    //             requestPermissions: false,
    //             stale: true
    //         },
    //         (location) => {
    //             lastLocation = location || undefined;
    //         }
    //     );
    //     setTimeout(async () => {
    //         await BackgroundGeolocation.removeWatcher({id});
    //     }, timeout);

    //     return lastLocation;
    // }

    async function pauseExercise() {
        isRunningStore.set(false);
        pauseStartStore.set(DateTime.now());
    }


    async function saveExercise() {
        console.log('Exercise stores:');
      console.log('Calories:', $caloriesStore);
      console.log('Current Activity ID:', $currentActivityIdStore);
      console.log('Distance:', $distanceStore);
      console.log('End:', $endStore);
      console.log('Is Running:', $isRunningStore);
      console.log('Location:', $locationStore);
      console.log('Pause Start:', $pauseStartStore);
      console.log('Selected Exercise:', $selectedExerciseStore);
      console.log('Start:', $startStore);
      console.log('Steps:', $stepStore);
      console.log('Time:', $timeStore);
      console.log('Total Paused Seconds:', $totalPausedSecondsStore);
        await saveActivityLocally();
        await saveAllLocationsLocally();
        console.log("Added locations locally")

        const networkStatus = await Network.getStatus();
        if (!networkStatus.connected) {
            return;
        }

        isUploadingExerciseStore.set(true);

        const activity = await pb.collection("activities").create({
            user: $userStore?.id,
            start: $startStore,
            end: DateTime.now().toISO(),
            distance: $distanceStore,
            steps: $stepStore,
            duration: $timeStore,
            type: $selectedExerciseStore.id,
            calories: $caloriesStore,
        });

        return activity;
    }

    onMount(() => {
        distanceStore.set(0);
        stepStore.set(0);
        locationStore.set([]);
        timeStore.set(0);
        caloriesStore.set(0);
    });

    onDestroy(async () => {
        stopExercise();
        if (watcherId) {
            await BackgroundGeolocation.removeWatcher({
                id: watcherId,
            });
            // await saveExercise();
            watcherId = null;
        }
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
        {#if $isRunningStore}
            <StopExerciseButton class="z-10" on:click={async () => await pauseExercise()}/>
        {:else}
            <StartExerciseButton class="z-10" on:click={async () => await startExercise()}/>
            <ExitExerciseButton class="z-10" on:click={async () => await stopExercise()}/>
        {/if}
    </div>
</main>
