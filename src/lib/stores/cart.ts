import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import type {Product} from "$lib/types/product";
import type {Cart, CartItem} from "$lib/types/cart";

function createCartStore() {
    const cart: Cart = {
        id: '',
        items: [],
    }
    const {subscribe, set, update} = writable(cart);

    // Initialize cart from localStorage
    if (browser) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            set(cart);
        }
    }


    // Helper function to save to localStorage
    const saveToStorage = (cart: Cart) => {
        if (browser) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    return {
        addItem: (product: Product, quantity = 1, variant = null) => {
            update((cart: Cart) => {
                const existingItemIndex = cart.items.findIndex(item =>
                    item.productID === product.id
                );

                let newItems: CartItem[];
                if (existingItemIndex > -1) {
                    // Update existing item
                    newItems = [...cart.items];
                    newItems[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item
                    const newItem = {
                        productID: product.id,
                        userID: "",
                        productName: product.productName,
                        quantity: quantity,
                        price: product.price
                    }
                    newItems = [...cart.items, newItem];
                }

                const newCart = {
                    id: '',
                    items: newItems,
                };

                saveToStorage(newCart);
                return newCart;
            });
        },

        // Add item to cart
        clearCart: () => {
            const emptyCart = {
                id: '',
                items: [],
            };

            set(emptyCart);
            saveToStorage(emptyCart);
        },

        // Update item quantity
        getItemQuantity: (productID: string, variant = null) => {
            let quantity = 0;
            update((cart: Cart) => {
                const item = cart.items.find(item =>
                    item.productID === productID
                );
                quantity = item?.quantity || 0;
                return cart;
            });
            return quantity;
        },

        // Remove item from cart
        removeItem: (productID: string) => {
            update((cart: Cart) => {
                const newItems = cart.items.filter(item => item.productID !== productID);
                const newCart = {
                    id: '',
                    items: newItems,
                };

                saveToStorage(newCart);
                return newCart;
            });
        },

        // Clear entire cart
        subscribe,

        // Get item count for specific product
        updateQuantity: (productID: string, quantity: number) => {
            if (quantity <= 0) {
                return cartStore.removeItem(productID);
            }

            update((cart: Cart) => {
                const newItems = cart.items.map(item =>
                    item.productID === productID ? {...item, quantity} : item
                );

                const newCart = {
                    id: '',
                    items: newItems,
                };

                saveToStorage(newCart);
                return newCart;
            });
        },
    };
}

export const cartStore = createCartStore();
