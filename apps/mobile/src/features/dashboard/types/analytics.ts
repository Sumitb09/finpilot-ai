export interface MonthlyAnalytics {
    month: string;
    income: number;
    expense: number;
    savings: number;
  }
  
  export interface IncomeExpenseAnalytics {
    income: number;
    expense: number;
  }
  
  export interface CurrentMonthSummary {
    income: number;
    expense: number;
    balance: number;
    savings: number;
  }
  
  export interface LargestTransaction {
    title: string;
    amount: number;
    category: string;
  }
  
  export interface DailyAverage {
    amount: number;
  }