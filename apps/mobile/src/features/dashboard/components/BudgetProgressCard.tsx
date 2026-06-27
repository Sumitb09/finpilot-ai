import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import Card from "../../../components/common/Card";
import { useAppTheme } from "../../../theme/useAppTheme";
import { formatCurrency } from "../../../utils/currency";

type Props = {
  spent: number;
  budget: number;
  currency: string;
};

export default function BudgetProgressCard({
  spent,
  budget,
  currency,
}: Props) {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  const percentage =
    budget === 0
      ? 0
      : Math.min(
          Math.round((spent / budget) * 100),
          100
        );

  const remaining = Math.max(
    budget - spent,
    0
  );

  const progressColor =
    percentage >= 100
      ? "#EF4444"
      : percentage >= 80
      ? "#F59E0B"
      : "#22C55E";

  const status =
    percentage >= 100
      ? t("analytics.exceeded")
      : percentage >= 80
      ? t("analytics.warning")
      : t("analytics.healthy");

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.left}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor:
                  progressColor + "15",
              },
            ]}
          >
            <Ionicons
              name="wallet"
              size={22}
              color={progressColor}
            />
          </View>

          <View>
            <Text
              style={[
                styles.title,
                { color: palette.text },
              ]}
            >
              {t(
                "analytics.monthlyBudget"
              )}
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: palette.subtext,
                },
              ]}
            >
              {percentage}%{" "}
              {t("analytics.used")}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.status,
            {
              backgroundColor:
                progressColor + "15",
            },
          ]}
        >
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  progressColor,
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color: progressColor,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      {/* Center */}
      <View style={styles.center}>
        <Text
          style={[
            styles.remainingValue,
            {
              color:
                remaining > 0
                  ? palette.text
                  : "#EF4444",
            },
          ]}
        >
          {formatCurrency(
            remaining,
            currency
          )}
        </Text>

        <Text
          style={[
            styles.remainingLabel,
            {
              color: palette.subtext,
            },
          ]}
        >
          {t(
            "analytics.remaining"
          )}
        </Text>
      </View>

      {/* Progress */}
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
            styles.progress,
            {
              width: `${percentage}%`,
              backgroundColor:
                progressColor,
            },
          ]}
        />
      </View>

      <View style={styles.amountRow}>
        <Text
          style={{
            color: palette.subtext,
          }}
        >
          {formatCurrency(
            spent,
            currency
          )}
        </Text>

        <Text
          style={{
            color: palette.subtext,
          }}
        >
          {formatCurrency(
            budget,
            currency
          )}
        </Text>
      </View>

      <Text
        style={[
          styles.description,
          {
            color: palette.subtext,
          },
        ]}
      >
        {formatCurrency(
          spent,
          currency
        )}{" "}
        {t("analytics.of")}{" "}
        {formatCurrency(
          budget,
          currency
        )}
      </Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Stat
          palette={palette}
          icon="trending-up"
          color="#3B82F6"
          label={t("analytics.spent")}
          value={formatCurrency(
            spent,
            currency
          )}
        />

        <Stat
          palette={palette}
          icon="wallet"
          color="#22C55E"
          label={t(
            "analytics.remaining"
          )}
          value={formatCurrency(
            remaining,
            currency
          )}
        />

        <Stat
          palette={palette}
          icon="flag"
          color="#A855F7"
          label={t(
            "analytics.budget"
          )}
          value={formatCurrency(
            budget,
            currency
          )}
        />
      </View>
    </Card>
  );
}

function Stat({
  icon,
  color,
  label,
  value,
  palette,
}: any) {
  return (
    <View
      style={[
        styles.stat,
        {
          backgroundColor:
            palette.surface,
        },
      ]}
    >
      <View
        style={[
          styles.statIcon,
          {
            backgroundColor:
              color + "15",
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={16}
          color={color}
        />
      </View>

      <Text
        style={[
          styles.statLabel,
          {
            color:
              palette.subtext,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.statValue,
          {
            color:
              palette.text,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 50,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontWeight: "700",
    fontSize: 13,
  },

  center: {
    alignItems: "center",
    marginTop: 28,
    marginBottom: 24,
  },

  remainingValue: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
  },

  remainingLabel: {
    marginTop: 6,
    fontSize: 15,
  },

  track: {
    height: 14,
    borderRadius: 20,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 20,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: 8,
  },

  description: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 26,
    gap: 12,
  },

  stat: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
  },

  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 12,
    marginBottom: 6,
  },

  statValue: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});