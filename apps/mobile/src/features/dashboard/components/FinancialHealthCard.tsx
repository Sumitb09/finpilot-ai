import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import CircularProgress from "../../../components/ui/CircularProgress";
import { useAppTheme } from "../../../theme/useAppTheme";

import { FinancialHealth } from "../../analytics/services/health-score.service";

type Props = {
  health: FinancialHealth;
};

function ProgressMetric({
  icon,
  label,
  value,
  color,
  palette,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  color: string;
  palette: any;
}) {
  const percent = Math.max(0, Math.min(100, Math.round(value * 100)));

  return (
    <View
      style={[
        styles.metricCard,
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
        },
      ]}
    >
      <View style={styles.metricHeader}>
        <View style={styles.metricLeft}>
          <Ionicons
            name={icon}
            size={18}
            color={color}
          />

          <Typography
            style={styles.metricLabel}
          >
            {label}
          </Typography>
        </View>

        <Typography
          style={[
            styles.metricValue,
            { color },
          ]}
        >
          {percent}%
        </Typography>
      </View>

      <View
        style={[
          styles.progressTrack,
          {
            backgroundColor:
              palette.border,
          },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${percent}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

export default function FinancialHealthCard({
  health,
}: Props) {
  const { palette } = useAppTheme();

  const {
    score,
    status,
    savingsRatio,
    expenseRatio,
    budgetUsage,
    largestExpenseRatio,
    categoryDiversity,
  } = health;

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

  const description =
    score >= 90
      ? "Outstanding financial discipline. You're building long-term wealth."
      : score >= 75
      ? "You're managing your money well with only minor improvements needed."
      : score >= 60
      ? "A few smarter budgeting decisions can significantly improve your financial health."
      : "Your spending is outweighing your savings. Start reducing unnecessary expenses.";

  const aiTip =
    score >= 90
      ? "Excellent work! Continue investing consistently and maintain an emergency fund."
      : score >= 75
      ? "Reducing discretionary expenses can push your health score above 90."
      : score >= 60
      ? "Increase your monthly savings by 10% while staying within your budget."
      : "Focus on reducing large expenses and prioritize building a savings habit.";

  return (
    <Card>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Typography
            variant="h3"
            style={styles.title}
          >
            Financial Health
          </Typography>

          <Typography
            style={{
              color: palette.subtext,
              marginTop: 4,
            }}
          >
            Updated from your latest transactions
          </Typography>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: `${color}20`,
            },
          ]}
        >
          <Typography
            style={{
              color,
              fontWeight: "700",
            }}
          >
            {status}
          </Typography>
        </View>
      </View>

      {/* Hero */}

      <View style={styles.hero}>
        <CircularProgress
          progress={score}
          color={color}
          label={`${score}`}
        />

        <View style={styles.heroInfo}>
          <Typography
            variant="h1"
            style={{ color }}
          >
            {score}
          </Typography>

          <Typography
            variant="h2"
            style={{
              marginTop: 2,
            }}
          >
            {status}
          </Typography>

          <Typography
            style={{
              color: palette.subtext,
              marginTop: 8,
              lineHeight: 22,
            }}
          >
            {description}
          </Typography>
        </View>
      </View>

      {/* Metrics */}

      <View style={styles.metrics}>
        <ProgressMetric
          icon="wallet-outline"
          label="Savings Rate"
          value={savingsRatio}
          color={color}
          palette={palette}
        />

        <ProgressMetric
          icon="trending-down-outline"
          label="Expense Ratio"
          value={expenseRatio}
          color={color}
          palette={palette}
        />

        <ProgressMetric
          icon="pie-chart-outline"
          label="Budget Usage"
          value={budgetUsage}
          color={color}
          palette={palette}
        />

        <ProgressMetric
          icon="cart-outline"
          label="Largest Expense"
          value={largestExpenseRatio}
          color={color}
          palette={palette}
        />

        <ProgressMetric
          icon="analytics-outline"
          label="Category Diversity"
          value={categoryDiversity}
          color={color}
          palette={palette}
        />
      </View>

      {/* AI Insight */}

      <View
        style={[
          styles.aiCard,
          {
            backgroundColor: `${color}10`,
            borderColor: `${color}40`,
          },
        ]}
      >
        <View style={styles.aiHeader}>
          <Ionicons
            name="sparkles"
            size={22}
            color={color}
          />

          <Typography
            variant="h3"
            style={{
              marginLeft: 8,
            }}
          >
            AI Insight
          </Typography>
        </View>

        <Typography
          style={{
            marginTop: 12,
            color: palette.text,
            lineHeight: 23,
          }}
        >
          {aiTip}
        </Typography>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontWeight: "700",
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },

  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  heroInfo: {
    flex: 1,
    marginLeft: 22,
  },

  metrics: {
    gap: 14,
  },

  metricCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },

  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  metricLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  metricLabel: {
    marginLeft: 10,
    fontWeight: "600",
  },

  metricValue: {
    fontWeight: "700",
    fontSize: 16,
  },

  progressTrack: {
    height: 8,
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  aiCard: {
    marginTop: 26,
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
  },

  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});