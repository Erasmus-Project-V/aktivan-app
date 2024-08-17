import runningBg from "$lib/assets/backgrounds/running.png";
import walkingBg from "$lib/assets/backgrounds/walking.png";
import hikingBg from "$lib/assets/backgrounds/hiking.png";
import cyclingBg from "$lib/assets/backgrounds/cycling.png";
import skatingBg from "$lib/assets/backgrounds/skating.png";
import runningSquareBg from "$lib/assets/backgrounds/running-square.png";
import walkingSquareBg from "$lib/assets/backgrounds/walking-square.png";
import hikingSquareBg from "$lib/assets/backgrounds/hiking-square.png";
import cyclingSquareBg from "$lib/assets/backgrounds/cycling-square.png";
import skatingSquareBg from "$lib/assets/backgrounds/skating-square.png";

export interface ExerciseType {
    name: string;
    id: string;
    background: any;
    squareBackground: any;
    showSteps: boolean;
}

export const exercises = Array<ExerciseType>(
    {
        name: "Running",
        id: "running",
        background: runningBg,
        squareBackground: runningSquareBg,
        showSteps: true,
    },
    {
        name: "Walking",
        id: "walking",
        squareBackground: walkingSquareBg,
        background: walkingBg,
        showSteps: true,
    },
    {
         name: "Hiking",
         id: "hiking",
        squareBackground: hikingSquareBg,
         background: hikingBg,
         showSteps: true,
    },
    {
         name: "Cycling",
         id: "cycling",
        squareBackground: cyclingSquareBg,
         background: cyclingBg,
         showSteps: false,
    },
    {
        name: "Skating",
        id: "skating",
        squareBackground: skatingSquareBg,
        background: skatingBg,
        showSteps: false,
    }
);
