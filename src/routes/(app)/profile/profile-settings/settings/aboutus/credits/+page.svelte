<script lang="ts">
    import BackHeader from "$lib/components/BackHeader.svelte";
    import PersonCredit from "$lib/components/PersonCredit.svelte";

    const persons = [
        {
            name: "Gabriel Janđel",
            role: "Team Leader & Chief Software Engineer"
        },
        {
            name: "Fran Glušac",
            role: "Chief Designer & Marketing Lead"
        },
        {
            name: "Karlo Vizec",
            role: "DevOps & Full-stack Software Engineer"
        },
        {
            name: "Sven Matković",
            role: "Front-end Software Engineer"
        },
        {
            name: "Sven Matić",
            role: "Front-end Software Engineer"
        },
        {
            name: "Fran Češljaš",
            role: "Front-end Software Engineer"
        },
        {
            name: "Filip Sekelj",
            role: "Front-end Software Engineer"
        }
    ];
</script>

<div class="bg-black flex flex-col p-4 text-gray-300">
    <BackHeader href="/profile/profile-settings/settings/aboutus" class="mt-4 mb-8">Credits</BackHeader>
    <div class="text-white">
        {#each persons as { role, name }}
            <PersonCredit {role} {name} />
        {/each}
    </div>
</div>
