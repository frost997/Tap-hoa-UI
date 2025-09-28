// src/lib/types/cart.ts

export type ProductUser = {
    productID: string;
    userID: string;
    productName: number;
    quantity: number;
}

export interface CartItem extends ProductUser {
    price: number;
}

export interface Cart {
    id: string;
    items: CartItem[];
}
