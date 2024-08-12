<script lang="ts">
    import HealthDataSelector from "$lib/components/HealthDataSelector.svelte";
    import { signUpDetailsStore } from "$lib/stores";
    
    const weightOffset = 30;
    const itemHeight = 60;
    const nextPage = "/auth/stage-two/health-data/height-selection";
    const backPage = "/auth/stage-two/health-data/age-selection";
    let selectedWeight = 105;

    function onNext() {
        $signUpDetailsStore.weight = selectedWeight;
    }
</script>

<HealthDataSelector on:next={onNext} dataUnit="kg" {nextPage} {backPage} dataOffset={weightOffset} bind:selectedData={selectedWeight} {itemHeight} />
