import { ChatMessage } from "../types/chat";
import { Transaction } from "../../transactions/types/transaction";

import {
  getCurrentMonthSummary,
  getLargestExpense,
  getAverageDailySpend,
  getMonthlyAnalytics,
  MonthlyAnalytics,
} from "../../analytics/services/analytics.service";

import { formatCurrency } from "../../../utils/currency";

export function buildPrompt(
  question: string,
  history: ChatMessage[],
  transactions: Transaction[],
  monthlyBudget = 0,
  currency = "INR"
) {
  const summary =
    getCurrentMonthSummary(transactions);

  const largest =
    getLargestExpense(transactions);

  const average =
    getAverageDailySpend(transactions);

  const monthly =
    getMonthlyAnalytics(transactions);

  const historyText = history
    .map(
      (message) =>
        `${message.role.toUpperCase()}: ${message.content}`
    )
    .join("\n");

  return `
You are FinPilot AI, a professional personal finance coach.

Your goals:
- Help users save money.
- Explain spending trends.
- Give practical financial advice.
- Never invent financial data.
- Use only the information provided.
- Keep responses under 200 words.
- Use bullet points whenever possible.

Conversation History

${historyText}

Financial Summary

Income: ${formatCurrency(
  summary.income,
  currency
)}

Expense: ${formatCurrency(
  summary.expense,
  currency
)}

Savings: ${formatCurrency(
  summary.savings,
  currency
)}

Balance: ${formatCurrency(
  summary.balance,
  currency
)}

Monthly Budget: ${formatCurrency(
  monthlyBudget,
  currency
)}

Average Daily Spend: ${formatCurrency(
  average.amount,
  currency
)}

Largest Expense

${largest?.title ?? "None"}

Amount: ${formatCurrency(
  largest?.amount ?? 0,
  currency
)}

Category:
${largest?.category ?? "Unknown"}

Monthly Analytics

${monthly
  .map(
    (item: MonthlyAnalytics) =>
      `${item.month}: Income ${formatCurrency(
        item.income,
        currency
      )}, Expense ${formatCurrency(
        item.expense,
        currency
      )}, Savings ${formatCurrency(
        item.savings,
        currency
      )}`
  )
  .join("\n")}

User Question

${question}
`;
}