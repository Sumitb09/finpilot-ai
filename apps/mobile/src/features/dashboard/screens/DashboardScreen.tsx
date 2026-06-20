import React from "react";

import Screen from "../../../components/ui/Screen";
import BalanceCard from "../../../components/ui/BalanceCard";
import QuickAction from "../../../components/ui/QuickAction";

import Header from "../components/Header";

export default function DashboardScreen() {
  return (
    <Screen>
      <Header />

      <BalanceCard balance="₹12,560" />

      <QuickAction
        title="Add Expense"
        onPress={() => {}}
      />

      <QuickAction
        title="AI Coach"
        onPress={() => {}}
      />
    </Screen>
  );
}