import { useMemo } from "react";

import { Transaction } from "../../transactions/types/transaction";

import { calculateFinancialHealth } from "../services/health-score.service";

export function useHealthScore(
  transactions: Transaction[],
  budget: number
) {
  return useMemo(
    () =>
      calculateFinancialHealth(
        transactions,
        budget
      ),
    [transactions, budget]
  );
}