import { Transaction } from "../../transactions/types/transaction";

export interface MonthlyAnalytics {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface IncomeExpenseAnalytics {
  income: number;
  expense: number;
}

export interface LargestExpense {
  title: string;
  amount: number;
  category: string;
}

export interface CurrentMonthSummary {
  income: number;
  expense: number;
  balance: number;
  savings: number;
}

export function getExpenseTrend(
  transactions: Transaction[]
) {
  const days = new Array(31).fill(0);

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const day = new Date(t.transaction_date).getDate();
      days[day - 1] += Number(t.amount);
    });

  return days;
}

export function getIncomeTrend(
  transactions: Transaction[]
) {
  const days = new Array(31).fill(0);

  transactions
    .filter((t) => t.type === "income")
    .forEach((t) => {
      const day = new Date(t.transaction_date).getDate();
      days[day - 1] += Number(t.amount);
    });

  return days;
}

export function getIncomeExpenseAnalytics(
  transactions: Transaction[]
): IncomeExpenseAnalytics {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }
  });

  return {
    income,
    expense,
  };
}

export function getCurrentMonthSummary(
  transactions: Transaction[]
): CurrentMonthSummary {
  const { income, expense } =
    getIncomeExpenseAnalytics(transactions);

  return {
    income,
    expense,
    balance: income - expense,
    savings: income - expense,
  };
}

export function getLargestExpense(
  transactions: Transaction[]
): LargestExpense | null {
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  if (expenses.length === 0) {
    return null;
  }

  const largest = expenses.reduce((a, b) =>
    Number(a.amount) > Number(b.amount)
      ? a
      : b
  );

  return {
    title: largest.title,
    amount: Number(largest.amount),
    category: largest.categories?.name ?? "Unknown",
  };
}

export function getAverageDailySpend(
  transactions: Transaction[]
) {
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  if (expenses.length === 0) {
    return {
      amount: 0,
    };
  }

  const total = expenses.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  const uniqueDays = new Set(
    expenses.map((t) =>
      new Date(t.transaction_date).toDateString()
    )
  ).size;

  return {
    amount: Math.round(
      total / Math.max(uniqueDays, 1)
    ),
  };
}

export function getMonthlyAnalytics(
  transactions: Transaction[]
): MonthlyAnalytics[] {
  const months = new Map<string, MonthlyAnalytics>();

  transactions.forEach((t) => {
    const month = new Date(
      t.transaction_date
    ).toLocaleString("default", {
      month: "short",
    });

    if (!months.has(month)) {
      months.set(month, {
        month,
        income: 0,
        expense: 0,
        savings: 0,
      });
    }

    const current = months.get(month)!;

    if (t.type === "income") {
      current.income += Number(t.amount);
    } else {
      current.expense += Number(t.amount);
    }

    current.savings =
      current.income - current.expense;
  });

  return [...months.values()];
}