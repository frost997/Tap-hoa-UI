// src/lib/stores/product.js
import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import {api} from '$lib/utils/api.js';
import axios from "axios";


type productType = {
    productName: string,
    images: string,
    brand: string,
    categories: string,
    price: number,
    on_hand: number,
}

function createProductStore() {
    const {subscribe, set, update} = writable();

    // Initialize auth state from localStorage
    return {
        subscribe,

        // Login method
        addProduct: async (product: productType[]) => {
            // update(state => ({...state, isLoading: true}));

            try {
                const response = await api.products.createProduct(product);
                return {
                    success: true,
                    error: ''
                };
            } catch (error) {
                // update(state => ({...state, isLoading: false}));
                let message = 'Add Product failed'
                if (error instanceof Error) message = error.message
                if (axios.isAxiosError(error)) message = error.response?.data.message ?? ''

                return {
                    success: false,
                    error: message
                };
            }
        },
    }
}

export const productStore = createProductStore();