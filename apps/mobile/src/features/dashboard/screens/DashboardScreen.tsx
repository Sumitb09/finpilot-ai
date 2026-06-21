import React from "react";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";
import Section from "../../../components/ui/Section";

import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import BudgetProgressCard from "../components/BudgetProgressCard";
import MonthlyChart from "../components/MonthlyChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import StatsSection from "../components/StatsSection";
import QuickActions from "../components/QuickActions";
import AIInsightCard from "../components/AIInsightCard";
import FloatingButton from "../components/FloatingButton";

import TransactionList from "../../transactions/components/TransactionList";

import { useDashboard } from "../hooks/useDashboard";

export default function DashboardScreen() {
  const {
    transactions,
    totals,
    analytics,
    categories,
    profile,
    isPending,
  } = useDashboard();

  function handleAddExpense() {
    router.push("/(protected)/add-transaction");
  }

  if (isPending) {
    return <Screen />;
  }

  return (
    <Screen>
      <Header />

      <BalanceCard
        balance={`₹${totals.balance.toLocaleString()}`}
      />

      <BudgetProgressCard
        spent={totals.expense}
        budget={profile?.monthly_budget ?? 0}
      />

      <Section title="Monthly Spending">
        <MonthlyChart values={analytics} />
      </Section>

      <Section title="Spending by Category">
        <CategoryBreakdown
          categories={categories}
        />
      </Section>

      <StatsSection
        income={totals.income}
        expense={totals.expense}
        savings={totals.savings}
      />

      <QuickActions />

      <Section title="Recent Transactions">
        <TransactionList
          data={transactions.slice(0, 5)}
        />
      </Section>

      <AIInsightCard
        totals={totals}
        profile={profile}
      />

      <FloatingButton
        onPress={handleAddExpense}
      />
    </Screen>
  );
}