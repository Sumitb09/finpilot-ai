import { useMemo } from "react";

import { useTransactions } from "../../transactions/hooks/useTransactions";

import {
  getExpenseTrend,
  getIncomeTrend,
} from "../services/analytics.service";

export function useAnalytics() {
  const {
    data = [],
    isPending,
  } = useTransactions();

  const expenseTrend = useMemo(
    () => getExpenseTrend(data),
    [data]
  );

  const incomeTrend = useMemo(
    () => getIncomeTrend(data),
    [data]
  );

  return {
    expenseTrend,
    incomeTrend,
    transactions: data,
    isPending,
  };
}