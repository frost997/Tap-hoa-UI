<script>
    // import LoginForm from '$lib/components/auth/LoginForm.svelte';
    import {authStore} from '$lib/stores/auth.js';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import LoginForm from "$lib/components/auth/LoginForm.svelte";

    import AuthSlider from '$lib/components/auth/AuthSlider.svelte';

    onMount(() => {
        // Redirect if already logged in
        if ($authStore.isAuthenticated) {
            goto('/account');
        }
    });
</script>

<form>
    <h2>Register</h2>
    <input placeholder="Email"/>
    <input type="password" placeholder="Password"/>
    <button type="submit">Register</button>
</form>

<p>
    Don't have an account?
    <a href="/auth/register" class="text-primary-600 hover:text-primary-500 font-medium">
        Register
    </a>
</p>
<!--import.meta.env.VITE_APP_NAME ||-->

<!--<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">-->
<!--    <div class="max-w-md w-full">-->
<!--        <div class="text-center mb-8">-->
<!--            <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>-->
<!--            <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>-->
<!--        </div>-->

<!--        <div class="bg-white p-8 rounded-lg shadow-md">-->
<!--            <LoginForm/>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<AuthSlider mode="login"/>