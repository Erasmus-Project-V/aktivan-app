<script lang="ts">
    export let role: string;
    export let name: string;
</script>

<div class="font-advent">
    <span class="flex items-center justify-center relative mb-2">
        {role}
    </span>
    <span class="flex items-center justify-center relative font-semibold mb-8">
        {name}
    </span>
</div>
