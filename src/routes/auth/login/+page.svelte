<script lang="ts">
    import bg from "$lib/assets/login-background.png";
    import Input from "$lib/components/Input.svelte";
</script>

<div class="z-10">
    <img src={bg} alt="A man running.">
</div>

<main class="mt-5">
    <form action="" class="flex flex-col justify-center items-center gap-5">
        <Input className="w-10/12" type="text" placeholder="Email or username"/>
        <Input className="w-10/12" type="password" placeholder="Password"/>
    </form>
</main>