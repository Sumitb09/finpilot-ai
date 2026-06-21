type Totals = {
    income: number;
    expense: number;
    savings: number;
    balance: number;
  };
  
  type Profile = {
    monthly_budget: number;
  } | null;
  
  export function generateInsight(
    totals: Totals,
    profile: Profile
  ): string {
    if (totals.expense === 0) {
      return "Start tracking your expenses by adding your first transaction.";
    }
  
    if (totals.income === 0) {
      return "Add your income to unlock personalized financial insights.";
    }
  
    const savingsRate =
      (totals.savings / totals.income) * 100;
  
    if (
      profile &&
      profile.monthly_budget > 0 &&
      totals.expense > profile.monthly_budget
    ) {
      return "⚠️ You've exceeded your monthly budget.";
    }
  
    if (savingsRate >= 30) {
      return "🎉 Excellent! You're saving more than 30% of your income.";
    }
  
    if (savingsRate >= 15) {
      return "👍 Good progress! Your savings rate is healthy.";
    }
  
    return "💡 Try reducing discretionary spending to improve your savings.";
  }