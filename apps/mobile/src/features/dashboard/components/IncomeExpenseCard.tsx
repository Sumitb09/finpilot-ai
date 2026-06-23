import React from "react";
import { View, StyleSheet } from "react-native";

import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  income: number;
  expense: number;
};

export default function IncomeExpenseCard({
  income,
  expense,
}: Props) {
  const { palette } = useAppTheme();

  const savings = income - expense;

  const total = income + expense;

  const incomePercent =
    total === 0 ? 0 : (income / total) * 100;

  const expensePercent =
    total === 0 ? 0 : (expense / total) * 100;

  return (
    <Card>
      <Typography
        variant="h3"
        style={styles.title}
      >
        📊 Income vs Expense
      </Typography>

      <StatBlock
        title="Income"
        value={income}
        percent={incomePercent}
        color={palette.success}
      />

      <StatBlock
        title="Expense"
        value={expense}
        percent={expensePercent}
        color={palette.danger}
      />

      <View
        style={[
          styles.savingsCard,
          {
            backgroundColor:
              savings >= 0
                ? "rgba(34,197,94,0.12)"
                : "rgba(239,68,68,0.12)",
          },
        ]}
      >
        <Typography
          style={{
            color:
              savings >= 0
                ? palette.success
                : palette.danger,
            fontWeight: "700",
          }}
        >
          {savings >= 0 ? "💰 Savings" : "⚠️ Deficit"}
        </Typography>

        <Typography
          variant="h2"
          style={{
            marginTop: 6,
            color:
              savings >= 0
                ? palette.success
                : palette.danger,
          }}
        >
          ₹{Math.abs(savings).toLocaleString()}
        </Typography>
      </View>
    </Card>
  );
}

type StatProps = {
  title: string;
  value: number;
  percent: number;
  color: string;
};

function StatBlock({
  title,
  value,
  percent,
  color,
}: StatProps) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <Typography>{title}</Typography>

        <Typography
          style={{ fontWeight: "700" }}
        >
          ₹{value.toLocaleString()}
        </Typography>
      </View>

      <View
        style={[
          styles.track,
          {
            backgroundColor:
              palette.border,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <Typography
        style={styles.percent}
      >
        {Math.round(percent)}%
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
  },

  block: {
    marginBottom: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  track: {
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 10,
  },

  percent: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.7,
  },

  savingsCard: {
    marginTop: 10,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },
});