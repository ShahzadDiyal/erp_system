import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface VariantPayload {
    variant_name: string;
    variant_value: string;
    cost_price: number;
    selling_price: number;
    additional_price: number;
}

export interface CreateProductPayload {
    product_name: string;
    category_id: number;
    description: string;
    unit: string;
    cost_price: number;
    selling_price: number;
    has_variants: boolean;
    low_stock_alert: number;
    is_active: boolean;
    images: string[]; // backend currently expects []
    variants: VariantPayload[];
}


export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, // same as your other apis
        prepareHeaders: (headers) => {
            const auth =
                localStorage.getItem('erp_auth')

            if (auth) {
                const token = JSON.parse(auth)?.token;
                if (token) headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: ['Products'],

    endpoints: (builder) => ({
        createProduct: builder.mutation<any, CreateProductPayload>({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products'],
        }),


        // Add this endpoint to inventoryApi:
        getProducts: builder.query<any, void>({
            query: () => ({
                url: '/products',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            }),
            
            providesTags: ['Products'],
        }),
    }),
});

export const { useCreateProductMutation, useGetProductsQuery } = inventoryApi;