<script lang="ts">
    import HealthDataSelector from "$lib/components/HealthDataSelector.svelte";
    const ageOffset = 0;
    const itemHeight = 60;
    const nextPage = "/auth/stage-two/health-data/weight-selection";
    const backPage = "/auth/stage-two/health-data/gender-selection";
    const selectedAge = 19;
</script>

<HealthDataSelector dataUnit="" {nextPage} {backPage} dataOffset={ageOffset} selectedData={selectedAge} {itemHeight} />