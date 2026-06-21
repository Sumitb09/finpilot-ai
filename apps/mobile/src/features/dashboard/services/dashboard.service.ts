import { Transaction } from "../../transactions/types/transaction";

export interface CategorySummary {
  category: string;
  icon: string;
  total: number;
  percentage: number;
}

export function getCategoryBreakdown(
  transactions: Transaction[]
): CategorySummary[] {
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  const totalExpense = expenses.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  const map = new Map<
    string,
    {
      icon: string;
      total: number;
    }
  >();

  expenses.forEach((t) => {
    const categoryName =
      t.categories?.name ?? "Other";

    const icon =
      t.categories?.icon ?? "📦";

    const existing = map.get(categoryName);

    if (existing) {
      existing.total += Number(t.amount);
    } else {
      map.set(categoryName, {
        icon,
        total: Number(t.amount),
      });
    }
  });

  return [...map.entries()]
    .map(([category, value]) => ({
      category,
      icon: value.icon,
      total: value.total,
      percentage:
        totalExpense === 0
          ? 0
          : Math.round(
              (value.total / totalExpense) * 100
            ),
    }))
    .sort((a, b) => b.total - a.total);
}