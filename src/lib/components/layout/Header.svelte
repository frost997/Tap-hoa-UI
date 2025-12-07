<!-- src/lib/components/layout/Header.svelte -->

<script lang="ts">

    import '../../../app.css';
    import {ShoppingCart, User, Search, Menu, X} from 'lucide-svelte';
    import {page} from '$app/state';
    import {uiStore} from '$lib/stores/ui.js';
    import {goto} from '$app/navigation';
    import {authStore} from "$lib/stores/auth";
    import {cartStore} from "$lib/stores/cart";

    // Read store values reactively
    const currentPath = $derived(page.url.pathname)
    const isAuthenticated = $derived($authStore.isAuthenticated);
    const cartItemCount = $derived($cartStore.totalItems);
    const roles = $derived($authStore.user.roles);
    let isMenuOpen = $state(false);
    let searchQuery = $state('');

    function handleLogout() {
        authStore.logout();
        uiStore.addToast('Logged out successfully', 'success');
        goto('/');
    }


    const isActive = (path: string) => path === '/' ? currentPath === '/' : currentPath === path;


    const handleSearch = (e: Event) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
        }
    };
</script>
<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div class="flex items-center">
            <a href="/" class="flex items-start space-x-2">
                <img
                        src="/logo.png"
                        alt="Store Logo"
                        class="w-32 h-auto block object-contain"
                />

            </a>
        </div>
        <div class="flex items-center space-x-6 justify-between h-16">
            <!-- Logo -->

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8">
                {#each [
                    {href: '/', label: 'Home'},
                    {href: '/products', label: 'Products'},
                    {href: '/categories', label: 'Categories'},
                ] as item}
                    <a
                            href={item.href}
                            class="px-3 py-2 text-sm font-medium transition-colors duration-200
                            {isActive(item.href)
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600'}"
                    >
                        {item.label}
                    </a>
                {/each}
                {#if isAuthenticated && roles?.some(rl => rl === 'ADMIN')}
                    <a href="/products-config" class="px-3 py-2 text-sm font-medium transition-colors duration-200
                            {isActive('/products-config')
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600'}"
                    >Admin</a>
                {/if}
            </nav>

            <!-- Search bar (desktop only) -->
            <div class="hidden lg:flex flex-1 max-w-lg mx-8">
                <form onsubmit={handleSearch} class="relative w-full">
                    <input
                            type="text"
                            bind:value={searchQuery}
                            placeholder="Search products..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                </form>
            </div>

            <!-- Right section -->
            <div class="flex items-center space-x-4">
                <!-- Search (mobile trigger) -->
                <button class="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <Search class="h-5 w-5"/>
                </button>
                <!-- User menu -->
                {#if isAuthenticated && roles?.some(rl => rl === 'ADMIN')}
                    <!-- CART BUTTON -->
                    <a href="/cart" class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                        <ShoppingCart class="h-6 w-6"/>

                        <span
                                class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full
                   h-5 w-5 flex items-center justify-center font-medium"
                        >
            {cartItemCount}
        </span>
                    </a>

                    <div class="relative group">
                        <!-- USER BUTTON -->
                        <button class="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                            <User/>
                        </button>

                        <!-- DROPDOWN -->
                        <div
                                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1
               opacity-0 invisible
               group-hover:visible group-hover:opacity-100
               transition-all duration-150"
                        >
                            <a href="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                My Account
                            </a>
                            <a href="/account/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Orders
                            </a>
                            <button
                                    onclick={handleLogout}
                                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                {:else}

                    <a href="/auth/login"
                       class="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors">
                        <User class="h-6 w-6"/>
                        <span class="hidden sm:block text-sm font-medium">Account</span>
                    </a>
                {/if}

                <!-- Mobile Menu Toggle -->
                <button
                        class="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                        onclick={() => (isMenuOpen = !isMenuOpen)}
                        aria-label="Toggle menu"
                >
                    {#if isMenuOpen}
                        <X class="h-6 w-6"/>
                    {:else}
                        <Menu class="h-6 w-6"/>
                    {/if}
                </button>
            </div>
        </div>
    </div>
</header>
