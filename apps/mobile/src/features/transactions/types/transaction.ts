export type TransactionType =
  | "income"
  | "expense";

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Credit Card"
  | "Debit Card"
  | "Bank Transfer"
  | "Wallet";

export type TransactionSource =
  | "manual"
  | "receipt"
  | "voice"
  | "upi";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ReceiptItem {
  name: string;
  quantity?: number;
  price: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  amount: number;
  type: TransactionType;
  note: string | null;
  transaction_date: string;
  created_at: string;
  updated_at?: string;
  categories: Category;
  /* ---------- Merchant ---------- */

  merchant?: string | null;
  merchant_logo?: string | null;
  location?: string | null;
  /* ---------- Payment ---------- */

  payment_method?: PaymentMethod | null;
  upi_id?: string | null;
  transaction_reference?: string | null;
  currency?: string | null;
  /* ---------- Receipt ---------- */

  receipt_image?: string | null;
  receipt_items?: ReceiptItem[] | null;

  /* ---------- AI ---------- */

  ai_category?: string | null;
  ai_confidence?: number | null;
  tags?: string[] | null;

  /* ---------- Source ---------- */

  source?: TransactionSource;

  voice_entry?: string | null;

  recurring?: boolean;

  is_favorite?: boolean;
}
export interface CreateTransactionInput {
  category_id: string | null;

  title: string | null;

  amount: number;

  type: TransactionType | null;

  note?: string | null;

  transaction_date: string;

  merchant?: string;

  location?: string | null;

  payment_method?: PaymentMethod | null;

  upi_id?: string | null;

  transaction_reference?: string | null;

  currency?: string;

  receipt_image?: string | null;

  receipt_items?: ReceiptItem[] | null;

  voice_entry?: string;

  recurring?: boolean;

  source?: TransactionSource;

  tags?: string[] | null;
}