<script lang="ts">
    import {onMount} from 'svelte';
    import {api} from '$lib/utils/api.js';
    import ProductGrid from '$lib/components/product/productView/ProductGrid.svelte';
    import ProductList from "$lib/components/product/productView/ProductList.svelte";
    import ProductDetail from "$lib/components/product/productCreate/ProductDetail.svelte";
    import type {Product} from '$lib/types/product';
    import {ListFilterPlus} from "lucide-svelte";
    import {fade} from 'svelte/transition'
    import {productTitle} from "$lib/stores/title";


    const {currentView, admin} = $props<{ currentView: 'grid' | 'list', admin?: boolean | null }>();
    let products = $state<Product[]>([]);
    let mode = $state<'view' | 'create' | 'import'>('view')
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

    // function handleFilterChange(detail: any) {
    //     filters = {...filters, ...detail};
    //     loadProducts();
    // }

    function handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        filters.search = target.value;
        loadProducts();
    }

    function handleChangeMode(changeMode: string) {
        switch (changeMode) {
            case 'view':
                mode = 'view';
                break;
            case 'import':
                mode = 'import';
                break;
            case 'create':
                mode = 'create';
                break;
        }
    }
</script>
<!-- Page Header -->
<!--<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">-->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">{$productTitle}</h1>

        {#if admin}

            <div class="flex items-center gap-3">

                <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100">
                    Import
                </button>

                <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100">
                    Export
                </button>
                {#if mode !== "create"}
                    <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            onclick={() => handleChangeMode('create')}>
                        Create Product
                    </button>
                {:else}
                    <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            onclick={() => handleChangeMode('view')}>
                        View
                    </button>
                {/if}

            </div>
        {/if}
    </div>
    <!-- Page Header + Search Bar -->
    <div class="relative w-full mb-8">

        <!-- Unified Search + Filter Group -->
        <div class="flex w-full border border-gray-300 rounded-lg overflow-hidden">

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

            <!-- Filter Button -->
            <button
                    onclick={() => showFilters = true}
                    class="px-4 bg-gray-100 hover:bg-gray-200 border-l border-gray-300 flex items-center justify-center"
            >
                <ListFilterPlus/>
            </button>

        </div>
    </div>


    <!-- Main Layout Row -->
    <div class="flex gap-8">

        <!-- Product List -->
        <div class="flex-1">
            <div class="mb-4 text-sm text-gray-600">
                {loading ? 'Loading...' : `${products.length} products found`}
            </div>
            {#if mode === 'view'}
                <div transition:fade>
                    {#if currentView === 'grid'}
                        <ProductGrid productList={products} loading={loading}/>
                    {:else if currentView === 'list'}
                        <ProductList productList={products} loading={loading}/>
                    {/if}
                </div>
            {/if}
            {#if mode === 'create'}
                <div transition:fade>
                    <ProductDetail/>
                </div>
            {/if}
        </div>

    </div>

</div>
