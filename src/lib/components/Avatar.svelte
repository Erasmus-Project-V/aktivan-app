<script lang="ts">
    export let src: any;
    export let width = "80px";
    export let height = "80px";
</script>

<div class="rounded-full overflow-hidden border border-lightgray p-1" style="width: {width}; height: {height};">
    <img {src} alt="Profile Avatar" class="size-full object-cover rounded-full"/>
</div>