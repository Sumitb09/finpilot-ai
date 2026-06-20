import React, { useEffect } from "react";
import { View } from "react-native";

import Screen from "../../../components/ui/Screen";
import BalanceCard from "../../../components/ui/BalanceCard";
import SectionTitle from "../../../components/ui/SectionTitle";
import TransactionCard from "../../../components/ui/TransactionCard";
import QuickActionCard from "../../../components/ui/QuickActionCard";
import Button from "../../../components/ui/Button";
import { signOut } from "../../../services/auth/auth.service";
import { router } from "expo-router";

import Header from "../components/Header";

import { testConnection } from "../../../services/testConnection";

export default function DashboardScreen() {
  useEffect(() => {
    testConnection();
  }, []);

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

      <Button
        title="Logout"
        onPress={async () => {
          await signOut();
          router.replace("/login");
        }}
      />
    </Screen>
  );
}