export function getHealthInsight(
    score: number
  ) {
    if (score >= 90) {
      return "Outstanding financial discipline. Keep it up!";
    }
  
    if (score >= 75) {
      return "Great progress. Reducing discretionary spending could push you above 90.";
    }
  
    if (score >= 60) {
      return "Your finances are stable, but increasing savings will have the biggest impact.";
    }
  
    if (score >= 40) {
      return "You're overspending relative to your income. Focus on your largest expense categories.";
    }
  
    return "Your financial health needs attention. Start with a budget and reduce unnecessary expenses.";
  }