<script lang="ts">
    import type { Product } from "$types";
    import { formatCurrency, categoryLabels, cn } from "$utils";
    import Badge from "$components/shared/Badge.svelte";

    interface Props {
        product: Product;
        onEdit?: (product: Product) => void;
        onDelete?: (product: Product) => void;
    }

    let { product, onEdit, onDelete }: Props = $props();

    let isDeleting = $state(false);

    function handleEdit() {
        onEdit?.(product);
    }

    function handleDelete() {
        isDeleting = true;
        onDelete?.(product);
        // Reset after a delay (parent should handle actual deletion)
        setTimeout(() => (isDeleting = false), 1000);
    }

    // Derived states
    let isOutOfStock = $derived(product.on_hand === 0 || !product.isAvailable);
    let isLowStock = $derived(product.on_hand > 0 && product.on_hand <= 5);

    // Category emoji mapping
    const categoryEmoji: Record<string, string> = {
        beverages: "🥤",
        tissues: "🧻",
        daily_necessities: "🧴",
        snacks: "🍿",
    };
</script>

<div
    class={cn(
        "flex items-center gap-4 p-4 bg-white border border-surface-200 rounded-xl",
        "transition-all duration-200 hover:shadow-md hover:border-surface-300",
        isDeleting && "opacity-50 pointer-events-none",
    )}
>
    <!-- Product Image -->
    <div
        class="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-surface-50 to-surface-100 overflow-hidden"
    >
        {#if product.imageURL}
            <img
                src={product.imageURL}
                alt={product.name}
                class="w-full h-full object-cover"
                loading="lazy"
            />
        {:else}
            <div
                class="w-full h-full flex items-center justify-center text-2xl"
            >
                {categoryEmoji[product.category] ?? "📦"}
            </div>
        {/if}
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold text-surface-900 truncate">
                {product.name}
            </h3>
            <Badge variant="default" size="sm">
                {categoryLabels[product.category]}
            </Badge>
        </div>

        <p class="text-sm text-surface-500 truncate mb-2">
            {product.description}
        </p>

        <div class="flex items-center gap-3 text-sm">
            <!-- Price -->
            <span class="font-display font-bold text-primary-600">
                {formatCurrency(product.price)}
            </span>

            <!-- Stock Status -->
            {#if isOutOfStock}
                <Badge variant="danger" size="sm">Out of Stock</Badge>
            {:else if isLowStock}
                <Badge variant="warning" size="sm"
                    >Low Stock: {product.on_hand}</Badge
                >
            {:else}
                <span class="text-surface-500">Stock: {product.on_hand}</span>
            {/if}

            <!-- Availability -->
            {#if !product.isAvailable}
                <Badge variant="danger" size="sm">Unavailable</Badge>
            {/if}
        </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex-shrink-0 flex items-center gap-2">
        <!-- Edit Button -->
        <button
            type="button"
            class={cn(
                "p-2 rounded-lg transition-all duration-200",
                "text-surface-500 hover:text-primary-600 hover:bg-primary-50",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            )}
            onclick={handleEdit}
            aria-label="Edit product"
            title="Edit"
        >
            <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
            </svg>
        </button>

        <!-- Delete Button -->
        <button
            type="button"
            class={cn(
                "p-2 rounded-lg transition-all duration-200",
                "text-surface-500 hover:text-red-600 hover:bg-red-50",
                "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
            )}
            onclick={handleDelete}
            aria-label="Delete product"
            title="Delete"
            disabled={isDeleting}
        >
            <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
        </button>
    </div>
</div>
