import { Transaction } from "../../transactions/types/transaction";

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export function getMonthlyAnalytics(
  transactions: Transaction[]
): MonthlyData[] {
  const map = new Map<string, MonthlyData>();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.transaction_date);

    const month = date.toLocaleDateString("en-US", {
      month: "short",
    });

    if (!map.has(month)) {
      map.set(month, {
        month,
        income: 0,
        expense: 0,
        savings: 0,
      });
    }

    const value = map.get(month)!;

    if (transaction.type === "income") {
      value.income += Number(transaction.amount);
    } else {
      value.expense += Number(transaction.amount);
    }

    value.savings = value.income - value.expense;
  });

  return [...map.values()];
}