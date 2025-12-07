<script lang="ts">
    import {cartStore} from '$lib/stores/cart.js';
    import {uiStore} from '$lib/stores/ui.js';
    import type {Product} from '$lib/types/product';
    import {ChevronLeft, ChevronRight, ShoppingCart} from "lucide-svelte";

    let {product} = $props<{ product: Product }>();
    let index = $state(0);

    // function addToCart() {
    //     cartStore.addItem(product, 1);
    //     uiStore.addToast(`${product.productName} added to cart!`, 'success');
    // }

    function prev() {
        index = (index - 1 + product.imageURL.length) % product.imageURL.length;
    }

    function next() {
        index = (index + 1) % product.imageURL.length;
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
        <div class="relative bg-gray-100 rounded-md aspect-square p-2 flex items-center justify-center overflow-hidden">

            <!-- IMAGE -->
            <img
                    src={product.imageURL[index] ?? "/placeholder.png"}
                    alt={product.productName}
                    class="w-full h-full object-cover transition-all duration-300"
            />

            <!-- PREV BUTTON (inside image) -->
            <!--{#if product.imageURL.length > 1}-->
                <button
                        onclick={prev}
                        class="absolute left-2 top-1/2 -translate-y-1/2
                       bg-white/70 hover:bg-white rounded-full p-1 shadow
                       flex items-center justify-center"
                >
                    <ChevronLeft class="w-5 h-5 text-gray-700"/>
                </button>

                <!-- NEXT BUTTON (inside image) -->
                <button
                        onclick={next}
                        class="absolute right-2 top-1/2 -translate-y-1/2
                       bg-white/70 hover:bg-white rounded-full p-1 shadow
                       flex items-center justify-center"
                >
                    <ChevronRight class="w-5 h-5 text-gray-700"/>
                </button>
            <!--{/if}-->

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