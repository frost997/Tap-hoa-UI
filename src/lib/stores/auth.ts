// src/lib/stores/auth.js
import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import {api} from '$lib/utils/api.js';
import axios from "axios";

type user = {
    id: string,
    email: string,
    userName: string,
    roles: string[],
}

type auth = {
    user: user,
    token: string | null,
    isLoading: boolean | false,
    isAuthenticated: boolean | false,
}


function createAuthStore() {
    let authPayload: auth = {
        user: {
            id: "",
            email: "",
            userName: "",
            roles: [],
        },
        token: null,
        isLoading: false,
        isAuthenticated: false,
    }
    const {subscribe, set, update} = writable(authPayload);

    // Initialize auth state from localStorage
    if (browser) {
        const token: string | null = localStorage.getItem('auth_token');
        const user: string | null = localStorage.getItem('user');

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
        login: async (credentials: any) => {
            update(state => ({...state, isLoading: true}));

            try {
                const response = await api.auth.login(credentials);
                const {user, access_token: token} = response.data;

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

                return {
                    success: true,
                    error: ''
                };
            } catch (error) {
                update(state => ({...state, isLoading: false}));
                let message = 'Login failed'
                if (error instanceof Error) message = error.message
                if (axios.isAxiosError(error)) message = error.response?.data.message ?? ''

                return {
                    success: false,
                    error: message
                };
            }
        },

        // Register method
        register: async (userData: any) => {
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

                return {success: true, error: ''};
            } catch (error) {
                update(state => ({...state, isLoading: false}));
                let message = 'Registration failed'
                if (error instanceof Error) message = error.message
                if (axios.isAxiosError(error)) message = error.response?.data.message ?? ''
                return {
                    success: false,
                    error: message
                }
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
                localStorage.removeItem('role');
            }

            set({
                user: {
                    id: "",
                    email: "",
                    userName: "",
                    roles: [],
                },
                token: null,
                isLoading: false,
                isAuthenticated: false,
            });
        },

        // Update user profile
        updateProfile: async (userData: any) => {
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

                let message = 'Profile update failed'
                if (error instanceof Error) message = error.message
                if (axios.isAxiosError(error)) message = error.response?.data.message ?? ''
                return {
                    success: false,
                    error: message
                };
            }
        },
    };
}


export const authStore = createAuthStore();