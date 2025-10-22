<script>
    import {authStore} from '$lib/stores/auth.js';
    import {uiStore} from '$lib/stores/ui.js';
    import {goto} from '$app/navigation';

    let email = $state('');
    let password = $state('');
    let error = $state({email: '', password: ''});
    let isLoading = $state(false);

    function validateForm() {
        let isValidate = true
        if (!email) {
            error.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error.email = 'Invalid email format';
        }

        if (!password) {
            error.password = 'Password is required';
        } else if (password.length < 6) {
            error.password = 'Password must be at least 6 characters';
        }

        if (error.password.length || error.email.length) {
            isValidate = false
        }

        return isValidate;
    }

    async function handleSubmit() {
        const isValidate = validateForm()
        if (!isValidate) return;

        isLoading = true;
        const result = await authStore.login({email, password});
        isLoading = false;

        if (result.success) {
            uiStore.addToast('Login successful!', 'success');
            // await goto('/account');
        } else {
            uiStore.addToast(result.error, 'error');
        }
    }
</script>

<div class="w-full max-w-md">
    <form onsubmit={handleSubmit} class="space-y-6">
        <!-- Email -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
            </label>
            <input
                    id="email"
                    type="email"
                    bind:value={email}
                    class="input-underline"
                    class:border-red-500={error.email}
                    placeholder="your@email.com"
                    autocomplete="one-time-code"
                    disabled={isLoading}
            />
            {#if error.email}
                <p class="mt-1 text-sm text-red-600">{error.email}</p>
            {/if}
        </div>

        <!-- Password -->
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
            </label>
            <input
                    id="password"
                    type="password"
                    bind:value={password}
                    class="input-underline pr-10"
                    class:border-red-500={error.password}
                    placeholder="••••••••"
                    autocomplete="one-time-code"
                    disabled={isLoading}
            />
            {#if error.password}
                <p class="mt-1 text-sm text-red-600">{error.password}</p>
            {/if}
        </div>

        <!-- Forgot Password -->
        <div class="flex items-center justify-between">
            <div class="text-sm">
                <a href="/auth/forgot-password" class="text-primary-600 hover:text-primary-500">
                    Forgot password?
                </a>
            </div>
        </div>

        <!-- Submit Button -->
        <button
                type="submit"
                disabled={isLoading}
                class="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed hover:text-primary-600 cursor-pointer"
        >
            {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600">
            Don't have an account?
            <a href="/auth/register" class="text-primary-600 hover:text-primary-500 font-medium">
                Register
            </a>
        </p>
    </form>
</div>