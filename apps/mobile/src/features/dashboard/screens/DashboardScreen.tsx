import React, { useEffect } from "react";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";
import Section from "../../../components/ui/Section";
import Button from "../../../components/ui/Button";

import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import StatsSection from "../components/StatsSection";
import QuickActions from "../components/QuickActions";
import AIInsightCard from "../components/AIInsightCard";
import FloatingButton from "../components/FloatingButton";

import TransactionList from "../../transactions/components/TransactionList";

import { signOut } from "../../../services/auth/auth.service";
import { testConnection } from "../../../services/testConnection";

import { useDashboard } from "../hooks/useDashboard";


export default function DashboardScreen() {
  const { totals } = useDashboard();
  useEffect(() => {
    testConnection();
  }, []);

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  function handleAddExpense() {
    router.push("/(protected)/add-transaction");
  }

  return (
    <Screen>
      <Header />

      <BalanceCard
        balance={`₹${totals.balance.toLocaleString()}`}
      />

      <StatsSection
        income={totals.income}
        expense={totals.expense}
        savings={totals.savings}
      />

      <QuickActions />

      <Section title="Recent Transactions">
        <TransactionList />
      </Section>

      <AIInsightCard />

      <Button
        title="Logout"
        onPress={handleLogout}
      />

      <FloatingButton
        onPress={handleAddExpense}
      />
    </Screen>
  );
}