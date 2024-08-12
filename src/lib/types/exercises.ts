import runningBg from "$lib/assets/backgrounds/running.png";
import walkingBg from "$lib/assets/backgrounds/walking.png";
import hikingBg from "$lib/assets/backgrounds/hiking.png";
import cyclingBg from "$lib/assets/backgrounds/cycling.png";
import skatingBg from "$lib/assets/backgrounds/skating.png";

export interface ExerciseType {
    name: string;
    id: string;
    background: any;
    showSteps: boolean;
}

export const exercises = Array<ExerciseType>(
    {
        name: "Running",
        id: "running",
        background: runningBg,
        showSteps: true,
    },
    {
        name: "Walking",
        id: "walking",
        background: walkingBg,
        showSteps: true,
    },
    {
         name: "Hiking",
         id: "hiking",
         background: hikingBg,
         showSteps: true,
    },
    {
         name: "Cycling",
         id: "cycling",
         background: cyclingBg,
         showSteps: false,
    },
    {
        name: "Skating",
        id: "skating",
        background: skatingBg,
        showSteps: false,
    }
);
