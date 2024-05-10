<script lang="ts">
    export let type: "text" | "password" = "text";
    export let placeholder = "";
    export let className: string;
</script>

<div class="w-72 input-transition">
    <span class="placeholder ml-4 absolute z-10 cursor-auto text-white">{placeholder}</span>
    <input class="w-full pl-1 mt-4 input-transition z-0 placeholder-white outline-none outline text-white border-b-2 border-b-gray bg-black {className}"
           {type}>
</div>

<style lang="scss">
  .input-transition {
    position: relative;
  }

  .input-transition input:focus + span {
    font-size: 0;
    transform: translateY(-100%);
  }

  .input-transition span {
    transition: 300ms all;
  }
</style>