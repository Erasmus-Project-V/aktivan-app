<script lang="ts">
    export let selected = false;
    export let disabled = false;
    export let day: string;
    export let dayInMonth: number;
</script>

<button on:click disabled={disabled || null} class="{disabled ? 'opacity-50' : ''} w-10 h-16 p-4 flex flex-col gap-2 justify-center rounded-full items-center {selected ? 'text-black bg-blue' : 'text-white bg-lightgray' } font-open-sans {$$props.class}">
    <span class="text-xs font-semibold">{day}</span>
    <span class="text-base font-semibold">{dayInMonth}</span>
</button>