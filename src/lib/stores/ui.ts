// =================================
// STEP 6: UI STORE
// =================================

// src/lib/stores/ui.js
import {writable} from 'svelte/store';

type toast = {
    id: string,
    message: string,
    type: string, // 'success', 'error', 'warning', 'info'
    duration: string,
}

type UIStore = {
    // Loading states
    isLoading: boolean,
    loadingMessage: string,

    // Modal states
    modals: {
        cartDrawer: boolean,
        loginModal: boolean,
        productQuickView: boolean,
    },

    // Toast notifications
    toasts: toast[],

    // Mobile menu
    mobileMenuOpen: boolean,

    // Search
    searchOpen: boolean,
    searchQuery: string,
}

function createUIStore() {
    const UIstorePayload: UIStore = {
        // Loading states
        isLoading: false,
        loadingMessage: '',

        // Modal states
        modals: {
            cartDrawer: false,
            loginModal: false,
            productQuickView: false,
        },

        // Toast notifications
        toasts: [],

        // Mobile menu
        mobileMenuOpen: false,

        // Search
        searchOpen: false,
        searchQuery: '',
    }
    const {subscribe, set, update} = writable(UIstorePayload);
    return {
        subscribe,

        // Loading state
        setLoading: (isLoading: boolean, message = '') => {
            update(state => ({
                ...state,
                isLoading,
                loadingMessage: message,
            }));
        },

        // Modal controls
        openModal: (modalName: any) => {
            update(state => ({
                ...state,
                modals: {
                    ...state.modals,
                    [modalName]: true,
                },
            }));
        },
        closeModal: (modalName: any) => {
            update(state => ({
                ...state,
                modals: {
                    ...state.modals,
                    [modalName]: false,
                },
            }));
        },

        closeAllModals: () => {
            update(state => {
                return ({
                    ...state,
                    modals: Object.keys(state.modals).reduce((acc: any, key: string) => {
                        acc[key] = false;
                        return acc;
                    }, {}),
                });
            });
        },

        // Toast notifications
        addToast: (message: string, type: string = 'info', duration: number = 5000) => {
            const toast = {
                id: Date.now(),
                message,
                type, // 'success', 'error', 'warning', 'info'
                duration,
            };

            update((state: any) => ({
                ...state,
                toasts: [...state.toasts, toast],
            }));

            // Auto remove toast
            if (duration > 0) {
                setTimeout(() => {
                    update(state => ({
                        ...state,
                        toasts: state.toasts.filter((t: any) => t.id !== toast.id),
                    }));
                }, duration);
            }

            return toast.id;
        },

        removeToast: (toastId: any) => {
            update(state => ({
                ...state,
                toasts: state.toasts.filter((t: any) => t.id !== toastId),
            }));
        },

        // Mobile menu
        toggleMobileMenu: () => {
            update(state => ({
                ...state,
                mobileMenuOpen: !state.mobileMenuOpen,
            }));
        },

        closeMobileMenu: () => {
            update(state => ({
                ...state,
                mobileMenuOpen: false,
            }));
        },

        // Search
        toggleSearch: () => {
            update(state => ({
                ...state,
                searchOpen: !state.searchOpen,
            }));
        },

        setSearchQuery: (query: any) => {
            update(state => ({
                ...state,
                searchQuery: query,
            }));
        },
    };
}

export const uiStore = createUIStore();