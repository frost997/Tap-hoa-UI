<script lang="ts">
    import '../../app.css';
    import {Settings, Package, Users, ShoppingBag, BarChart} from 'lucide-svelte';

    let sidebarOpen = true;
</script>

<div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="bg-gray-900 text-white w-64 flex-shrink-0 {sidebarOpen ? 'block' : 'hidden'} md:block">
        <div class="p-4">
            <h2 class="text-xl font-bold">Admin Panel</h2>
        </div>

        <nav class="mt-8">
            <a href="/admin" class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <BarChart class="h-5 w-5 mr-3"/>
                Dashboard
            </a>
            <a href="/admin/products"
               class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <Package class="h-5 w-5 mr-3"/>
                Products
            </a>
            <a href="/admin/orders"
               class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <ShoppingBag class="h-5 w-5 mr-3"/>
                Orders
            </a>
            <a href="/admin/users" class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <Users class="h-5 w-5 mr-3"/>
                Users
            </a>
            <a href="/admin/settings"
               class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                <Settings class="h-5 w-5 mr-3"/>
                Settings
            </a>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
        <!-- Top bar -->
        <header class="bg-white shadow-sm border-b px-6 py-4">
            <div class="flex items-center justify-between">
                <button
                        class="md:hidden p-2"
                        on:click={() => sidebarOpen = !sidebarOpen}
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>

                <div class="flex items-center space-x-4">
                    <a href="/" class="text-gray-600 hover:text-gray-900">
                        ← Back to Store
                    </a>
                    <div class="text-gray-600">Admin User</div>
                </div>
            </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 p-6">
            <slot/>
        </main>
    </div>
</div>