import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import type {Product} from "$lib/types/product";
import type {Cart} from "$lib/types/cart";

function createCartStore() {
    const {subscribe, set, update} = writable({
        items: [],
    });

    // Initialize cart from localStorage
    if (browser) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            set(cart);
        }
    }


    // Helper function to save to localStorage
    const saveToStorage = (cart) => {
        if (browser) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    return {
        subscribe,

        // Add item to cart
        addItem: (product: Product, quantity = 1, variant = null) => {
            update((cart: Cart) => {
                const existingItemIndex = cart.items.findIndex(item =>
                    item.productID === product.id
                );

                let newItems;
                if (existingItemIndex > -1) {
                    // Update existing item
                    newItems = [...cart.items];
                    newItems[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item
                    const newItem = {
                        id: `${product.id}`,
                        product,
                        quantity,
                        variant,
                        price: product.price,
                    };
                    newItems = [...cart.items, newItem];
                }

                const newCart = {
                    items: newItems,
                };

                saveToStorage(newCart);
                return newCart;
            });
        },

        // Update item quantity
        updateQuantity: (itemId, quantity) => {
            if (quantity <= 0) {
                return cartStore.removeItem(itemId);
            }

            update(cart => {
                const newItems = cart.items.map(item =>
                    item.id === itemId ? {...item, quantity} : item
                );

                const newCart = {
                    items: newItems,
                };

                saveToStorage(newCart);
                return newCart;
            });
        },

        // Remove item from cart
        removeItem: (itemId) => {
            update(cart => {
                const newItems = cart.items.filter(item => item.id !== itemId);
                const newCart = {
                    items: newItems,
                };

                saveToStorage(newCart);
                return newCart;
            });
        },

        // Clear entire cart
        clearCart: () => {
            const emptyCart = {
                items: [],
                totalItems: 0,
                totalPrice: 0,
            };

            set(emptyCart);
            saveToStorage(emptyCart);
        },

        // Get item count for specific product
        getItemQuantity: (productId, variant = null) => {
            let quantity = 0;
            update(cart => {
                const item = cart.items.find(item =>
                    item.product.id === productId &&
                    JSON.stringify(item.variant) === JSON.stringify(variant)
                );
                quantity = item?.quantity || 0;
                return cart;
            });
            return quantity;
        },
    };
}

export const cartStore = createCartStore();
