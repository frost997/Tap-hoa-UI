<script lang="ts">
    import ProductListRow from './ProductListRow.svelte';
    import type {Product} from '$lib/types/product';

    const {productList, loading} = $props<{
        productList: Product[],
        loading: boolean
    }>();
</script>

<div class="overflow-x-auto bg-white border border-gray-200 rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">

        <!-- Header -->
        <thead class="bg-gray-50">
        <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Product Name</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Price</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Stock</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">Action</th>
        </tr>
        </thead>

        <!-- Loading -->
        {#if loading}
            <tbody>
            {#each Array(5) as _, i (i)}
                <tr class="animate-pulse">
                    <td class="px-4 py-4">
                        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                    </td>
                    <td class="px-4 py-4">
                        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                    </td>
                    <td class="px-4 py-4 text-right">
                        <div class="h-8 bg-gray-200 rounded w-20"></div>
                    </td>
                </tr>
            {/each}
            </tbody>

        {:else if productList.length === 0}
            <tbody>
            <tr>
                <td colspan="5" class="px-4 py-10 text-center text-gray-500">
                    No products found
                </td>
            </tr>
            </tbody>

        {:else}
            <tbody class="divide-y divide-gray-200">
            {#each productList as product (product._id)}
                <ProductListRow {product}/>
            {/each}
            </tbody>
        {/if}
    </table>
</div>
