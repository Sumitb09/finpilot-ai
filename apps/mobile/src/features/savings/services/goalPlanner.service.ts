import { SavingsGoal } from "../types/goal";

export async function calculateGoalPlan(
  goal: SavingsGoal
) {
  const today = new Date();

  const target =
    goal.target_date
      ? new Date(goal.target_date)
      : today;

  const months = Math.max(
    1,
    Math.ceil(
      (target.getTime() -
        today.getTime()) /
        (1000 *
          60 *
          60 *
          24 *
          30)
    )
  );

  const remaining =
    Math.max(
      Number(goal.target_amount) -
        Number(goal.saved_amount),
      0
    );

  const monthly =
    remaining / months;

  let probability = 95;

  if (monthly > 50000)
    probability = 30;

  else if (monthly > 25000)
    probability = 50;

  else if (monthly > 10000)
    probability = 75;

  const status =
    probability >= 85
      ? "excellent"
      : probability >= 70
      ? "good"
      : probability >= 50
      ? "warning"
      : "critical";

  const tips: string[] = [];

  if (monthly > 10000)
    tips.push(
      "Increase monthly savings."
    );

  if (remaining > 100000)
    tips.push(
      "Consider investing part of your savings."
    );

  if (tips.length === 0)
    tips.push(
      "You're on track!"
    );

  return {
    monthlySaving:
      Math.round(monthly),

    monthsRemaining:
      months,

    remainingAmount:
      remaining,

    probability,

    estimatedCompletion:
      target.toDateString(),

    status,

    tips,
  };
}