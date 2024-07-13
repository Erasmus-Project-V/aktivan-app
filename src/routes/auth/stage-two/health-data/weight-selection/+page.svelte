<script lang="ts">
    import HealthDataSelector from "$lib/components/HealthDataSelector.svelte";
    
    const weightOffset = 30;
    const itemHeight = 60;
    const nextPage = "/auth/stage-two/health-data/height-selection";
    const backPage = "/auth/stage-two/health-data/age-selection";
    const selectedWeight = 75;
</script>

<HealthDataSelector dataUnit="kg" {nextPage} {backPage} dataOffset={weightOffset} selectedData={selectedWeight} {itemHeight} />
