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
    metTable: Array<{ maxSpeed: number; met: number }>;
}

export const exercises = Array<ExerciseType>(
    {
        name: "Running",
        id: "running",
        background: runningBg,
        squareBackground: runningSquareBg,
        showSteps: true,
        metTable: [{'maxSpeed': 6.8, 'met': 6.5}, {'maxSpeed': 7.7, 'met': 7.8}, {
            'maxSpeed': 8.4,
            'met': 8.5
        }, {'maxSpeed': 9.3, 'met': 9.0}, {'maxSpeed': 10.1, 'met': 9.3}, {
            'maxSpeed': 10.8,
            'met': 10.5
        }, {'maxSpeed': 11.3, 'met': 11.0}, {'maxSpeed': 12.1, 'met': 11.8}, {
            'maxSpeed': 12.9,
            'met': 12.0
        }, {'maxSpeed': 13.8, 'met': 12.5}, {'maxSpeed': 14.5, 'met': 13.0}, {
            'maxSpeed': 15.4,
            'met': 14.8
        }, {'maxSpeed': 16.1, 'met': 14.8}, {'maxSpeed': 17.7, 'met': 16.8}, {
            'maxSpeed': 19.3,
            'met': 18.5
        }, {'maxSpeed': 20.9, 'met': 19.8}, {'maxSpeed': Infinity, 'met': 23.0}]
    },
    {
        name: "Walking",
        id: "walking",
        background: walkingBg,
        squareBackground: walkingSquareBg,
        showSteps: true,
        metTable: [{'maxSpeed': 4.0, 'met': 3.3}, {'maxSpeed': 5.5, 'met': 3.8}, {
            'maxSpeed': 6.3,
            'met': 4.8
        }, {'maxSpeed': 7.1, 'met': 5.5}, {'maxSpeed': 7.9, 'met': 7.0}, {'maxSpeed': 8.9, 'met': 8.5}]
    },
    {
        name: "Hiking",
        id: "hiking",
        squareBackground: hikingSquareBg,
        background: hikingBg,
        showSteps: true,
        metTable: [{'maxSpeed': Infinity, 'met': 6.0}]
    },
    {
        name: "Cycling",
        id: "cycling",
        background: cyclingBg,
        squareBackground: cyclingSquareBg,
        showSteps: false,
        metTable: [{'maxSpeed': 8.9, 'met': 3.5}, {'maxSpeed': 15.1, 'met': 5.8}, {
            'maxSpeed': 19.2,
            'met': 6.8
        }, {'maxSpeed': 22.4, 'met': 8.0}, {'maxSpeed': 25.6, 'met': 10.0}, {
            'maxSpeed': 30.6,
            'met': 12.0
        }, {'maxSpeed': Infinity, 'met': 16.8}]
    },
    {
        name: "Skating",
        id: "skating",
        squareBackground: skatingSquareBg,
        background: skatingBg,
        showSteps: false,
        metTable: [
            {'maxSpeed': Infinity, 'met': 7.0},
        ]
    }
);
