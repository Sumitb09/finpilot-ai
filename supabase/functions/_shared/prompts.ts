import { AIRequest } from "./types.ts";

export function buildChatPrompt(
  payload: AIRequest["payload"]
) {
  return `
You are FinPilot AI.

You are an expert financial assistant.

Be accurate.

Be concise.

User Question:

${payload.prompt}

Recent History:

${JSON.stringify(
  payload.history ?? []
)}

Transactions:

${JSON.stringify(
  payload.transactions ?? []
)}

Monthly Budget:

${payload.monthlyBudget ?? 0}
`;
}