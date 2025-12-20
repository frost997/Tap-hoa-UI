<script lang="ts">
    import {productTitle} from "$lib/stores/title.js";
    import {ListFilterPlus} from "lucide-svelte";

    let mode = $state<'view' | 'create' | 'import' | 'edit'>('view')
    let showFilters = $state(false);

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
            case 'edit':
                mode = 'edit';
                break;
        }
    }

    // let categories = $state<Category[]>([]);
</script>

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
                {#if mode !== "create" && mode !== "edit"}
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
    {#if mode !== 'create'}
        <div class="relative w-full mb-8">

            <!-- Unified Search + Filter Group -->
            <div class="flex w-full border border-gray-300 rounded-lg overflow-hidden">

                <!--                &lt;!&ndash; Search Input &ndash;&gt;-->
                <!--                <div class="relative flex-1">-->
                <!--                    <input-->
                <!--                            type="text"-->
                <!--                            placeholder="Search products..."-->
                <!--                            oninput={handleSearch}-->
                <!--                            class="w-full px-4 py-3 pr-10 border-none focus:ring-2 focus:ring-primary-500 outline-none"-->
                <!--                    />-->

                <!--                    &lt;!&ndash; Search Icon &ndash;&gt;-->
                <!--                    <svg-->
                <!--                            class="absolute right-3 top-3.5 w-5 h-5 text-gray-400"-->
                <!--                            fill="none" stroke="currentColor" viewBox="0 0 24 24"-->
                <!--                    >-->
                <!--                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
                <!--                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>-->
                <!--                    </svg>-->
                <!--                </div>-->

                <!-- Filter Button -->
                <button
                        onclick={() => showFilters = true}
                        class="px-4 bg-gray-100 hover:bg-gray-200 border-l border-gray-300 flex items-center justify-center"
                >
                    <ListFilterPlus/>
                </button>

            </div>
        </div>
    {/if}


    <main class="flex-1 p-6">
        <slot/>
    </main>


</div>