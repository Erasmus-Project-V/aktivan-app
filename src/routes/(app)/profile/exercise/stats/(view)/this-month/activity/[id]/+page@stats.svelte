<script lang="ts">
    import BackNavBar from "$lib/components/BackNavBar.svelte";
    import runningBg from "$lib/assets/backgrounds/running-square.png";
    import TwoBlockExerciseInfo from "$lib/components/TwoBlockExerciseInfo.svelte";

    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Aug`),
                datasets: [{
                    // label: 'Steps',
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 300),
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

<BackNavBar backPath="/profile/exercise/stats/this-week/">
    <span slot="first" class="font-semibold">Running</span>
    <span slot="second" class="text-blue">August 2024</span>
</BackNavBar>

<main class="p-4 flex flex-col items-center relative gap-20 overflow-y-auto overflow-x-hidden">
    <img src={runningBg} alt="A person running." class="w-10/12">
    <div class="bg-gray rounded-3xl bg-opacity-60 w-11/12 h-72 z-10 absolute mt-24"></div>
    <TwoBlockExerciseInfo class="self-start" blockOneUnit="Steps" blockOneValue={320} blockTwoUnit="Calories"
                          blockTwoValue={1556}/>
    <span class="p-3 self-start mt-32 absolute z-20 text-white text-opacity-30 font-open-sans font-semibold uppercase">Steps</span>
    <canvas bind:this={canvas} class="p-3 w-10/12 h-64 mt-44 absolute z-20"></canvas>
</main>