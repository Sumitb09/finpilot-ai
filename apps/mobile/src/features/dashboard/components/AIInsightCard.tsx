import React from "react";
import { StyleSheet } from "react-native";

import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";

type Props = {
  insights: string[];
};

export default function AIInsightCard({
  insights,
}: Props) {
  return (
    <Card>
      <Typography
        variant="h3"
        style={styles.title}
      >
        🤖 Smart Insights
      </Typography>

      {insights.map((insight, index) => (
        <Typography
          key={index}
          style={styles.insight}
        >
          • {insight}
        </Typography>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    marginBottom: 16,
  },

  insight: {
    marginBottom: 12,
    lineHeight: 22,
  },
});