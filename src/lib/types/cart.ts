// src/lib/types/cart.ts

export type ProductUser = {
    productID: string;
    userID: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface CartItem extends ProductUser {
}

export interface Cart {
    id: string;
    items: CartItem[];
    totalItems: number,
    totalPrice: number,
}
