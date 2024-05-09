<script lang="ts">
    export let type: "text" | "password" = "text";
    export let placeholder = "";
    export let className: string;
</script>

<!--<input type="text">-->
<input class="placeholder-white border-b-2 border-b-gray bg-black {className}" {type} {placeholder}>

<style lang="postcss">

</style>