<script lang="ts">
    import {cartStore} from '$lib/stores/cart.js';
    import {uiStore} from '$lib/stores/ui.js';
    import type {Product} from '$lib/types/product';

    export let product: Product;

    function addToCart() {
        cartStore.addItem(product, 1);
        uiStore.addToast(`${product.name} added to cart!`, 'success');
    }

    // Calculate discount percentage if comparePrice exists
    // $: discountPercent = products.comparePrice
    //     ? Math.round(((products.comparePrice - products.price) / products.comparePrice) * 100)
    //     : 0;
</script>

<div class="card overflow-hidden group">
    <!-- Image -->
    <a href="/products/{product.id}" class="block relative overflow-hidden bg-gray-100">
        <img
                src={product.imageURL?.[0]?.url || '/placeholder-products.jpg'}
                alt={product.productName}
                class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <!--{#if discountPercent > 0}-->
        <!--    <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">-->
        <!--        -{discountPercent}%-->
        <!--    </div>-->
        <!--{/if}-->

        {#if product.on_hand <= 0}
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span class="text-white font-semibold text-lg">Out of Stock</span>
            </div>
        {/if}
    </a>

    <!-- Content -->
    <div class="p-4">
        <!-- Category -->
        <!--{#if products.category}-->
        <!--    <p class="text-xs text-gray-500 mb-1">{products.category.name}</p>-->
        <!--{/if}-->

        <!-- Product Name -->
        <a href="/products/{product.id}" class="block">
            <h3 class="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                {product.productName}
            </h3>
        </a>

        <!-- Price -->
        <div class="flex items-center gap-2 mb-3">
      <span class="text-lg font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </span>
        </div>

        <!-- Add to Cart Button -->
        <button
                on:click={addToCart}
                disabled={product.on_hand <= 0}
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {product.on_hand <= 0 ? 'Out of Stock' : 'Add to Cart'}
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