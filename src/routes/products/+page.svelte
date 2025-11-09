<script lang="ts">
    import Product from "$lib/components/product/user/Product.svelte";

</script>

<svelte:head>
    <title>Products - {import.meta.env.VITE_APP_NAME || 'Store'}</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-8">
    <Product/>
</div>