<script lang="ts">
    import '../../app.css';
    import {Settings, Package, Users, ShoppingBag} from 'lucide-svelte';

    let sidebarOpen = $state(false);
</script>

<div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->

    <aside
            class="bg-gray-900 text-white flex-shrink-0 transition-all duration-300 ease-in-out"
            class:w-64={sidebarOpen}
            class:w-16={!sidebarOpen}
    >
        <div class="p-4 flex items-center justify-between">
            <button class="text-gray-500 hover:text-gray-700 cursor-pointer mr-4 border-none focus:outline-none"
                    onclick={() => sidebarOpen = !sidebarOpen} aria-label="sidebar-button">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            {#if sidebarOpen}
                <h2 class="text-xl font-bold whitespace-nowrap">
                    Admin Panel
                </h2>
            {/if}


        </div>
        <nav class="mt-8 space-y-2">
            <a href="/products-config"
               class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <Package class="h-5 w-5"/>
                {#if sidebarOpen}<span class="ml-3">Products</span>{/if}
            </a>
            <a href="/orders"
               class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <ShoppingBag class="h-5 w-5"/>
                {#if sidebarOpen}<span class="ml-3">Orders</span>{/if}

            </a>
            <a href="/users"
               class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <Users class="h-5 w-5"/>
                {#if sidebarOpen}<span class="ml-3">Users</span>{/if}
            </a>
            <a href="/settings"
               class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <Settings class="h-5 w-5"/>
                {#if sidebarOpen}<span class="ml-3">Settings</span>{/if}

            </a>
        </nav>
    </aside>
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
        <!-- Top bar -->
        <header class="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <a href="/" class="text-gray-600 hover:text-gray-900">
                    ← Back to Store
                </a>
            </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 p-6">
            <slot/>
        </main>
    </div>
</div>