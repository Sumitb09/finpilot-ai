import { ChatMessage } from "../types/chat";

import { Transaction } from "../../transactions/types/transaction";

import {
  getCurrentMonthSummary,
  getLargestExpense,
  getAverageDailySpend,
  getMonthlyAnalytics,
} from "../../dashboard/services/analytics.service";

export function buildPrompt(
  question: string,
  history: ChatMessage[],
  transactions: Transaction[],
  monthlyBudget = 0
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

Income: ₹${summary.income}

Expense: ₹${summary.expense}

Savings: ₹${summary.savings}

Balance: ₹${summary.balance}

Monthly Budget: ₹${monthlyBudget}

Average Daily Spend: ₹${average.amount}

Largest Expense:
${largest?.title ?? "None"}

Amount: ₹${largest?.amount ?? 0}

Category:
${largest?.category ?? "Unknown"}

Monthly Analytics

${monthly
  .map(
    (item) =>
      `${item.month}: Income ₹${item.income}, Expense ₹${item.expense}, Savings ₹${item.savings}`
  )
  .join("\n")}

User Question

${question}
`;
}