<script>
    import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
    import {authStore} from '$lib/stores/auth.ts';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import AuthSlider from '$lib/components/auth/AuthSlider.svelte';

    onMount(() => {
        // Redirect if already logged in
        if ($authStore.isAuthenticated) {
            goto('/account');
        }
    });
</script>
<form>
    <h2>Login</h2>
    <input placeholder="Email"/>
    <input type="password" placeholder="Password"/>
    <button type="submit">Login</button>
</form>

<p>
    Already have an account?
    <a href="/auth/login" class="text-primary-600 hover:text-primary-500 font-medium">
        Login
    </a>
</p>
<!--<svelte:head>-->
<!--    <title>Register - {import.meta.env.VITE_APP_NAME || 'Store'}</title>-->
<!--</svelte:head>-->

<!--<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">-->
<!--    <div class="max-w-md w-full">-->
<!--        <div class="text-center mb-8">-->
<!--            <h2 class="text-3xl font-bold text-gray-900">Create account</h2>-->
<!--            <p class="mt-2 text-sm text-gray-600">Join us today</p>-->
<!--        </div>-->

<!--        <div class="bg-white p-8 rounded-lg shadow-md">-->
<!--            <RegisterForm/>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<AuthSlider mode="register"/>