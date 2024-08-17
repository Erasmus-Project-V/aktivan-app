<script lang="ts">
    import BackNavBar from "$lib/components/BackNavBar.svelte";
    import runningBg from "$lib/assets/backgrounds/running-square.png";
    import TwoBlockExerciseInfo from "$lib/components/TwoBlockExerciseInfo.svelte";

    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { DateTime, Info } from "luxon";
    import { exercises } from "$lib/types/exercises";
    import { page } from "$app/stores";

    export let data: PageData;

    let perDay: Map<number, number> = new Map();
    let totalDistance = 0;
    let totalCalories = 0;

    let canvas: HTMLCanvasElement;

    function findExerciseById(id: string) {
        return exercises.find(exercise => exercise.id === id);
    }

    onMount(() => {
        let labels: string[] = [];

        data.activities.forEach(activity => {
            totalDistance += activity.distance;
            totalCalories += activity.calories;
            // group activities by weekday
            const start = DateTime.fromSQL(activity.start).toLocal();
            perDay.set(start.day, (perDay.get(start.day!) ?? 0) + activity.distance);


            labels = Array.from({ length: start.daysInMonth! }).map((_, i) => (i + 1).toString());
        });

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    // label: 'Steps',
                    data: Array.from(perDay.values()),
                    borderColor: '#5996B9',
                    tension: 0.4,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                    },
                    x: {
                        grid: {
                            display: false
                        },
                    }
                }
            }
        });
    });
</script>

<BackNavBar backPath="/profile/exercise/stats/this-month">
    <span slot="first" class="font-semibold">{findExerciseById($page.params.type)?.name}</span>
    <span slot="second" class="text-blue">{data.firstDayInMonth.day} {data.firstDayInMonth.monthShort} - {data.lastDayInMonth.day} {data.lastDayInMonth.monthShort}</span>
</BackNavBar>

<main class="p-4 flex flex-col items-center relative gap-20 overflow-y-auto overflow-x-hidden">
    <img src={findExerciseById($page.params.type)?.squareBackground} alt="A person doing exercise." class="w-10/12">
    <div class="bg-gray rounded-3xl bg-opacity-60 w-11/12 h-72 z-10 absolute mt-24"></div>
    <TwoBlockExerciseInfo class="self-start" blockOneUnit="Meters" blockOneValue={Math.round(totalDistance)} blockTwoUnit="Calories"
                          blockTwoValue={Math.round(totalCalories)}/>
    <span class="p-3 self-start mt-32 absolute z-20 text-white text-opacity-30 font-open-sans font-semibold uppercase">Meters</span>
    <canvas bind:this={canvas} class="p-3 w-10/12 h-64 mt-44 absolute z-20"></canvas>
</main>