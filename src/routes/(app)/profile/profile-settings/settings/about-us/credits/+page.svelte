<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import PersonCredit from "$lib/components/PersonCredit.svelte";

    const currentPersons = [
        {
            name: "Karlo Vizec",
            role: "Team Lead & Full-stack Software Engineer"
        },
        {
            name: "Fran Glušac",
            role: "Chief Designer & Marketing Lead"
        },
        {
            name: "Fran Češljaš",
            role: "Front-end Software Engineer"
        }
    ];

    const formerPersons = [
      {
          name: "Gabriel Janđel",
          role: "Team Leader & Chief Software Engineer"
      },
      {
          name: "Sven Matić",
          role: "Front-end Software Engineer"
      },
      {
          name: "Filip Sekelj",
          role: "Front-end Software Engineer"
      },
      {
          name: "Sven Matković",
          role: "Front-end Software Engineer"
      },
    ];
</script>

<div class="bg-black justify-center items-center flex flex-col p-4 text-gray-300">
    <BackHeader href="/profile/profile-settings/settings/about-us" class="mt-4 mb-8">Credits</BackHeader>
    <div class="text-white">
        <div class="flex justify-center">
            <h2 class="text-lg font-semibold mb-3">Current Team Members</h2>
        </div>
        {#each currentPersons as { role, name }}
            <PersonCredit {role} {name} />
        {/each}
        <div class="flex justify-center">
            <h2 class="text-lg font-semibold mb-3">Former Team Members</h2>
        </div>
        {#each formerPersons as { role, name }}
            <PersonCredit {role} {name} />
        {/each}
    </div>
</div>
