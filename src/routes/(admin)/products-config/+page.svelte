<script>

    import Product from "$lib/components/product/Product.svelte";
</script>

<div class="bg-gray-50 min-h-screen py-8">

    <!-- Search Input -->
    <div class="relative flex-1">
        <input
                type="text"
                placeholder="Search products..."
                oninput={handleSearch}
                class="w-full px-4 py-3 pr-10 border-none focus:ring-2 focus:ring-primary-500 outline-none"
        />

        <!-- Search Icon -->
        <svg
                class="absolute right-3 top-3.5 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
    </div>
    <Product currentView="list"/>
</div>