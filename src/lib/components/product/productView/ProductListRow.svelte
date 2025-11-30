<script lang="ts">
    import type {Product} from '$lib/types/product';
    import {Pencil} from "lucide-svelte";

    const {product} = $props<{ product: Product }>();

    const isOutOfStock = $derived(product.on_hand <= 0);

    function viewDetail() {

    }
</script>

<tr class="hover:bg-gray-50 transition-colors">

    <!-- Product Name -->
    <td class="px-4 py-4 text-sm text-gray-800">
        {product.productName}
    </td>

    <!-- Price -->
    <td class="px-4 py-4 text-sm text-gray-800">
        ${product.price.toFixed(2)}
    </td>

    <!-- Status -->
    <td class="px-4 py-4 text-sm">
        {#if isOutOfStock}
            <span class="text-red-600 font-medium">Out of Stock</span>
        {:else}
            <span class="text-green-600 font-medium">In Stock</span>
        {/if}
    </td>

    <!-- Stock Count -->
    <td class="px-4 py-4 text-sm text-gray-800">
        {product.on_hand}
    </td>

    <!-- Action -->
    <td class="px-4 py-4 text-right">
        <button
                onclick={viewDetail}
                class="p-2 rounded hover:bg-gray-200 active:scale-95 transition transform duration-100"
                aria-label="Edit"
        >
            <Pencil class="w-5 h-5 text-gray-700"/>
        </button>
    </td>
</tr>
