// =================================
// STEP 4: AUTH STORE
// =================================

// src/lib/stores/auth.js
import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import {api} from '$lib/utils/api.js';

function createAuthStore() {
    const {subscribe, set, update} = writable({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
    });

    // Initialize auth state from localStorage
    if (browser) {
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('user');

        if (token && user) {
            set({
                user: JSON.parse(user),
                token,
                isLoading: false,
                isAuthenticated: true,
            });
        }
    }

    return {
        subscribe,

        // Login method
        login: async (credentials) => {
            update(state => ({...state, isLoading: true}));

            try {
                const response = await api.auth.login(credentials);
                const {user, token} = response.data;

                // Store in localStorage
                if (browser) {
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                }

                set({
                    user,
                    token,
                    isLoading: false,
                    isAuthenticated: true,
                });

                return {success: true};
            } catch (error) {
                update(state => ({...state, isLoading: false}));
                return {
                    success: false,
                    error: error.response?.data?.message || 'Login failed'
                };
            }
        },

        // Register method
        register: async (userData) => {
            update(state => ({...state, isLoading: true}));

            try {
                const response = await api.auth.register(userData);
                const {user, token} = response.data;

                if (browser) {
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                }

                set({
                    user,
                    token,
                    isLoading: false,
                    isAuthenticated: true,
                });

                return {success: true};
            } catch (error) {
                update(state => ({...state, isLoading: false}));
                return {
                    success: false,
                    error: error.response?.data?.message || 'Registration failed'
                };
            }
        },

        // Logout method
        logout: async () => {
            try {
                await api.auth.logout();
            } catch (error) {
                // Continue with logout even if API call fails
                console.error('Logout API call failed:', error);
            }

            if (browser) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }

            set({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
            });
        },

        // Update user profile
        updateProfile: async (userData) => {
            update(state => ({...state, isLoading: true}));

            try {
                const response = await api.user.updateProfile(userData);
                const updatedUser = response.data;

                if (browser) {
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }

                update(state => ({
                    ...state,
                    user: updatedUser,
                    isLoading: false,
                }));

                return {success: true};
            } catch (error) {
                update(state => ({...state, isLoading: false}));
                return {
                    success: false,
                    error: error.response?.data?.message || 'Profile update failed'
                };
            }
        },
    };
}


export const authStore = createAuthStore();