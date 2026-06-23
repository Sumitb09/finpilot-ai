import { askGemini } from "./ai.service";
import { buildPrompt } from "./promptBuilder";

import { Transaction } from "../../transactions/types/transaction";
import { ChatMessage } from "../types/chat";

export async function generateMonthlyReport(
  transactions: Transaction[],
  monthlyBudget: number
) {
  const history: ChatMessage[] = [];

  const prompt = `
${buildPrompt(
  "Generate a complete monthly financial report.",
  history,
  transactions,
  monthlyBudget
)}

Generate a professional financial report in Markdown.

Use exactly these headings:

# 📄 Monthly Financial Report

## Executive Summary

## Income Analysis

## Expense Analysis

## Budget Performance

## Savings Analysis

## Largest Expense

## Spending Categories

## Financial Health Score

## Actionable Recommendations

## Goals For Next Month

Rules:
- Use markdown headings.
- Use bullet points.
- Mention actual numbers.
- Never invent data.
- Keep under 500 words.
`;

  return askGemini(prompt);
}