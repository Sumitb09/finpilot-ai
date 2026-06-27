import { useMemo } from "react";

import { calculateGoalPlan } from "../services/goalPlanner.service";

import { SavingsGoal } from "../types/goal";

export function useGoalPlanner(
  goal?: SavingsGoal
) {
  return useMemo(() => {
    if (!goal) return null;

    return calculateGoalPlan(goal);
  }, [goal]);
}