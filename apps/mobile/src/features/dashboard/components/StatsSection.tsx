import React from "react";
import { View, StyleSheet } from "react-native";

import StatCard from "../../../components/ui/StatCard";

type Props = {
  income: number;
  expense: number;
  savings: number;
};

export default function StatsSection({
  income,
  expense,
  savings,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <StatCard
          title="Income"
          value={`₹${income.toLocaleString()}`}
          color="#22C55E"
        />
      </View>

      <View style={styles.card}>
        <StatCard
          title="Expense"
          value={`₹${expense.toLocaleString()}`}
          color="#EF4444"
        />
      </View>

      <View style={styles.card}>
        <StatCard
          title="Savings"
          value={`₹${savings.toLocaleString()}`}
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