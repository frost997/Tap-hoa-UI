<script>
    import AuthSlider from '$lib/components/auth/AuthSlider.svelte';

    export let data;       // ✅ correct way
    export let Component;  // ✅ correct way
</script>

<AuthSlider child={Component}/>