<script lang="ts">
    import TimeFrameSelector from "$lib/components/TimeFrameSelector.svelte";
    import MenuButton from "$lib/components/MenuButton.svelte";

    let options: string[] = ['This week', 'Chosen day', 'This month'];
</script>

<div>
    <TimeFrameSelector options={options} selected={options[0]}></TimeFrameSelector>

    <div class="bg-black text-white p-4">

        <MenuButton href="/">
            Running

        </MenuButton>
        <MenuButton href="/">
            Cycling

        </MenuButton>
        <MenuButton href="/">
            Walking

        </MenuButton>
        <MenuButton href="/">
            Skating

        </MenuButton>
        <MenuButton href="/">
            Hiking

        </MenuButton>

    </div>
</div>
