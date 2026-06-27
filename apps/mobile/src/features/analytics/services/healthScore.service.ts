import { Transaction } from "../../transactions/types/transaction";
import {
  getCurrentMonthSummary,
  getAverageDailySpend,
} from "./analytics.service";

import { HealthScore } from "../types/health";

export function calculateHealthScore(
  transactions: Transaction[],
  monthlyBudget = 0
): HealthScore {

  const summary =
    getCurrentMonthSummary(transactions);

  const average =
    getAverageDailySpend(transactions);

  let score = 100;

  const savingsRate =
    summary.income === 0
      ? 0
      : (summary.savings /
          summary.income) *
        100;

  if (savingsRate < 10)
    score -= 25;

  else if (savingsRate < 20)
    score -= 10;

  let budgetUsage = 0;

  if (monthlyBudget > 0) {
    budgetUsage =
      (summary.expense /
        monthlyBudget) *
      100;

    if (budgetUsage > 100)
      score -= 25;

    else if (budgetUsage > 80)
      score -= 10;
  }

  const expenseRatio =
    summary.income === 0
      ? 100
      : (summary.expense /
          summary.income) *
        100;

  if (expenseRatio > 90)
    score -= 20;

  const consistency =
    Math.max(
      0,
      100 -
        average.amount / 10
    );

  score = Math.max(
    0,
    Math.min(score, 100)
  );

  const tips: string[] = [];

  if (budgetUsage > 100)
    tips.push(
      "You're exceeding your monthly budget."
    );

  if (savingsRate < 20)
    tips.push(
      "Increase your monthly savings."
    );

  if (expenseRatio > 90)
    tips.push(
      "Reduce unnecessary expenses."
    );

  if (tips.length === 0)
    tips.push(
      "Excellent financial discipline."
    );

  return {
    score,

    grade:
      score >= 90
        ? "A"
        : score >= 80
        ? "B"
        : score >= 70
        ? "C"
        : score >= 60
        ? "D"
        : "F",

    savingsRate,

    budgetUsage,

    expenseRatio,

    consistency,

    tips,
  };
}