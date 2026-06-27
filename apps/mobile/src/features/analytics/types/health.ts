export type HealthGrade =
  | "A"
  | "B"
  | "C"
  | "D"
  | "F";

export interface HealthScore {
  score: number;

  grade: HealthGrade;

  savingsRate: number;

  budgetUsage: number;

  expenseRatio: number;

  consistency: number;

  tips: string[];
}