<script lang="ts">
    import {onMount} from 'svelte';
    import {api} from '$lib/utils/api.js';
    import ProductGrid from '$lib/components/product/ProductGrid.svelte';
    import ProductFilters from '$lib/components/product/ProductFilter.svelte';
    import type {Product} from '$lib/types/product';

    let products = $state<Product[]>([]);
    // let categories = $state<Category[]>([]);
    let loading = $state(true);
    let showFilters = $state(false);
    let filters = $state({
        category: '',
        sort: 'created_desc',
        priceRange: {min: 0, max: 1000},
        search: ''
    });

    onMount(async () => {
        await Promise.all([
            loadProducts(),
            // loadCategories()
        ]);
    });

    async function loadProducts() {
        loading = true;
        try {
            const params: any = {
                skip: 0,
            };

            // if (filters.category) params.categoryId = filters.category;
            if (filters.search) params.search = filters.search;

            console.log('📡 Loading products-config with params:', params);

            const response = await api.products.getAll(params);

            console.log('✅ Products loaded:', response.data);

            products = response.data.data;

        } catch (error) {
            console.error('❌ Failed to load products-config:', error);
            products = [];
        } finally {

            loading = false;
        }
    }

    // async function loadCategories() {
    //     try {
    //         const response = await api.categories.getAll();
    //         categories = response.data;
    //     } catch (error) {
    //         console.error('Failed to load categories:', error);
    //         categories = [];
    //     }
    // }

    function handleFilterChange(detail: any) {
        filters = {...filters, ...detail};
        loadProducts();
    }

    function handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        filters.search = target.value;
        loadProducts();
    }
</script>

<svelte:head>
    <title>Products - {import.meta.env.VITE_APP_NAME || 'Store'}</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Page Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">All Products</h1>

            <!-- Search Bar -->
            <div class="relative">
                <input
                        type="text"
                        placeholder="Search products..."
                        oninput={handleSearch}
                        class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <svg class="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </div>
        </div>

        <!-- Mobile Filter Toggle -->
        <div class="lg:hidden mb-4">
            <button
                    onclick={() => showFilters = !showFilters}
                    class="w-full btn-secondary flex items-center justify-center gap-2"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                </svg>
                Filters
            </button>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

            <!-- Filters Sidebar -->
            <!--            <aside class:hidden={!showFilters} class="lg:block">-->
            <!--                <ProductFilters-->
            <!--                        {categories}-->
            <!--                        bind:selectedCategory={filters.category}-->
            <!--                        bind:sortBy={filters.sort}-->
            <!--                        bind:priceRange={filters.priceRange}-->
            <!--                        onfilterchange={handleFilterChange}-->
            <!--                />-->
            <!--            </aside>-->

            <!-- Products Grid -->
            <div class="lg:col-span-3">
                <div class="mb-4 text-sm text-gray-600">
                    {loading ? 'Loading...' : `${products.length} products found`}
                </div>

                <ProductGrid productList={products} loading={loading}/>
            </div>

        </div>
    </div>
</div>