import React from "react";
import { View } from "react-native";

import Screen from "../../../components/ui/Screen";
import BalanceCard from "../../../components/ui/BalanceCard";
import SectionTitle from "../../../components/ui/SectionTitle";
import TransactionCard from "../../../components/ui/TransactionCard";
import QuickActionCard from "../../../components/ui/QuickActionCard";

import Header from "../components/Header";

export default function DashboardScreen() {
  return (
    <Screen>
      <Header />

      <BalanceCard balance="₹12,560" />

      <SectionTitle title="Quick Actions" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <QuickActionCard
          emoji="➕"
          title="Add Expense"
          onPress={() => {}}
        />

        <QuickActionCard
          emoji="🤖"
          title="AI Coach"
          onPress={() => {}}
        />

        <QuickActionCard
          emoji="📊"
          title="Analytics"
          onPress={() => {}}
        />

        <QuickActionCard
          emoji="💳"
          title="Budget"
          onPress={() => {}}
        />
      </View>

      <SectionTitle title="Recent Transactions" />

      <TransactionCard
        emoji="☕"
        title="Starbucks"
        amount="-₹450"
      />

      <TransactionCard
        emoji="🛒"
        title="Amazon"
        amount="-₹1,250"
      />

      <TransactionCard
        emoji="💰"
        title="Salary"
        amount="+₹55,000"
        income
      />
    </Screen>
  );
}