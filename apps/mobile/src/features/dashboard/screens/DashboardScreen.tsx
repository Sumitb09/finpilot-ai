import React from "react";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";

import Header from "../components/Header";
import DashboardHeader from "../components/DashboardHeader";
import HeroBalanceCard from "../components/HeroBalanceCard";
import BudgetProgressCard from "../components/BudgetProgressCard";
import QuickActions from "../components/QuickActions";
import AIInsightCard from "../components/AIInsightCard";
import FloatingButton from "../components/FloatingButton";
import IncomeExpenseCard from "../components/IncomeExpenseCard";
import FinancialHealthCard from "../components/FinancialHealthCard";
import MonthlyChart from "../components/MonthlyChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import LargestExpenseCard from "../components/LargestExpenseCard";

import Section from "../../../components/ui/Section";

import { useDashboard } from "../hooks/useDashboard";
import DashboardGoalCard from "../../savings/components/DashboardGoalCard";
import { useTopGoal } from "../../savings/hooks/useTopGoal";
import EmptyGoals from "../../savings/components/EmptyGoals";

export default function DashboardScreen() {
  const {
    totals,
    analytics,
    categories,
    largestExpense,
    profile,
    insights,
    health,
    isPending,
  } = useDashboard();
  const topGoal = useTopGoal();

  function handleAddExpense() {
    router.push("/(protected)/add-transaction");
  }

  if (isPending) {
    return <Screen />;
  }

  return (
    <Screen>
      <Header profile={profile} />

      <DashboardHeader />

      <HeroBalanceCard
        balance={totals.balance}
        income={totals.income}
        expense={totals.expense}
        savings={totals.savings}
        currency={profile?.currency ?? "INR"}
      />

      <QuickActions />

      <BudgetProgressCard
        spent={totals.expense}
        budget={profile?.monthly_budget ?? 0}
        currency={profile?.currency ?? "INR"}
      />


      {topGoal ? (
        <Section title="Savings Goal">
          <DashboardGoalCard
            goal={topGoal}
            currency={profile?.currency ?? "INR"}
          />
        </Section>
      ) : (
        <Section title="Savings Goal">
          <EmptyGoals
            onPress={() =>
              router.push("/(protected)/add-goal")
            }
          />
        </Section>
      )}

      <AIInsightCard insights={insights} />

      <Section title="Income vs Expense">
        <IncomeExpenseCard
          income={totals.income}
          expense={totals.expense}
          currency={profile?.currency ?? "INR"}
        />
      </Section>

      <Section title="Monthly Spending">
        <MonthlyChart values={analytics} />
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

      <FloatingButton
        onPress={handleAddExpense}
      />
    </Screen>
  );
}