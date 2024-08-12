<script>
    import { Body } from "svelte-body";
    import ExerciseHistoryNavBar from "$lib/components/ExerciseHistoryNavBar.svelte";
    import ExerciseHistoryOption from "$lib/components/ExerciseHistoryOption.svelte";
</script>

<Body class="overflow-y-hidden"/>

<ExerciseHistoryNavBar>
    <ExerciseHistoryOption link="/profile/exercise/stats/this-week">
        This week
    </ExerciseHistoryOption>
    <ExerciseHistoryOption link="/profile/exercise/stats/chosen-day">
        Chosen day
    </ExerciseHistoryOption>
    <ExerciseHistoryOption link="/profile/exercise/stats/this-month">
        This month
    </ExerciseHistoryOption>
</ExerciseHistoryNavBar>

<slot/>