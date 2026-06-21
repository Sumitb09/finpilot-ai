import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../../../components/ui/Card";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  spent: number;
  budget: number;
};

export default function BudgetProgressCard({
  spent,
  budget,
}: Props) {
  const { palette } = useAppTheme();

  const percentage =
    budget === 0
      ? 0
      : Math.min(Math.round((spent / budget) * 100), 100);

  const remaining = Math.max(budget - spent, 0);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: palette.text },
          ]}
        >
          Monthly Budget
        </Text>

        <Text
          style={[
            styles.percent,
            { color: palette.primary },
          ]}
        >
          {percentage}% Used
        </Text>
      </View>

      <View
        style={[
          styles.track,
          {
            backgroundColor: palette.border,
          },
        ]}
      >
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
              backgroundColor:
                percentage >= 100
                  ? "#EF4444"
                  : percentage >= 80
                  ? "#F59E0B"
                  : "#22C55E",
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <View>
          <Text
            style={[
              styles.label,
              { color: palette.subtext },
            ]}
          >
            Spent
          </Text>

          <Text
            style={[
              styles.value,
              { color: palette.text },
            ]}
          >
            ₹{spent.toLocaleString()}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={[
              styles.label,
              { color: palette.subtext },
            ]}
          >
            Remaining
          </Text>

          <Text
            style={[
              styles.value,
              {
                color:
                  remaining > 0
                    ? "#22C55E"
                    : "#EF4444",
              },
            ]}
          >
            ₹{remaining.toLocaleString()}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  percent: {
    fontSize: 14,
    fontWeight: "700",
  },

  track: {
    height: 10,
    borderRadius: 100,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 100,
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    fontSize: 17,
    fontWeight: "700",
  },
});