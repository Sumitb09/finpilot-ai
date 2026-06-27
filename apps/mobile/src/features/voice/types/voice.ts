export interface ParsedVoiceTransaction {
    amount: number;
  
    merchant: string;
  
    category: string;
  
    type: "income" | "expense";
  
    date: string;
  
    note?: string;
  }