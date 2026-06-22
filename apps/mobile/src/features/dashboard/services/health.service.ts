export function calculateHealthScore(
    income: number,
    expense: number,
    savings: number
  ) {
    let score = 100;
  
    if (expense > income)
      score -= 35;
  
    if (savings < income * 0.2)
      score -= 20;
  
    if (income === 0)
      score = 0;
  
    return Math.max(score, 0);
  }