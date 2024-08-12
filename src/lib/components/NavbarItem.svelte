<script lang="ts">
    import { page } from "$app/stores";

    export let link: string;
    export let isShow: boolean;
</script>

<span>
    <a href={link} class="bg-black {isShow ? 'opacity-100' : 'opacity-30'}">
        <slot />
    </a>
</span>