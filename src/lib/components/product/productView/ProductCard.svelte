<script lang="ts">
    import {cartStore} from '$lib/stores/cart.js';
    import {uiStore} from '$lib/stores/ui.js';
    import type {Product} from '$lib/types/product';
    import {ShoppingCart} from "lucide-svelte";

    export let product: Product;

    function addToCart() {
        cartStore.addItem(product, 1);
        uiStore.addToast(`${product.productName} added to cart!`, 'success');
    }

    // Calculate discount percentage if comparePrice exists
    // $: discountPercent = products-config.comparePrice
    //     ? Math.round(((products-config.comparePrice - products-config.price) / products-config.comparePrice) * 100)
    //     : 0;
</script>

<div
        class="
        bg-white
        border border-gray-300
        rounded-lg
        overflow-hidden
        shadow-sm
        transition-all
        duration-200
    "
>
    <!-- Image Wrapper with padding and gray background -->
    <div class="p-3">
        <div class="bg-gray-100 rounded-md aspect-square p-2 flex items-center justify-center">
            <img
                    src={product.imageURL}
                    alt={product.productName}
                    class="max-w-full max-h-full object-contain"
            />
        </div>
    </div>

    <!-- Content -->
    <div class="px-4 pb-4">
        <!-- Product Name -->
        <h3 class="font-semibold text-gray-900 mb-2">
            {product.productName}
        </h3>

        <!-- 2-column Attributes -->
        <div class="grid grid-cols-2 text-sm text-gray-600 mb-2">
            {#if product?.on_hand > 0}
                <div>
                    Avail: <span class="font-semibold">{product.on_hand}</span></div>
            {:else}
                <div>Out of Stock</div>
            {/if}
        </div>

        <!-- Price -->
        <div class="text-xl font-bold text-gray-900 mb-3">
            ${product.price}
        </div>

        <!-- Add to Cart Button -->
        <button
                onclick={addToCart}
                class="
                w-full
                flex items-center justify-center gap-2
                bg-blue-600
                text-white
                py-2
                rounded-md
                hover:bg-blue-700
                transition
            "
        >
            <ShoppingCart class="w-5 h-5"/>
            Add to cart
        </button>
    </div>
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>