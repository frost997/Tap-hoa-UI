<script>
    import {authStore} from '$lib/stores/auth.js';
    import {uiStore} from '$lib/stores/ui.js';
    import {goto} from '$app/navigation';

    let user = '';
    let password = '';
    let errors = {user: '', password: ''};
    let isLoading = false;

    function validateForm() {

        if (!user) {
            errors.user = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)) {
            errors.user = 'Invalid email format';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return Object.keys(errors).length === 0;
    }

    async function handleSubmit() {
        if (!validateForm()) return;

        isLoading = true;
        const result = await authStore.login({user, password});
        isLoading = false;

        if (result.success) {
            uiStore.addToast('Login successful!', 'success');
            await goto('/account');
        } else {
            uiStore.addToast(result.error, 'error');
        }
    }
</script>

<div class="w-full max-w-md">
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <!-- Email -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
            </label>
            <input
                    id="email"
                    type="email"
                    bind:value={user}
                    class="input-field"
                    class:border-red-500={errors.email}
                    placeholder="your@email.com"
                    disabled={isLoading}
            />
            {#if errors.email}
                <p class="mt-1 text-sm text-red-600">{errors.email}</p>
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
                    class="input-field"
                    class:border-red-500={errors.password}
                    placeholder="••••••••"
                    disabled={isLoading}
            />
            {#if errors.password}
                <p class="mt-1 text-sm text-red-600">{errors.password}</p>
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
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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