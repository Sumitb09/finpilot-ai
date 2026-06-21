import React from "react";
import { Text, StyleSheet } from "react-native";

import Card from "../../../components/ui/Card";
import { generateInsight } from "../utils/generateInsight";

type Props = {
  totals: {
    income: number;
    expense: number;
    balance: number;
    savings: number;
  };
  profile: {
    monthly_budget: number;
  } | null;
};

export default function AIInsightCard({
  totals,
  profile,
}: Props) {
  const message = generateInsight(
    totals,
    profile
  );

  return (
    <Card>
      <Text style={styles.title}>
        🤖 AI Insight
      </Text>

      <Text style={styles.body}>
        {message}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
  },

  body: {
    color: "#CBD5E1",
    lineHeight: 24,
    fontSize: 15,
  },
});