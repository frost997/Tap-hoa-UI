<script>
    import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
    import {authStore} from '$lib/stores/auth';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    // import AuthSlider from '$lib/components/auth/AuthSlider.svelte';

    onMount(() => {
        // Redirect if already logged in
        if ($authStore.isAuthenticated) {
            // goto('/account');
        }
    });
</script>


<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Create account</h2>
            <p class="mt-2 text-sm text-gray-600">Join us today</p>
        </div>

        <div class="bg-white p-8 rounded-lg shadow-md">
            <RegisterForm/>
        </div>
    </div>
</div>
