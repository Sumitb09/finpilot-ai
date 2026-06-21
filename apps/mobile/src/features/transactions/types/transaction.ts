export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
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

  categories: Category;
}

export interface CreateTransactionInput {
  category_id: string;

  title: string;

  amount: number;

  type: TransactionType;

  note?: string;

  transaction_date: string;
}