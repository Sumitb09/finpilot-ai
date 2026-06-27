import React from "react";

import Screen from "../../../components/ui/Screen";
import Section from "../../../components/ui/Section";

import { useDashboard } from "../../dashboard/hooks/useDashboard";

import FinancialHealthCard from "../../dashboard/components/FinancialHealthCard";
import MonthlyChart from "../../dashboard/components/MonthlyChart";
import IncomeExpenseCard from "../../dashboard/components/IncomeExpenseCard";
import CategoryBreakdown from "../../dashboard/components/CategoryBreakdown";
import LargestExpenseCard from "../../dashboard/components/LargestExpenseCard";

export default function AnalyticsScreen() {
  const {
    profile,
    totals,
    analytics,
    categories,
    largestExpense,
    health,
    isPending,
  } = useDashboard();

  if (isPending) {
    return <Screen />;
  }

  return (
    <Screen>
      <Section title="Financial Health">
        <FinancialHealthCard health={health} />
      </Section>

      <Section title="Monthly Spending">
        <MonthlyChart values={analytics} />
      </Section>

      <Section title="Income vs Expense">
        <IncomeExpenseCard
          income={totals.income}
          expense={totals.expense}
          currency={profile?.currency ?? "INR"}
        />
      </Section>

      <Section title="Spending by Category">
        <CategoryBreakdown
          categories={categories}
          currency={profile?.currency ?? "INR"}
        />
      </Section>

      {largestExpense && (
        <Section title="Largest Expense">
          <LargestExpenseCard
            transaction={largestExpense}
            currency={profile?.currency ?? "INR"}
          />
        </Section>
      )}
    </Screen>
  );
}