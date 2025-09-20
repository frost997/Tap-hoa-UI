// =================================
// STEP 1: API CLIENT SETUP
// =================================
// src/lib/utils/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

// API methods
export const api = {
    // Auth endpoints
    auth: {
        login: (credentials: any) => apiClient.post('/auth/login', credentials),
        register: (userData: any) => apiClient.post('/auth/signUp', userData),
        logout: () => apiClient.post('/auth/logout'),
        getProfile: () => apiClient.get('/auth/profile'),
        // refreshToken: () => apiClient.post('/auth/refresh'),
        // forgotPassword: (email: any) => apiClient.post('/auth/forgot-password', {email}),
        // resetPassword: (token: any, password: any) => apiClient.post('/auth/reset-password', {token, password}),
    },

    // User endpoints
    user: {
        getUser: () => apiClient.get('/user'),
        updateProfile: (userData: any) => apiClient.put('/user/profile', userData),
        changePassword: (passwords: any) => apiClient.put('/user/change-password', passwords),
    },

    // Product endpoints
    products: {
        getByName: (params = {}) => apiClient.get('/products', {params}),
        getById: (id: any) => apiClient.get(`/products/${id}`),
        // getByCategory: (categoryId: any, params = {}) => apiClient.get(`/products/category/${categoryId}`, {params}),
        // search: (query: any, params = {}) => apiClient.get(`/products/search`, {params: {q: query, ...params}}),
    },

    // Category endpoints
    categories: {
        getAll: () => apiClient.get('/categories'),
        getById: (id: any) => apiClient.get(`/categories/${id}`),
    },

    // Cart endpoints (if you need server-side cart)
    productUser: {
        get: () => apiClient.get('/cart'),
        add: (productId: any, quantity: any, variant = null) => apiClient.post('/cart/add', {
            productId,
            quantity,
            variant
        }),
        update: (itemId: any, quantity: any) => apiClient.put(`/cart/items/${itemId}`, {quantity}),
        remove: (itemId: any) => apiClient.delete(`/cart/items/${itemId}`),
        clear: () => apiClient.delete('/cart'),
    },


    // Admin endpoints
    // admin: {
    //     products: {
    //         create: (productData: any) => apiClient.post('/admin/products', productData),
    //         update: (id: any, productData: any) => apiClient.put(`/admin/products/${id}`, productData),
    //         delete: (id: any) => apiClient.delete(`/admin/products/${id}`),
    //     },
    //     users: {
    //         getAll: (params = {}) => apiClient.get('/admin/users', {params}),
    //         getById: (id: any) => apiClient.get(`/admin/users/${id}`),
    //     },
    // },
};