import { useMemo } from "react";

import { useTransactions } from "../../transactions/hooks/useTransactions";
import { useProfile } from "../../settings/hooks/useProfile";

import { getCategoryBreakdown } from "../services/dashboard.service";

import {
  getMonthlyAnalytics,
  getLargestExpense,
} from "../../analytics/services/analytics.service";

import { calculateFinancialHealth } from "../../analytics/services/health-score.service";

import { generateInsight } from "../utils/generateInsight";

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

    let currentIncome = 0;
    let currentExpense = 0;

    let previousIncome = 0;
    let previousExpense = 0;

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonth =
      currentMonth === 0 ? 11 : currentMonth - 1;

    const previousYear =
      currentMonth === 0
        ? currentYear - 1
        : currentYear;

    data.forEach((transaction) => {
      const amount = Number(transaction.amount);

      if (transaction.type === "income") {
        income += amount;
      } else {
        expense += amount;
      }

      const transactionDate = new Date(
        transaction.created_at
      );

      const month = transactionDate.getMonth();
      const year = transactionDate.getFullYear();

      if (
        month === currentMonth &&
        year === currentYear
      ) {
        if (transaction.type === "income") {
          currentIncome += amount;
        } else {
          currentExpense += amount;
        }
      }

      if (
        month === previousMonth &&
        year === previousYear
      ) {
        if (transaction.type === "income") {
          previousIncome += amount;
        } else {
          previousExpense += amount;
        }
      }
    });

    const balance = income - expense;
    const savings = balance;

    const currentBalance =
      currentIncome - currentExpense;

    const previousBalance =
      previousIncome - previousExpense;

    let balanceChange: number | null = null;

    if (previousBalance !== 0) {
      balanceChange =
        ((currentBalance - previousBalance) /
          Math.abs(previousBalance)) *
        100;
    }

    return {
      income,
      expense,
      balance,
      savings,
      balanceChange,
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

  const largestExpense = useMemo(
    () => getLargestExpense(data),
    [data]
  );

  const insights = useMemo(
    () =>
      generateInsight(
        totals,
        profile
      ),
    [totals, profile]
  );

  const health = useMemo(
    () =>
      calculateFinancialHealth(
        data,
        profile?.monthly_budget ?? 0
      ),
    [data, profile]
  );

  return {
    transactions: data,
    totals,
    categories,
    largestExpense,
    analytics,
    profile,
    insights,
    health,
    isPending:
      transactionsLoading || profileLoading,
  };
}