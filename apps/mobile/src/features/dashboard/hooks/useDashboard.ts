import { useMemo } from "react";

import { useTransactions } from "../../transactions/hooks/useTransactions";

export function useDashboard() {
  const {
    data = [],
    ...query
  } = useTransactions();

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    data.forEach((tx) => {
      if (tx.type === "income") {
        income += Number(tx.amount);
      } else {
        expense += Number(tx.amount);
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
      savings: income - expense,
    };
  }, [data]);

  return {
    totals,
    transactions: data,
    ...query,
  };
}