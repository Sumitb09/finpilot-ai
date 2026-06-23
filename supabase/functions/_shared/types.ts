export type AITask =
  | "chat"
  | "report"
  | "receipt"
  | "insight";

export interface AIRequest {
  task: 
    | "chat"
    | "report"
    | "receipt"
    | "insight";
  payload: {
    prompt?: string;
    history?: unknown[];
    transactions?: unknown[];
    monthlyBudget?: number;
    image?: string;
  };
}

export interface AIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}