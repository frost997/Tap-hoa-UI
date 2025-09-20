// =================================
// STEP 5: CART STORE
// =================================

// src/lib/stores/productUser.js
import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import type {productUser} from "$lib/types/productUser";

function createCartStore() {
    const {subscribe, set, update} = writable<productUser[]>([]);

    // Initialize productUser from localStorage
    if (browser) {
        const savedCart = localStorage.getItem('productUser');
        if (savedCart) {
            const productUser = JSON.parse(savedCart);
            set(productUser);
        }
    }

    // Helper function to calculate totals
    // const calculateTotals = (items: any) => {
    //     const totalItems = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    //     const totalPrice = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    //     return {totalItems, totalPrice};
    // };

    // Helper function to save to localStorage
    const saveToStorage = (productUser: productUser[]) => {
        if (browser) {
            localStorage.setItem('productUser', JSON.stringify(productUser));
        }
    };

    return {
        subscribe,

        // Add item to productUser
        addItem: (product: productUser, quantity = 1, variant = null) => {
            update((productUser: productUser[]) => {
                const existingItemIndex = productUser.findIndex((item: productUser) =>
                    item.productID === product.productID
                );

                let newItems: productUser[];
                if (existingItemIndex > -1) {
                    // Update existing item
                    newItems = [...productUser];
                    newItems[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item
                    const newItem = {
                        productID: product.productID,
                        productName: product.productName,
                        userID: product.userID,
                        quantity: product.quantity,
                    };
                    newItems = [...productUser, newItem];
                }

                saveToStorage(newItems);
                return newItems;
            });
        },

        // Update item quantity
        updateQuantity: (itemId: string, quantity: number) => {
            if (quantity <= 0) {
                return cartStore.removeItem(itemId);
            }

            update((productUser: productUser[]) => {
                const newItems = productUser.map(item =>
                    item.productID === itemId ? {...item, quantity} : item
                );

                // const totals = calculateTotals(newItems);


                saveToStorage(newItems);
                return newItems;
            });
        },

        // Remove item from productUser
        removeItem: (itemId: string) => {
            update((productUser: productUser[]) => {
                const newItems = productUser.filter(item => item.productID !== itemId);
                // const totals = calculateTotals(newItems);


                saveToStorage(newItems);
                return newItems;
            });
        },

        // Clear entire productUser
        clearCart: () => {
            const emptyCart: productUser[] = []

            set(emptyCart);
            saveToStorage(emptyCart);
        },

        // Get item count for specific product
        getItemQuantity: (productId: string, variant = null) => {
            let quantity = 0;
            update(productUser => {
                const item = productUser.find(item =>
                    item.productID === productId
                );
                quantity = item?.quantity || 0;
                return productUser;
            });
            return quantity;
        },
    };
}

export const cartStore = createCartStore();