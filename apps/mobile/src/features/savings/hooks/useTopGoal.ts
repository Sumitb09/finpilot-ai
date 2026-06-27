import { useMemo } from "react";

import { useGoals } from "./useGoals";

export function useTopGoal() {
  const { data = [] } =
    useGoals();

  return useMemo(() => {
    if (data.length === 0)
      return null;

    return [...data].sort(
      (a, b) =>
        b.saved_amount -
        a.saved_amount
    )[0];
  }, [data]);
}