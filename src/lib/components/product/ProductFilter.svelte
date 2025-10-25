<!-- src/lib/components/product/ProductFilters.svelte -->
<script lang="ts">
    import type { Category } from '$lib/types/product';

    export let categories: Category[] = [];
    export let selectedCategory: string = '';
    export let sortBy: string = 'created_desc';
    export let priceRange: { min: number; max: number } = { min: 0, max: 1000 };

    // Event callback prop (Svelte 5 way)
    export let onFilterChange: ((detail: {
        category: string;
        sort: string;
        priceRange: { min: number; max: number };
    }) => void) | undefined = undefined;

    const sortOptions = [
        { value: 'name_asc', label: 'Name A-Z' },
        { value: 'name_desc', label: 'Name Z-A' },
        { value: 'price_asc', label: 'Price Low to High' },
        { value: 'price_desc', label: 'Price High to Low' },
        { value: 'created_desc', label: 'Newest First' },
    ];

    function handleCategoryChange(categoryId: string) {
        selectedCategory = categoryId;
        onFilterChange?.({ category: categoryId, sort: sortBy, priceRange });
    }

    function handleSortChange() {
        onFilterChange?.({ category: selectedCategory, sort: sortBy, priceRange });
    }

    function handlePriceChange() {
        onFilterChange?.({ category: selectedCategory, sort: sortBy, priceRange });
    }

    function clearFilters() {
        selectedCategory = '';
        sortBy = 'created_desc';
        priceRange = { min: 0, max: 1000 };
        onFilterChange?.({ category: '', sort: 'created_desc', priceRange: { min: 0, max: 1000 } });
    }
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <!-- Sort -->
    <div class="mb-6">
        <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">
            Sort By
        </label>
        <select
                id="sort"
                bind:value={sortBy}
                onchange={handleSortChange}
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
            {#each sortOptions as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
    </div>

    <!-- Categories -->
    {#if categories.length > 0}
        <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Categories</h3>
            <div class="space-y-2">
                <label class="flex items-center cursor-pointer">
                    <input
                            type="radio"
                            name="category"
                            value=""
                            checked={selectedCategory === ''}
                            onchange={() => handleCategoryChange('')}
                            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span class="ml-2 text-sm text-gray-700">All Products</span>
                </label>
                {#each categories as category}
                    <label class="flex items-center cursor-pointer">
                        <input
                                type="radio"
                                name="category"
                                value={category.id}
                                checked={selectedCategory === category.id}
                                onchange={() => handleCategoryChange(category.id)}
                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span class="ml-2 text-sm text-gray-700">{category.name}</span>
                    </label>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Price Range -->
    <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
        <div class="flex items-center gap-2 mb-2">
            <input
                    type="number"
                    bind:value={priceRange.min}
                    onchange={handlePriceChange}
                    placeholder="Min"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <span class="text-gray-500">-</span>
            <input
                    type="number"
                    bind:value={priceRange.max}
                    onchange={handlePriceChange}
                    placeholder="Max"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
        </div>
    </div>

    <!-- Clear Filters -->
    <button
            onclick={clearFilters}
            class="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
    >
        Clear All Filters
    </button>
</div>