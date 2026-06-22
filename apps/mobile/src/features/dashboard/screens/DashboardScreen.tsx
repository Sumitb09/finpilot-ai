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
import IncomeExpenseCard from "../components/IncomeExpenseCard";
import LargestExpenseCard from "../components/LargestExpenseCard";
import FinancialHealthCard from "../components/FinancialHealthCard";

export default function DashboardScreen() {
  const {
    transactions,
    totals,
    analytics,
    categories,
    largestExpense,
    profile,
    insights,
    health,
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
      <FinancialHealthCard
        score={health.score}
        status={health.status}
        savingsRatio={health.savingsRatio}
        expenseRatio={health.expenseRatio}
        budgetUsage={health.budgetUsage}
        largestExpenseRatio={
          health.largestExpenseRatio
        }
        categoryDiversity={
          health.categoryDiversity
        }
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
      <Section title="Income vs Expense">
        <IncomeExpenseCard
          income={totals.income}
          expense={totals.expense}
        />
      </Section>

      <AIInsightCard
        insights={insights}
      />

      <FloatingButton
        onPress={handleAddExpense}
      />

      {largestExpense && (
        <Section title="Largest Expense">
          <LargestExpenseCard
            title={largestExpense.title}
            category={largestExpense.category}
            amount={largestExpense.amount}
          />
        </Section>
      )}
    </Screen>
  );
}