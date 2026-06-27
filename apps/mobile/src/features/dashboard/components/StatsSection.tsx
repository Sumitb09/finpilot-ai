import React from "react";
import { View, StyleSheet } from "react-native";

import StatCard from "../../../components/common/StatCard";
import { formatCurrency } from "../../../utils/currency";

type Props = {
  income: number;
  expense: number;
  savings: number;
  currency: string;
};

export default function StatsSection({
  income,
  expense,
  savings,
  currency,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <StatCard
          title="Income"
          value={formatCurrency(income, currency)}
          color="#22C55E"
        />
      </View>

      <View style={styles.card}>
        <StatCard
          title="Expense"
          value={formatCurrency(expense, currency)}
          color="#EF4444"
        />
      </View>

      <View style={styles.card}>
        <StatCard
          title="Savings"
          value={formatCurrency(savings, currency)}
          color="#3B82F6"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },

  card: {
    flex: 1,
    marginHorizontal: 4,
  },
});