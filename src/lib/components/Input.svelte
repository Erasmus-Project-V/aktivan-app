<script lang="ts">
    export let type: "text" | "password" = "text";
    export let placeholder = "";
    export let className: string;
    export let value = "";

    let input: HTMLInputElement;
</script>

<div class="group w-72 input-transition relative">
    <span class="absolute top-0 right-3">
        <slot/>
    </span>
    <input bind:this={input} on:change={() => value = input?.value} value={value} class="peer py-2 w-full input-transition placeholder-white outline-none text-white border-b-2 border-b-gray bg-black {className}"
           {type}>
    <span class="peer-focus:text-[0] {value.length > 0 ? 'text-[0]' : ''} absolute ml-[-17.5rem] placeholder cursor-auto text-white">{placeholder}</span>
</div>

<style lang="postcss">

  .input-transition span {
    transition: 250ms all;
  }
</style>