<script lang="ts">
    import type { BackgroundGeolocationPlugin, Location } from "@capacitor-community/background-geolocation";
    import {
        Geolocation,
        type GeolocationPermissionType,
        type GeolocationPluginPermissions,
        type Position
    } from "@capacitor/geolocation";
    import { LocalNotifications } from "@capacitor/local-notifications";

    import { registerPlugin } from "@capacitor/core";
    import { onMount } from "svelte";
    import { type Acceleration, Motion } from "@capacitor/motion";

    const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

    let locs: Array<Position | Location> = [];
    let distance = 0;

    onMount(() => {
        LocalNotifications.checkPermissions();
        LocalNotifications.requestPermissions();
        const perms = ["location" as GeolocationPermissionType] as unknown as GeolocationPluginPermissions;

        // Geolocation.requestPermissions(perms);
        // Geolocation.checkPermissions(perms);
        /*        Geolocation.watchPosition({
                    enableHighAccuracy: true,
                    maximumAge: 1000,
                }, (pos, err) => {
                    if (err) {
                        return;
                    }
                    if (locs.length > 0) {
                        distance = distance + getDistanceFromLatLonInKm(locs[locs.length - 1].coords?.latitude, locs[locs.length - 1].coords?.longitude, pos!.coords!.latitude, pos!.coords!.longitude);
                    }
                    if (pos) {
                        locs.push(pos!);
                        locs = locs;
                    }
                });*/

        Geolocation.requestPermissions(perms);
        // Geolocation.checkPermissions();
    });

    let text = "";

    function startTracking() {
        const perms = ["location" as GeolocationPermissionType] as unknown as GeolocationPluginPermissions;
        Geolocation.requestPermissions(perms);
        Geolocation.checkPermissions();

        /*        (async () => {
                    try {
                        const result = await (DeviceMotionEvent  as any).requestPermission();
                    } catch (e) {
                        alert(`Error getting permission: ${e}`);
                        return;
                    }

        /!*            await Motion.addListener('accel', event => {
                        // alert(event.acceleration);
                        accel = event.acceleration;
                        // console.log('Device motion event:', event);
                    });*!/
                })();*/

        /*        window.addEventListener("devicemotion", event => {
                    // console.log(event);
                    text = event.acceleration;
                }, true);*/

        BackgroundGeolocation.addWatcher({
            backgroundMessage: "Running",
            backgroundTitle: "Go outside",
            requestPermissions: true,
            stale: true,
            distanceFilter: 1,
        }, (location, err) => {
            if (err) {
                if (err.code === "NOT_AUTHORIZED") {
                    if (window.confirm(
                        "This app needs your location, " +
                        "but does not have permission.\n\n" +
                        "Open settings now?"
                    )) {
                        // It can be useful to direct the user to their device's
                        // settings when location permissions have been denied. The
                        // plugin provides the 'openSettings' method to do exactly
                        // this.
                        BackgroundGeolocation.openSettings();
                    }
                }
                return console.error(err);
            }

            /*            track = track + 1;
                        // text = accel;
                        if (!accel) {
                            return;
                        }
                        if (accel?.x < 0.01 && accel?.y < 0.01 && accel?.z < 0.01) {
                            return;
                        }*/
            if (!location) {
                return;
            }
            if (location?.accuracy > 10) {
                return;
            }
            if (locs.length > 0) {
                distance = distance + getDistanceFromLatLonInKm(location!.latitude, location!.longitude, locs[locs.length - 1].latitude, locs[locs.length - 1].longitude);
            }
            text = `${location.accuracy}`;
            locs.push(location);
            locs = locs;

        });
    }

    function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }
</script>

<h1>Distance: {Math.round(distance * 1000)} m</h1>
<h1>Size: {locs.length}</h1>
<h1>{text}</h1>
<button on:click={startTracking}>Track</button>

<style>
    button {
        width: 50px;
        height: 50px;
    }
    h1 {
        font-family: sans-serif;
    }

    button:active {
        background-color: blue;
    }
</style>