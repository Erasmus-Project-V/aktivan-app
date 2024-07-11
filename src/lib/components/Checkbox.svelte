<script lang="ts">
    export let checked = false;
</script>

<div class="relative w-14 h-6 rounded-full bg-lightergray has-[:checked]:bg-blue transition-all duration-500 flex items-center px-1">
    <input class="peer opacity-0 size-full absolute cursor-pointer" type="checkbox" bind:checked={checked}>
    <span class="w-4 h-4 peer-checked:translate-x-8 rounded-full bg-white duration-500 transition-all top-1 left-2"></span>
</div>

