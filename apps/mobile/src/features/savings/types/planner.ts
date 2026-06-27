export type GoalPlan = {
    monthlySaving: number;
  
    monthsRemaining: number;
  
    remainingAmount: number;
  
    probability: number;
  
    estimatedCompletion: string;
  
    status:
      | "excellent"
      | "good"
      | "warning"
      | "critical";
  
    tips: string[];
  };