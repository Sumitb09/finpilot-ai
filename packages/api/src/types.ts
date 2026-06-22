export interface ChatPayload {
    prompt: string;
    history?: unknown[];
    transactions?: unknown[];
    monthlyBudget?: number;
  }
  
  export interface AIResponse<T> {
    success: boolean;
    data: T;
    error?: string;
  }