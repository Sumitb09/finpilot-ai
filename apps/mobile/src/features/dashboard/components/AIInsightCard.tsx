import React from "react";
import { Text, StyleSheet } from "react-native";

import Card from "../../../components/ui/Card";

export default function AIInsightCard() {
  return (
    <Card>
      <Text style={styles.title}>
        🤖 AI Insight
      </Text>

      <Text style={styles.body}>
        You spent 21% more on Food this week.
        Reducing food delivery by ₹2,000 could
        improve your monthly savings.
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