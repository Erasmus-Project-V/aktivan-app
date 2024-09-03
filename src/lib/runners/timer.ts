/* import { isRunningStore, timeStore } from "$lib/stores";
import { BackgroundRunner } from "@capacitor/background-runner";

addEventListener("tick", (resolve) => {
    let isRunning = false;
    isRunningStore.subscribe(value => isRunning = value)();

    if (!isRunning) {
        return;
    }

    setTimeout(() => {
        timeStore.update(value => value + 1);

        BackgroundRunner.dispatchEvent({
            event: "tick",
            label: "eu.greenstem.aktivan.timer",
            details: {},
        });
        resolve();
    }, 1000);
}); */