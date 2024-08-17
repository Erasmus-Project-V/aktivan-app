<script lang="ts">
    import ChosenDayDate from "$lib/components/ChosenDayDate.svelte";
    import ChosenDayMonthArrowSelector from "$lib/components/ArrowButton.svelte";
    import { goto } from "$app/navigation";
    import { DateTime, Info } from "luxon";
    import ForwardArrowIcon from "$lib/components/icons/ForwardArrowIcon.svelte";
    import BackArrowIcon from "$lib/components/icons/BackArrowIcon.svelte";
    import type { LayoutData } from "./$types";
    import type { RecordModel } from "pocketbase";

    export let data: LayoutData;

    let selectedYear: number = DateTime.now().year;
    let selectedMonth: number = DateTime.now().month;
    let selectedDay: number | null;

    let currentDate: DateTime;
    let daysInMonth: number;

    let activitiesThisMonth: Array<RecordModel> = [];

    console.log(data.activities);
    $: {
        activitiesThisMonth = data.activities.filter((activity: any) => {
            const activityDate = DateTime.fromSQL(activity.start).toLocal();
            return activityDate.month === selectedMonth && activityDate.year === selectedYear;
        });
    }

    console.log(activitiesThisMonth);

    $: {
        currentDate = DateTime.fromObject({
            year: selectedYear,
            month: selectedMonth,
            day: selectedDay ? selectedDay : 1
        }).toLocal();

        daysInMonth = currentDate.daysInMonth!;
    }

    function onSelectedDayChange(date: DateTime) {
        selectedDay = date.day;
        goto(`/profile/exercise/stats/chosen-day/${date.day}-${date.month}-${date.year}`);
    }

    function goBack() {
        goto("/profile/exercise/stats/chosen-day/");
        selectedDay = null;
        selectedMonth -= 1;
        if (selectedMonth === 0) {
            selectedMonth = 12;
            selectedYear -= 1;
        }
        if (selectedYear < 1900) {
            selectedYear = DateTime.now().toLocal().year;
            selectedMonth = DateTime.now().toLocal().month;
        }
    }

    function goForward() {
        goto("/profile/exercise/stats/chosen-day/");
        selectedDay = null;
        selectedMonth += 1;
        if (selectedMonth === 13) {
            selectedMonth = 1;
            selectedYear += 1;
        }
        if (selectedYear > DateTime.now().toLocal().year || selectedMonth > DateTime.now().toLocal().month) {
            selectedYear = DateTime.now().toLocal().year;
            selectedMonth = DateTime.now().toLocal().month;
        }
    }

    $: forwardButtonDisabled = selectedYear >= DateTime.now().toLocal().year && selectedMonth >= DateTime.now().toLocal().month;
</script>

<div class="-mt-4 h-40 w-screen bg-gray flex flex-col gap-2 items-center rounded-b-3xl {$$props.class}">
    <div class="w-full px-3 py-2 flex flex-row items-center justify-between m-2 text-white font-open-sans font-semibold">
        <ChosenDayMonthArrowSelector on:click={goBack}>
            <BackArrowIcon/>
        </ChosenDayMonthArrowSelector>
        <span>{Info.months().at(selectedMonth - 1)} {selectedYear}</span>
        <ChosenDayMonthArrowSelector disabled={forwardButtonDisabled} on:click={goForward}>
            <ForwardArrowIcon/>
        </ChosenDayMonthArrowSelector>
    </div>
    <div class="w-full flex flex-row gap-3 items-center overflow-x-scroll">
        {#each Array.from({length: currentDate.daysInMonth}, (_, i) => i + 1) as day}
            <ChosenDayDate
                    disabled={!activitiesThisMonth.find((activity) => DateTime.fromSQL(activity.start).toLocal().day === day)}
                    on:click={() => onSelectedDayChange(DateTime.fromObject({ year: selectedYear, month: selectedMonth, day: day }).toLocal())}
                    selected={day === selectedDay} dayInMonth={day}
                    day={DateTime.fromObject({ year: selectedYear, month: selectedMonth, day: day }).toLocal().weekdayShort?.at(0)}></ChosenDayDate>
        {/each}
        <!--<ChosenDayDate></ChosenDayDate>-->
    </div>
</div>

<slot />