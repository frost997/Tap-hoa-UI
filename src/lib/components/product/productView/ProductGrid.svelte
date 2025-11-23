<script lang="ts">
    import ProductCard from './ProductCard.svelte';
    import type {Product} from '$lib/types/product';
    import {ListFilterPlus} from "lucide-svelte";

    // interface Props {
    //     products-config?: Product[];
    //     loading?: boolean;
    // }

    const {productList, loading} = $props<{ productList: Product[], loading: boolean }>();

</script>
{#if loading}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each Array(8) as _, i (i)}
            <div class="card overflow-hidden animate-pulse">
                <div class="bg-gray-200 h-64 w-full"></div>
                <div class="p-4">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div class="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        {/each}
    </div>
{:else}
    {#if productList.length === 0}
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each productList as product (product._id)}
                <ProductCard {product}/>
            {/each}
        </div>
    {/if}
{/if}

