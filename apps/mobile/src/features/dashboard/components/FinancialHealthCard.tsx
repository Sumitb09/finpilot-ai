import React from "react";
import { View, StyleSheet } from "react-native";

import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";
import CircularProgress from "../../../components/ui/CircularProgress";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  score: number;
  status: string;
  savingsRatio: number;
  expenseRatio: number;
  budgetUsage: number;
  largestExpenseRatio: number;
  categoryDiversity: number;
};

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metricRow}>
      <Typography>{label}</Typography>

      <Typography style={styles.metricValue}>
        {value}
      </Typography>
    </View>
  );
}

export default function FinancialHealthCard({
  score,
  status,
  savingsRatio,
  expenseRatio,
  budgetUsage,
  largestExpenseRatio,
  categoryDiversity,
}: Props) {
  const { palette } = useAppTheme();

  const color =
    score >= 90
      ? "#22C55E"
      : score >= 75
      ? "#3B82F6"
      : score >= 60
      ? "#F59E0B"
      : score >= 40
      ? "#F97316"
      : "#EF4444";

  return (
    <Card>
      <Typography
        variant="h3"
        style={styles.title}
      >
        💚 Financial Health
      </Typography>

      <View style={styles.row}>
        <CircularProgress
          progress={score}
          color={color}
          label={status}
        />

        <View style={styles.info}>
          <Typography
            variant="h2"
            style={{ color }}
          >
            {status}
          </Typography>

          <Typography
            style={[
              styles.description,
              {
                color: palette.subtext,
              },
            ]}
          >
            Your financial health is calculated
            from your savings, spending,
            budget usage and transaction
            patterns.
          </Typography>
        </View>
      </View>

      <View style={styles.divider} />

      <MetricRow
        label="💰 Savings Rate"
        value={`${Math.round(
          savingsRatio * 100
        )}%`}
      />

      <MetricRow
        label="💸 Expense Ratio"
        value={`${Math.round(
          expenseRatio * 100
        )}%`}
      />

      <MetricRow
        label="🎯 Budget Used"
        value={`${Math.round(
          budgetUsage * 100
        )}%`}
      />

      <MetricRow
        label="🛒 Largest Expense"
        value={`${Math.round(
          largestExpenseRatio * 100
        )}%`}
      />

      <MetricRow
        label="📊 Diversity"
        value={`${Math.round(
          categoryDiversity * 100
        )}%`}
      />

      <View style={styles.tip}>
        <Typography variant="h3">
          💡 AI Tip
        </Typography>

        <Typography
          style={{
            color: palette.subtext,
            marginTop: 8,
          }}
        >
          {score >= 90
            ? "Excellent financial discipline. Keep investing and maintaining your savings."
            : score >= 75
            ? "You're doing well. Reducing discretionary spending could push your score above 90."
            : score >= 60
            ? "Focus on increasing your savings rate while staying within your monthly budget."
            : "Reduce unnecessary expenses and improve your savings to strengthen your financial health."}
        </Typography>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 20,
  },

  description: {
    marginTop: 8,
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 24,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  metricValue: {
    fontWeight: "700",
  },

  tip: {
    marginTop: 20,
  },
});