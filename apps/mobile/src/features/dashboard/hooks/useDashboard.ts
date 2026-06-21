import { useMemo } from "react";

import { useTransactions } from "../../transactions/hooks/useTransactions";
import { useProfile } from "../../settings/hooks/useProfile";

import {
  getCategoryBreakdown,
} from "../services/dashboard.service";

import {
  getMonthlyAnalytics,
} from "../services/analytics.service";

export function useDashboard() {
  const {
    data = [],
    isPending: transactionsLoading,
  } = useTransactions();

  const {
    data: profile,
    isPending: profileLoading,
  } = useProfile();

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    data.forEach((transaction) => {
      if (transaction.type === "income") {
        income += Number(transaction.amount);
      } else {
        expense += Number(transaction.amount);
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
      savings: income - expense,
    };
  }, [data]);

  const categories = useMemo(
    () => getCategoryBreakdown(data),
    [data]
  );

  const analytics = useMemo(
    () => getMonthlyAnalytics(data),
    [data]
  );

  return {
    transactions: data,

    totals,

    categories,

    analytics,

    profile,

    isPending:
      transactionsLoading || profileLoading,
  };
}