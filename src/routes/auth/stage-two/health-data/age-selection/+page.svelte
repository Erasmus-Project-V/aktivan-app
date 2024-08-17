<script lang="ts">
    import HealthDataSelector from "$lib/components/HealthDataSelector.svelte";
    import { signUpDetailsStore } from "$lib/stores";
    const ageOffset = 0;
    const itemHeight = 60;
    const nextPage = "/auth/stage-two/health-data/weight-selection";
    const backPage = "/auth/stage-two/health-data/gender-selection";
    let selectedAge = 19;

    function onNext() {
        $signUpDetailsStore.age = selectedAge;
    }
</script>

<HealthDataSelector on:next={onNext} dataUnit="Age" {nextPage} {backPage} dataOffset={ageOffset} bind:selectedData={selectedAge} {itemHeight} />