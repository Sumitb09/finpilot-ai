import { Transaction } from "../../transactions/types/transaction";

export type FinancialHealth = {
  score: number;
  status: string;
  savingsRatio: number;
  expenseRatio: number;
  budgetUsage: number;
  largestExpenseRatio: number;
  categoryDiversity: number;
};

export function calculateFinancialHealth(
  transactions: Transaction[],
  monthlyBudget: number
): FinancialHealth {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const savings = Math.max(
    income - expense,
    0
  );

  const savingsRatio =
    income > 0 ? savings / income : 0;

  const expenseRatio =
    income > 0 ? expense / income : 1;

  const budgetUsage =
    monthlyBudget > 0
      ? expense / monthlyBudget
      : 0;

  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  const largestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((t) =>
            Number(t.amount)
          )
        )
      : 0;

  const largestExpenseRatio =
    expense > 0
      ? largestExpense / expense
      : 0;

  const uniqueCategories =
    new Set(
      expenses.map(
        (t) => t.category_id
      )
    ).size;

  const categoryDiversity =
    Math.min(uniqueCategories / 5, 1);

  let score = 0;

  // Savings (30)
  score += savingsRatio * 30;

  // Expense Ratio (20)
  score +=
    Math.max(0, 1 - expenseRatio) * 20;

  // Budget (25)
  score +=
    budgetUsage <= 1
      ? 25
      : Math.max(
          0,
          25 - (budgetUsage - 1) * 50
        );

  // Largest Expense (15)
  score +=
    Math.max(
      0,
      1 - largestExpenseRatio
    ) * 15;

  // Diversity (10)
  score +=
    categoryDiversity * 10;

  score = Math.round(
    Math.max(0, Math.min(100, score))
  );

  let status = "Critical";

  if (score >= 90) {
    status = "Excellent";
  } else if (score >= 75) {
    status = "Good";
  } else if (score >= 60) {
    status = "Fair";
  } else if (score >= 40) {
    status = "Poor";
  }

  return {
    score,
    status,
    savingsRatio,
    expenseRatio,
    budgetUsage,
    largestExpenseRatio,
    categoryDiversity,
  };
}