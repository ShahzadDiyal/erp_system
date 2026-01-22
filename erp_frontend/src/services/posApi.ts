// // src/services/posApi.ts
// import { api } from './api';
// import type { Sale, POSShift, CreateSaleDTO, POSProduct } from '../types/pos';

// export const posApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get products for POS
//     getPOSProducts: builder.query<{ success: boolean; data: POSProduct[] }, { 
//       branch_id: number; 
//       search?: string;
//       category?: string;
//     }>({
//       query: (params) => ({ url: '/pos/products', params }),
//       providesTags: ['POSProduct'],
//     }),

//     // Scan product by barcode
//     scanProduct: builder.query<{ success: boolean; data: POSProduct }, { 
//       barcode: string; 
//       branch_id: number 
//     }>({
//       query: ({ barcode, branch_id }) => ({ 
//         url: `/pos/products/scan/${barcode}`,
//         params: { branch_id }
//       }),
//     }),

//     // Create new sale
//     createSale: builder.mutation<{ success: boolean; data: Sale }, CreateSaleDTO>({
//       query: (body) => ({ url: '/pos/sales', method: 'POST', body }),
//       invalidatesTags: ['Sale', 'POSShift'],
//     }),

//     // Get sales history
//     getSales: builder.query<{ success: boolean; data: Sale[]; total: number }, { 
//       page?: number; 
//       limit?: number;
//       branch_id?: number;
//       start_date?: string;
//       end_date?: string;
//     }>({
//       query: (params) => ({ url: '/pos/sales', params }),
//       providesTags: ['Sale'],
//     }),

//     // Get sale by ID
//     getSale: builder.query<{ success: boolean; data: Sale }, number>({
//       query: (id) => ({ url: `/pos/sales/${id}` }),
//       providesTags: (result, error, id) => [{ type: 'Sale', id }],
//     }),

//     // Process refund
//     refundSale: builder.mutation<{ success: boolean; data: Sale }, { 
//       sale_id: number; 
//       reason: string;
//       items?: Array<{ product_id: number; quantity: number }>;
//     }>({
//       query: ({ sale_id, ...body }) => ({ 
//         url: `/pos/sales/${sale_id}/refund`, 
//         method: 'POST', 
//         body 
//       }),
//       invalidatesTags: ['Sale'],
//     }),

//     // POS Shift Management
//     startShift: builder.mutation<{ success: boolean; data: POSShift }, { 
//       cashier_id: number; 
//       branch_id: number; 
//       opening_cash: number;
//     }>({
//       query: (body) => ({ url: '/pos/shifts/start', method: 'POST', body }),
//       invalidatesTags: ['POSShift'],
//     }),

//     closeShift: builder.mutation<{ success: boolean; data: POSShift }, { 
//       shift_id: number; 
//       closing_cash: number;
//     }>({
//       query: ({ shift_id, ...body }) => ({ 
//         url: `/pos/shifts/${shift_id}/close`, 
//         method: 'POST', 
//         body 
//       }),
//       invalidatesTags: ['POSShift'],
//     }),

//     getCurrentShift: builder.query<{ success: boolean; data: POSShift | null }, number>({
//       query: (branch_id) => ({ url: '/pos/shifts/current', params: { branch_id } }),
//       providesTags: ['POSShift'],
//     }),

//     getShifts: builder.query<{ success: boolean; data: POSShift[] }, { 
//       branch_id?: number;
//       start_date?: string;
//       end_date?: string;
//     }>({
//       query: (params) => ({ url: '/pos/shifts', params }),
//       providesTags: ['POSShift'],
//     }),
//   }),
// });

// export const {
//   useGetPOSProductsQuery,
//   useLazyScanProductQuery,
//   useCreateSaleMutation,
//   useGetSalesQuery,
//   useGetSaleQuery,
//   useRefundSaleMutation,
//   useStartShiftMutation,
//   useCloseShiftMutation,
//   useGetCurrentShiftQuery,
//   useGetShiftsQuery,
// } = posApi;