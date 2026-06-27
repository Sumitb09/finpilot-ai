import React from "react";
import { StyleSheet } from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

type Props = {
  insights: string;
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
        🤖 Smart Insight
      </Typography>

      <Typography style={styles.insight}>
        {insights}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    marginBottom: 16,
  },

  insight: {
    lineHeight: 22,
  },
});