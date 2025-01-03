<script lang="ts">
  export let title: string = "Activity Completed!"
  export let description: string = "Great job! You've finished your workout session."
  export let actionLabel: string = "Close"
  export let isOpen: boolean = true
  export let onClose: () => void = () => {}

  let dialogEl: HTMLDialogElement

  $: if (isOpen && dialogEl) {
    dialogEl.showModal()
  }

  function handleClose() {
    isOpen = false
    onClose()
    dialogEl?.close()
  }

  // Handle click outside
  function handleOutsideClick(event: MouseEvent) {
    if (event.target === dialogEl) {
      handleClose()
    }
  }

  // Clean up on destroy
  import { onDestroy } from 'svelte'
  onDestroy(() => {
    dialogEl?.close()
  })
</script>

<dialog
  bind:this={dialogEl}
  class="backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 bg-opacity-0 bg-[transparent] border-0 outline-none"
  on:click={handleOutsideClick}
>
  <div
    class="dark w-full max-w-[320px] rounded-2xl bg-[#1c1c1c] text-white shadow-xl"
    on:click|stopPropagation
  >
    <!-- Header -->
    <div class="p-6">
      <h2 class="text-lg font-semibold text-white mb-2">
        {title}
      </h2>
      <p class="text-[#a0a0a0] text-sm">
        {description}
      </p>
    </div>

    <!-- Footer -->
    <div class="p-4 pt-0">
      <button
        on:click={handleClose}
        class="w-full py-3 px-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-xl transition-colors"
      >
        {actionLabel}
      </button>
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    animation: fade-in 0.15s ease-out;
  }

  dialog[open] {
    animation: slide-up 0.15s ease-out;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  dialog {
    margin: auto;
  }
</style>
