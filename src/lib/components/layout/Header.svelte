<!-- src/lib/components/layout/Header.svelte -->

<script lang="ts">

    import '../../../app.css';
    import {ShoppingCart, User, Search, Menu, X} from 'lucide-svelte';
    import {page} from '$app/state';

    let isMenuOpen = false;
    let searchQuery = '';

    // Check active route
    const isActive = (path: string) => {
        if (path === '/') return page.url.pathname === '/';
        return page.url.pathname.startsWith(path);
    };

    const closeMobileMenu = () => (isMenuOpen = false);

    const handleSearch = (e: Event) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
        }
    };
</script>
<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <!--    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">-->
    <!--        <div class="flex items-center justify-between h-16">-->
    <!--            &lt;!&ndash; Logo &ndash;&gt;-->
    <!--            <a href="/" class="flex items-center space-x-2">-->
    <!--                <img-->
    <!--                        src="/logo.png"-->
    <!--                        alt="Store Logo"-->
    <!--                        class="w-8 h-8 block object-contain"-->
    <!--                />-->
    <!--                <span class="text-2xl font-bold text-gray-900">YourStore</span>-->

    <!--            </a>-->

    <!--            &lt;!&ndash; Desktop Navigation &ndash;&gt;-->
    <!--            <nav class="hidden md:flex space-x-8">-->
    <!--                {#each [-->
    <!--                    {href: '/', label: 'Home'},-->
    <!--                    {href: '/products', label: 'Products'},-->
    <!--                    {href: '/categories', label: 'Categories'},-->
    <!--                    {href: '/about', label: 'About'}-->
    <!--                ] as item}-->
    <!--                    <a-->
    <!--                            href={item.href}-->
    <!--                            class="px-3 py-2 text-sm font-medium transition-colors duration-200-->
    <!--                        {isActive(item.href)-->
    <!--                            ? 'text-blue-600 border-b-2 border-blue-600'-->
    <!--                            : 'text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600'}"-->
    <!--                    >-->
    <!--                        {item.label}-->
    <!--                    </a>-->
    <!--                {/each}-->
    <!--            </nav>-->

    <!--            &lt;!&ndash; Search bar (desktop only) &ndash;&gt;-->
    <!--            <div class="hidden lg:flex flex-1 max-w-lg mx-8">-->
    <!--                <form on:submit={handleSearch} class="relative w-full">-->
    <!--                    <input-->
    <!--                            type="text"-->
    <!--                            bind:value={searchQuery}-->
    <!--                            placeholder="Search products..."-->
    <!--                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg-->
    <!--                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"-->
    <!--                    />-->
    <!--                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>-->
    <!--                </form>-->
    <!--            </div>-->

    <!--            &lt;!&ndash; Right section &ndash;&gt;-->
    <!--            <div class="flex items-center space-x-4">-->
    <!--                &lt;!&ndash; Search (mobile trigger) &ndash;&gt;-->
    <!--                <button class="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">-->
    <!--                    <Search class="h-5 w-5"/>-->
    <!--                </button>-->

    <!--                &lt;!&ndash; Cart &ndash;&gt;-->
    <!--                <a href="/cart" class="relative p-2 text-gray-700 hover:text-blue-600 transition-colors group">-->
    <!--                    <ShoppingCart class="h-6 w-6"/>-->
    <!--                    <span-->
    <!--                            class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full-->
    <!--                               h-5 w-5 flex items-center justify-center font-medium-->
    <!--                               group-hover:bg-blue-700 transition-colors"-->
    <!--                    >-->
    <!--                        3-->
    <!--                    </span>-->
    <!--                </a>-->

    <!--                &lt;!&ndash; User &ndash;&gt;-->
    <!--                <a href="/login"-->
    <!--                   class="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors">-->
    <!--                    <User class="h-6 w-6"/>-->
    <!--                    <span class="hidden sm:block text-sm font-medium">Account</span>-->
    <!--                </a>-->

    <!--                &lt;!&ndash; Mobile Menu Toggle &ndash;&gt;-->
    <!--                <button-->
    <!--                        class="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"-->
    <!--                        on:click={() => (isMenuOpen = !isMenuOpen)}-->
    <!--                        aria-label="Toggle menu"-->
    <!--                >-->
    <!--                    {#if isMenuOpen}-->
    <!--                        <X class="h-6 w-6"/>-->
    <!--                    {:else}-->
    <!--                        <Menu class="h-6 w-6"/>-->
    <!--                    {/if}-->
    <!--                </button>-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        &lt;!&ndash; Mobile Navigation &ndash;&gt;-->
    <!--        {#if isMenuOpen}-->
    <!--            <div class="md:hidden border-t border-gray-200 py-4 bg-white">-->
    <!--                &lt;!&ndash; Mobile Search &ndash;&gt;-->
    <!--                <div class="px-4 mb-4">-->
    <!--                    <form on:submit={handleSearch} class="relative">-->
    <!--                        <input-->
    <!--                                type="text"-->
    <!--                                bind:value={searchQuery}-->
    <!--                                placeholder="Search products..."-->
    <!--                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg-->
    <!--                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"-->
    <!--                        />-->
    <!--                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>-->
    <!--                    </form>-->
    <!--                </div>-->

    <!--                &lt;!&ndash; Mobile Links &ndash;&gt;-->
    <!--                <nav class="flex flex-col space-y-1 px-4">-->
    <!--                    {#each [-->
    <!--                        {href: '/', label: 'Home'},-->
    <!--                        {href: '/products', label: 'Products'},-->
    <!--                        {href: '/categories', label: 'Categories'},-->
    <!--                        {href: '/about', label: 'About'}-->
    <!--                    ] as item}-->
    <!--                        <a-->
    <!--                                href={item.href}-->
    <!--                                on:click={closeMobileMenu}-->
    <!--                                class="px-3 py-3 text-base font-medium rounded-lg transition-colors-->
    <!--                            {isActive(item.href)-->
    <!--                                ? 'text-blue-600 bg-blue-50'-->
    <!--                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"-->
    <!--                        >-->
    <!--                            {item.label}-->
    <!--                        </a>-->
    <!--                    {/each}-->
    <!--                </nav>-->

    <!--                &lt;!&ndash; Mobile Auth Links &ndash;&gt;-->
    <!--                <div class="border-t border-gray-200 mt-4 pt-4 px-4">-->
    <!--                    <div class="flex flex-col space-y-2">-->
    <!--                        <a href="/login" class="btn bg-blue-600 text-white hover:bg-blue-700 text-center">-->
    <!--                            Sign In-->
    <!--                        </a>-->
    <!--                        <a href="/register" class="btn bg-gray-100 text-gray-700 hover:bg-gray-200 text-center">-->
    <!--                            Create Account-->
    <!--                        </a>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->

    <!--            &lt;!&ndash; Overlay &ndash;&gt;-->
    <!--            <div-->
    <!--                    class="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"-->
    <!--                    on:click={closeMobileMenu}-->
    <!--            ></div>-->
    <!--        {/if}-->
    <!--    </div>-->
    <div class="bg-red-500 text-white p-4">Tailwind is working 🎉</div>
</header>
