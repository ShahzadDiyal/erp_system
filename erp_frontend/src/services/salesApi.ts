// // src/services/salesApi.ts
// import { api } from './api';
// import type { Invoice, Customer, Quotation, CreateInvoiceDTO } from '../features/sales/types';

// export const salesApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // Invoices
//     getInvoices: builder.query<{ success: boolean; data: Invoice[]; total: number }, {
//       page?: number;
//       limit?: number;
//       branch_id?: number;
//       status?: string;
//       start_date?: string;
//       end_date?: string;
//     }>({
//       query: (params) => ({ url: '/sales/invoices', params }),
//       providesTags: ['Invoice'],
//     }),

//     getInvoice: builder.query<{ success: boolean; data: Invoice }, number>({
//       query: (id) => ({ url: `/sales/invoices/${id}` }),
//       providesTags: (result, error, id) => [{ type: 'Invoice', id }],
//     }),

//     createInvoice: builder.mutation<{ success: boolean; data: Invoice }, CreateInvoiceDTO>({
//       query: (body) => ({ url: '/sales/invoices', method: 'POST', body }),
//       invalidatesTags: ['Invoice', 'Quotation'],
//     }),

//     updateInvoice: builder.mutation<{ success: boolean; data: Invoice }, {
//       id: number;
//       data: Partial<CreateInvoiceDTO>;
//     }>({
//       query: ({ id, data }) => ({ 
//         url: `/sales/invoices/${id}`, 
//         method: 'PUT', 
//         body: data 
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: 'Invoice', id }],
//     }),

//     deleteInvoice: builder.mutation<{ success: boolean }, number>({
//       query: (id) => ({ url: `/sales/invoices/${id}`, method: 'DELETE' }),
//       invalidatesTags: ['Invoice'],
//     }),

//     // Quotations
//     getQuotations: builder.query<{ success: boolean; data: Quotation[]; total: number }, {
//       page?: number;
//       limit?: number;
//       branch_id?: number;
//     }>({
//       query: (params) => ({ url: '/sales/quotations', params }),
//       providesTags: ['Quotation'],
//     }),

//     createQuotation: builder.mutation<{ success: boolean; data: Quotation }, CreateInvoiceDTO>({
//       query: (body) => ({ 
//         url: '/sales/quotations', 
//         method: 'POST', 
//         body: { ...body, invoice_type: 'quotation' } 
//       }),
//       invalidatesTags: ['Quotation'],
//     }),

//     convertQuotationToInvoice: builder.mutation<{ success: boolean; data: Invoice }, number>({
//       query: (id) => ({ url: `/sales/quotations/${id}/convert`, method: 'POST' }),
//       invalidatesTags: ['Quotation', 'Invoice'],
//     }),

//     // Customers
//     getCustomers: builder.query<{ success: boolean; data: Customer[] }, {
//       search?: string;
//       customer_type?: string;
//     }>({
//       query: (params) => ({ url: '/sales/customers', params }),
//       providesTags: ['Customer'],
//     }),

//     searchCustomers: builder.query<{ success: boolean; data: Customer[] }, string>({
//       query: (search) => ({ url: '/sales/customers/search', params: { search } }),
//     }),

//     // Returns
//     createReturn: builder.mutation<{ success: boolean; data: Invoice }, {
//       invoice_id: number;
//       items: Array<{ product_id: number; quantity: number; reason: string }>;
//     }>({
//       query: (body) => ({ url: '/sales/returns', method: 'POST', body }),
//       invalidatesTags: ['Invoice'],
//     }),

//     // Reports
//     getSalesReport: builder.query<{ success: boolean; data: any }, {
//       start_date: string;
//       end_date: string;
//       branch_id?: number;
//       group_by?: 'day' | 'week' | 'month' | 'category';
//     }>({
//       query: (params) => ({ url: '/sales/reports', params }),
//     }),
//   }),
// });

// export const {
//   useGetInvoicesQuery,
//   useGetInvoiceQuery,
//   useCreateInvoiceMutation,
//   useUpdateInvoiceMutation,
//   useDeleteInvoiceMutation,
//   useGetQuotationsQuery,
//   useCreateQuotationMutation,
//   useConvertQuotationToInvoiceMutation,
//   useGetCustomersQuery,
//   useLazySearchCustomersQuery,
//   useCreateReturnMutation,
//   useGetSalesReportQuery,
// } = salesApi;