// =================================
// STEP 3: TYPESCRIPT TYPES
// =================================

// src/lib/types/+page.svelte.ts
export interface Product {
    _id: string;
    productName: string;
    historyID: string;
    price: number;
    on_hand: number;
    saleCoupon: number;
    imageURL: string;
    createdAt: string;
    updatedAt: string;
}


export interface ProductHistories {
    id: string;
    createdAt: string;
    total_price: number;
    recently_add: string;
}