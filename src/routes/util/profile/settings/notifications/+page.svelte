<script lang="ts">
  let motivationalNotifications = false;
  let friendNotifications = false;

  function toggleNotification(type: string) {
    if (type === 'motivational') {
      motivationalNotifications = !motivationalNotifications;
      console.log('Motivational Notifications:', motivationalNotifications);
    } else if (type === 'friend') {
      friendNotifications = !friendNotifications;
      console.log('Friend Notifications:', friendNotifications);
    }
  }
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
</style>

<div class="bg-black text-white min-h-screen p-4">
  <div class="flex items-center justify-center relative pt-4">
    <a href="/util/profile/settings" class="absolute left-4 bg-[#474747] mb-4 opacity-70 text-white text-2xl font-semibold rounded-full w-10 h-10 flex items-center justify-center">&lt;</a>
    <h1 class="text-white text-2xl font-bold mb-4">Notifications</h1>
  </div>
  <ul class="mt-4">
    <li class="border-t border-b border-[#474747] p-4">
      <button class="flex justify-between items-center w-full" on:click={() => toggleNotification('motivational')}>
        Motivational Notifications
        <span class="switch">
          <input type="checkbox" bind:checked={motivationalNotifications}>
          <span class="slider"></span>
        </span>
      </button>
    </li>
    <li class="border-b border-[#474747] p-4">
      <button class="flex justify-between items-center w-full" on:click={() => toggleNotification('friend')}>
        Friend Notifications
        <span class="switch">
          <input type="checkbox" bind:checked={friendNotifications}>
          <span class="slider"></span>
        </span>
      </button>
    </li>
  </ul>
</div>
