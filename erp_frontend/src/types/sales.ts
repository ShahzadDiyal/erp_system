// src/features/sales/types/index.ts
export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  customer_type: 'b2b' | 'b2c';
  credit_limit?: number;
  current_balance: number;
}

export interface SaleItem {
  product_id: number;
  name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  discount: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  customer_id?: number;
  customer_name: string;
  invoice_type: 'b2b' | 'b2c' | 'quotation';
  branch_id: number;
  items: SaleItem[];
  subtotal: number;
  discount_total: number;
  tax_total: number;
  total_amount: number;
  payment_status: 'paid' | 'unpaid' | 'partial';
  payment_method?: string;
  installment_plan?: {
    total_amount: number;
    paid_amount: number;
    remaining_amount: number;
    installments: Array<{
      due_date: string;
      amount: number;
      status: 'paid' | 'pending';
    }>;
  };
  status: 'draft' | 'final' | 'cancelled' | 'returned';
  created_by: number;
  created_at: string;
  due_date?: string;
}

export interface CreateInvoiceDTO {
  customer_id?: number;
  customer_name: string;
  invoice_type: 'b2b' | 'b2c' | 'quotation';
  branch_id: number;
  items: Omit<SaleItem, 'name' | 'sku' | 'tax_amount' | 'total'>[];
  discount_total?: number;
  payment_method?: string;
  installment_plan?: {
    total_amount: number;
    installment_count: number;
    first_payment?: number;
  };
  due_date?: string;
}

export interface Quotation extends Omit<Invoice, 'invoice_type'> {
  invoice_type: 'quotation';
  valid_until: string;
  converted_to_invoice?: boolean;
}