// src/features/sales/salesSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SaleItem, Customer } from '../../types/sales';

interface CartItem extends Omit<SaleItem, 'tax_amount' | 'total'> {
  tax_amount: number;
  total: number;
}

interface SalesState {
  cart: {
    items: CartItem[];
    customer: Customer | null;
    discount: number;
    invoiceType: 'b2b' | 'b2c' | 'quotation';
    notes: string;
  };
  selectedInvoice: number | null;
  filters: {
    status: string;
    dateRange: { start: string; end: string };
    customerType: string;
  };
  viewMode: 'list' | 'create' | 'edit';
}

const initialState: SalesState = {
  cart: {
    items: [],
    customer: null,
    discount: 0,
    invoiceType: 'b2b',
    notes: '',
  },
  selectedInvoice: null,
  filters: {
    status: 'all',
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    customerType: 'all',
  },
  viewMode: 'list',
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // Cart actions
    addToSalesCart: (state, action: PayloadAction<Omit<CartItem, 'tax_amount' | 'total'>>) => {
      const item = action.payload;
      const tax_amount = item.unit_price * item.quantity * (item.tax_rate / 100);
      const total = item.unit_price * item.quantity - item.discount + tax_amount;
      
      state.cart.items.push({ ...item, tax_amount, total });
    },

    removeFromSalesCart: (state, action: PayloadAction<number>) => {
      state.cart.items = state.cart.items.filter(item => item.product_id !== action.payload);
    },

    updateCartItem: (state, action: PayloadAction<{ product_id: number; quantity: number }>) => {
      const item = state.cart.items.find(i => i.product_id === action.payload.product_id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.tax_amount = item.unit_price * item.quantity * (item.tax_rate / 100);
        item.total = item.unit_price * item.quantity - item.discount + item.tax_amount;
      }
    },

    setCartCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.cart.customer = action.payload;
    },

    setCartDiscount: (state, action: PayloadAction<number>) => {
      state.cart.discount = action.payload;
    },

    setInvoiceType: (state, action: PayloadAction<'b2b' | 'b2c' | 'quotation'>) => {
      state.cart.invoiceType = action.payload;
    },

    clearSalesCart: (state) => {
      state.cart = initialState.cart;
    },

    // UI actions
    setSelectedInvoice: (state, action: PayloadAction<number | null>) => {
      state.selectedInvoice = action.payload;
    },

    setViewMode: (state, action: PayloadAction<'list' | 'create' | 'edit'>) => {
      state.viewMode = action.payload;
    },

    setFilters: (state, action: PayloadAction<Partial<SalesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  addToSalesCart,
  removeFromSalesCart,
  updateCartItem,
  setCartCustomer,
  setCartDiscount,
  setInvoiceType,
  clearSalesCart,
  setSelectedInvoice,
  setViewMode,
  setFilters,
} = salesSlice.actions;

export default salesSlice.reducer;