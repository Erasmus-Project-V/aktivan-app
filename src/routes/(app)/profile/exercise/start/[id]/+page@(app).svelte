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
    import { Pedometer } from "capacitor-pedometer";
    import AlertDialog from "$lib/components/AlertDialog.svelte";

    const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

    let watcherId: string | null;
    let intervalId: any;
    let speed = Number(0).toFixed(1);
    let isLocationAcquired = false;
    let isAlertOpen = false;
    let alertTitle: string;
    let alertDescription: string;

    let lastLocationTime: DateTime;

    async function startExercise() {
        const isConnected = (await Network.getStatus()).connected;

        if (!isConnected) {
            alertTitle = "No internet connection";
            alertDescription = "You must be connected to the internet to start an exercise.";
            isAlertOpen = true;
            return;
        }
        if (watcherId && $isRunningStore) {
            return;
        }
        if (watcherId && !$isRunningStore) {
            await resumeExercise();
            return;
        }

        isRunningStore.set(true);
        await Pedometer.requestPermissions();
        await LocalNotifications.requestPermissions();
        await watchLocation();
        if (!watcherId) {
            return;
        }
/*         const firstLocation = await guessLocation(5000);
        if (firstLocation) {
            $locationStore.push(firstLocation);
        } */
        trackTime();
        await trackSteps();
        $currentActivityIdStore = await SQLiteService.addActivity({
            start: DateTime.now(),
            end: DateTime.now(),
            duration: 0,
            type: $selectedExerciseStore.id,
            calories: 0,
            steps: 0,
            distance: 0,
        }) ?? 0;

        alertTitle = "Please wait";
        alertDescription = "We're acquiring your location.";
        isAlertOpen = true;
    }

    async function resumeExercise() {
        totalPausedSecondsStore.update(value => value + DateTime.now().toLocal().diff($pauseStartStore, "seconds").seconds);
        trackTime();
        isRunningStore.set(true);
    }

    async function trackSteps() {
        if (!$selectedExerciseStore.showSteps) {
            return;
        }

        // await Pedometer.requestPermission();
        await Pedometer.checkPermissions();
        console.log(await Pedometer.isAvailable());
/*        if (!(await Pedometer.isAvailable()).available) {
            alert("Pedometer is not available.");
            return;
        }*/
        await Pedometer.start();
    }

    function trackTime() {
        intervalId = setInterval(() => {
            if (!isLocationAcquired) {
                return;
            }
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

    let isSaving = false;

    async function stopExercise() {
        if (!watcherId || isSaving) {
            return;
        }

        try {
            isSaving = true;
            endStore.set(DateTime.now().toISO());
            isRunningStore.set(false);

            await BackgroundGeolocation.removeWatcher({
                id: watcherId,
            });

            const currId = $currentActivityIdStore;
            saveExercise(
              $caloriesStore,
              currId,
              $distanceStore,
              $startStore,
              $endStore,
              $locationStore,
              $selectedExerciseStore,
              $stepStore,
              $timeStore,
              $userStore?.id
            ).then(activity => {
              SQLiteService.saveLocations(currId, activity!).then(() => {
                isUploadingExerciseStore.set(false);
                isSaving = false;
              });
            });
            await Pedometer.stop();
            watcherId = null;
            clearInterval(intervalId);

            // Reset stores
            //             distanceStore.set(0);
            stepStore.set(0);
            locationStore.set([]);
            timeStore.set(0);
            caloriesStore.set(0);
            isRunningStore.set(false);
        } catch (error) {
            console.error('Error stopping exercise:', error);
        } finally {
        }
    }

    async function watchLocation() {
        try {
            await Geolocation.checkPermissions();
        } catch (err) {
            window.alert("Please enable your location.")
            return;
        }

        let locationTimeoutId: any = setTimeout(async () => {
            alertTitle = "Location not acquired";
            alertDescription = "Accuracy is too low. Please try again later.";
            isAlertOpen = true;
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
/*                if (err?.code === "NOT_AUTHORIZED") {
                    if (window.confirm(
                        "We need your location, " +
                        "but do not have permission.\n\n" +
                        "Open settings now?"
                    )) {
                        BackgroundGeolocation.openSettings();
                    }
                }*/
                return;
            }

            if (currLoc.accuracy >= 8) {
                return;
            } else {
                if (locationTimeoutId) {
                    alertTitle = "Location acquired";
                    alertDescription = "We successfully acquired your location.";
                    isAlertOpen = true;
                    startStore.set(DateTime.now().toISO());
                    clearTimeout(locationTimeoutId);
                    locationTimeoutId = null;
                    isLocationAcquired = true;
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
                if (lastLocationTime) {
                    countCalories(distance, DateTime.now().diff(lastLocationTime).as("hours"));
                }
            }
            lastLocationTime = DateTime.now();
            $locationStore.push(currLoc);

            const steps = await Pedometer.getStepCount();
            console.log(steps);
            stepStore.set(steps.steps);

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


    async function saveExercise(
        calories: number,
        currentActivityId: number,
        distance: number,
        startTime: string,
        endTime: string,
        locations: Location[],
        selectedExercise: any,
        steps: number,
        duration: number,
        userId: string
    ) {
        console.log('Exercise stores:');
        console.log('Calories:', calories);
        console.log('Current Activity ID:', currentActivityId);
        console.log('Distance:', distance);
        console.log('End:', endTime);
        console.log('Location:', locations);
        console.log('Selected Exercise:', selectedExercise);
        console.log('Start:', startTime);
        console.log('Steps:', steps);
        console.log('Time:', duration);

        await saveActivityLocally();
        await saveAllLocationsLocally();
        console.log("Added locations locally")

        const networkStatus = await Network.getStatus();
        if (!networkStatus.connected) {
            return;
        }

        isUploadingExerciseStore.set(true);

        const activity = await pb.collection("activities").create({
            user: userId,
            start: startTime,
            end: endTime,
            distance: distance,
            steps: steps,
            duration: duration,
            type: selectedExercise.id,
            calories: calories,
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

    // onDestroy(async () => {
    //     stopExercise();
    //     if (watcherId) {
    //         await BackgroundGeolocation.removeWatcher({
    //             id: watcherId,
    //         });
    //         // await saveExercise();
    //         watcherId = null;
    //     }
    // });


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

    function countCalories(deltaDistance: number, deltaTime: number) {
        const params: StepCalculatorParams = {
            distanceMeters: deltaDistance,
            sex: $userStore?.sex,
            heightCm: $userStore?.height,
            speedMS: $locationStore[$locationStore.length - 1].speed ?? 1,
            weightKg: $userStore?.weight,
            durationHours: deltaTime,
            exerciseId: $currentActivityIdStore
        };
        // stepStore.set(calculateSteps(params));
        caloriesStore.update(value => value + calculateCaloriesBurned(params));
    }
</script>

<Body class="overflow-y-hidden"/>

<AlertDialog
  bind:title={alertTitle}
  bind:description={alertDescription}
  actionLabel="Continue"
  bind:isOpen={isAlertOpen}
  onClose={() => isAlertOpen = false}
/>

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
            <span slot="unit">M/S</span>
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
