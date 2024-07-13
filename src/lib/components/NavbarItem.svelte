<script lang="ts">
    import { page } from "$app/stores";

    export let link: string;
</script>

<span>
    <a href={link} class="bg-black {$page.route.id?.includes(link) ? 'opacity-100' : 'opacity-60'}">
        <slot />
    </a>
</span>