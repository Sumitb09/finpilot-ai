import { Transaction } from "../../transactions/types/transaction";

import {
  getLargestExpense,
  getAverageDailySpend,
  getCurrentMonthSummary,
} from "./analytics.service";

export function generateInsights(
  transactions: Transaction[],
  monthlyBudget = 0
): string[] {
  const insights: string[] = [];

  const summary =
    getCurrentMonthSummary(transactions);

  const largest =
    getLargestExpense(transactions);

  const average =
    getAverageDailySpend(transactions);

  if (summary.expense === 0) {
    insights.push(
      "Start tracking your expenses to unlock AI insights."
    );

    return insights;
  }

  if (largest) {
    insights.push(
      `Your largest expense was ₹${largest.amount.toLocaleString()} on "${largest.title}".`
    );
  }

  insights.push(
    `Your average daily spending is ₹${average.amount.toLocaleString()}.`
  );

  if (
    monthlyBudget > 0 &&
    summary.expense > monthlyBudget
  ) {
    insights.push(
      `You have exceeded your monthly budget by ₹${(
        summary.expense - monthlyBudget
      ).toLocaleString()}.`
    );
  }

  if (
    monthlyBudget > 0 &&
    summary.expense <= monthlyBudget
  ) {
    insights.push(
      `You still have ₹${(
        monthlyBudget - summary.expense
      ).toLocaleString()} left in your monthly budget.`
    );
  }

  if (summary.savings > 0) {
    insights.push(
      `You've saved ₹${summary.savings.toLocaleString()} this month. Great job!`
    );
  }

  return insights;
}