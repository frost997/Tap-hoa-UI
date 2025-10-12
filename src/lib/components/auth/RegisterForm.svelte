<script>
    import {authStore} from '$lib/stores/auth.js';
    import {uiStore} from '$lib/stores/ui.js';
    import {goto} from '$app/navigation';

    let formData = $state({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    let errors = $state({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    let isLoading = $state(false);

    function validateForm() {

        let isValidate = true
        if (!formData.userName) errors.userName = 'User name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (errors.password.length || errors.email.length || errors.confirmPassword.length) {
            isValidate = false
        }

        return isValidate;
    }

    async function handleSubmit() {
        if (!validateForm()) return;

        isLoading = true;
        const {confirmPassword, ...userData} = formData;
        const result = await authStore.register(userData);
        isLoading = false;

        if (result.success) {
            uiStore.addToast('Registration successful!', 'success');
            await goto('/auth/login');
        } else {
            uiStore.addToast(result.error, 'error');
        }
    }
</script>

<div class="w-full max-w-md">
    <form onsubmit={handleSubmit} class="space-y-6">
        <!-- Name Fields -->
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="userName" class="block text-sm font-medium text-gray-700 mb-2">
                    User Name
                </label>
                <input
                        id="userName"
                        type="text"
                        bind:value={formData.userName}
                        class="input-field"
                        class:border-red-500={errors.userName}
                        disabled={isLoading}
                />
                {#if errors.userName}
                    <p class="mt-1 text-sm text-red-600">{errors.userName}</p>
                {/if}
            </div>

        </div>

        <!-- Email -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
            </label>
            <input
                    id="email"
                    type="email"
                    bind:value={formData.email}
                    class="input-field"
                    class:border-red-500={errors.email}
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
                    bind:value={formData.password}
                    class="input-field"
                    class:border-red-500={errors.password}
                    disabled={isLoading}
            />
            {#if errors.password}
                <p class="mt-1 text-sm text-red-600">{errors.password}</p>
            {/if}
        </div>

        <!-- Confirm Password -->
        <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
            </label>
            <input
                    id="confirmPassword"
                    type="password"
                    bind:value={formData.confirmPassword}
                    class="input-field"
                    class:border-red-500={errors.confirmPassword}
                    disabled={isLoading}
            />
            {#if errors.confirmPassword}
                <p class="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            {/if}
        </div>

        <!-- Submit Button -->
        <button
                type="submit"
                disabled={isLoading}
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Creating account...' : 'Register'}
        </button>

        <!-- Login Link -->
        <p class="text-center text-sm text-gray-600">
            Already have an account?
            <a href="/auth/login" class="text-primary-600 hover:text-primary-500 font-medium">
                Login
            </a>
        </p>
    </form>
</div>