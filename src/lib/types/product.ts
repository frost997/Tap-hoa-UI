// =================================
// STEP 3: TYPESCRIPT TYPES
// =================================

// src/lib/types/product.ts
export interface Product {
    id: string;
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