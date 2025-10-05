<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/layout/Header.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';
    import {uiStore} from '$lib/stores/ui.js';

    $: toasts = $uiStore.toasts;
</script>

<div class="min-h-screen flex flex-col">
    <Header/>
    <main class="flex-1">
        <slot/>
    </main>

    <Footer/>
</div>

<!-- Toast Notifications -->
{#if toasts.length > 0}
    <div class="fixed top-4 right-4 z-50 space-y-2">
        {#each toasts as toast (toast.id)}
            <div
                    class="bg-white border-l-4 p-4 rounded shadow-lg max-w-md animate-slide-in"
                    class:border-green-500={toast.type === 'success'}
                    class:border-red-500={toast.type === 'error'}
                    class:border-yellow-500={toast.type === 'warning'}
                    class:border-blue-500={toast.type === 'info'}
            >
                <div class="flex items-start justify-between">
                    <p class="text-sm text-gray-800">{toast.message}</p>
                    <button
                            on:click={() => uiStore.removeToast(toast.id)}
                            class="ml-4 text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .animate-slide-in {
        animation: slide-in 0.3s ease-out;
    }
</style>