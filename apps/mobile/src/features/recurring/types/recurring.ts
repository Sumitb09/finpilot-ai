export type RecurringFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export interface RecurringTransaction {
  id: string;

  title: string;

  amount: number;

  type: "income" | "expense";

  category_id: string | null;

  frequency: RecurringFrequency;

  next_date: string;

  active: boolean;

  created_at: string;
}

export interface CreateRecurringTransaction {
  title: string;

  amount: number;

  type: "income" | "expense";

  category_id: string | null;

  frequency: RecurringFrequency;

  next_date: string;
}