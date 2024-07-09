<script lang="ts">
  // You can add any script logic here
</script>

<style>
  .signout {
    color: #FF2424;
  }
  .profile-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .progress-container {
    width: 100%;
    padding: 0 16px;
    margin-top: 16px;
  }

  .progress-bar {
    height: 8px;
    background-color: #474747;
    border-radius: 4px;
    position: relative;
    width: 100%;
  }

  .progress {
    height: 100%;
    background-color: #3498db;
    border-radius: 4px;
    width: 50%;
  }
  .vertical-line {
    width: 1px;
    background-color: #474747;
    height: 80px;
    margin: 0 16px;
  }
</style>

<div class="bg-[#1C1C1E] text-white min-h-screen p-4">
  <div class="flex items-center justify-center relative pt-4">
    <a href="/" class="absolute left-4 bg-[#474747] mb-4 opacity-70 text-white text-2xl font-semibold rounded-full w-10 h-10 flex items-center justify-center">&lt;</a>
    <h1 class="text-white text-2xl font-bold mb-4">Dashboard</h1>
  </div>
  <div class="flex flex-col items-center mt-6 w-full">
    <div class="flex items-center w-full px-4">
      <div class="profile-image">
        <img src="https://st.depositphotos.com/1144472/2003/i/950/depositphotos_20030237-stock-photo-cheerful-young-man-over-white.jpg" alt="Profile Image" />
      </div>
      <div class="vertical-line"></div>
      <p class="text-gray-400">Joined July 2024</p>
    </div>
    <div class="progress-container">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">Level 2</h2>
      </div>
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
    </div>
  </div>
  <ul class="mt-8 w-full">
    <li class="border-t border-b border-[#474747] p-4">
      <a href="/util/profile/points" class="flex justify-between items-center w-full">
        Points & Levels
        <span>&gt;</span>
      </a>
    </li>
    <li class="border-b border-[#474747] p-4">
      <a href="/util/profile/edit" class="flex justify-between items-center w-full">
        Edit Profile
        <span>&gt;</span>
      </a>
    </li>
    <li class="border-b border-[#474747] p-4">
      <a href="/util/profile/privacy" class="flex justify-between items-center w-full">
        Privacy
        <span>&gt;</span>
      </a>
    </li>
    <li class="border-b border-[#474747] p-4">
      <a href="/util/profile/settings" class="flex justify-between items-center w-full">
        Settings
        <span>&gt;</span>
      </a>
    </li>
    <li class="border-b border-[#474747] p-4">
      <a href="/util/profile" class="flex justify-between items-center w-full signout">
        Sign Out
      </a>
    </li>
  </ul>
</div>
