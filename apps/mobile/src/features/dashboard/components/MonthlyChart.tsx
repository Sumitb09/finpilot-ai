import React, { useMemo } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";
import { formatCurrency } from "../../../utils/currency";

import { MonthlyAnalytics } from "../../analytics/services/analytics.service";

const width = Dimensions.get("window").width - 56;

type Props = {
  values?: MonthlyAnalytics[];
};

export default function MonthlyChart({
  values = [],
}: Props) {
  const { palette } = useAppTheme();

  const labels =
    values.length > 0
      ? values.map((i) => i.month)
      : ["Jan"];

  const expenses =
    values.length > 0
      ? values.map((i) => Number(i.expense))
      : [0];

  const total = useMemo(
    () =>
      expenses.reduce(
        (a, b) => a + b,
        0
      ),
    [expenses]
  );

  const average =
    expenses.length > 0
      ? total / expenses.length
      : 0;

  const highest =
    Math.max(...expenses);

  const highestMonth =
    labels[
      expenses.indexOf(highest)
    ] ?? "-";

  const trend =
    expenses.length >= 2
      ? (
          ((expenses[
            expenses.length - 1
          ] -
            expenses[
              expenses.length - 2
            ]) /
            (expenses[
              expenses.length - 2
            ] || 1)) *
          100
        ).toFixed(1)
      : "0";

  return (
    <Card style={styles.card}>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Typography variant="h3">
            📈 Monthly Spending
          </Typography>

          <Typography
            style={{
              color:
                palette.subtext,
            }}
          >
            Expense trend
          </Typography>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                palette.primary +
                "20",
            },
          ]}
        >
          <Ionicons
            name={
              Number(trend) >= 0
                ? "trending-up"
                : "trending-down"
            }
            size={16}
            color={
              Number(trend) >= 0
                ? "#EF4444"
                : "#22C55E"
            }
          />

          <Typography
            style={{
              color:
                Number(trend) >= 0
                  ? "#EF4444"
                  : "#22C55E",
              marginLeft: 4,
              fontWeight: "700",
            }}
          >
            {Math.abs(
              Number(trend)
            )}
            %
          </Typography>
        </View>
      </View>

      {/* Stats */}

      <View style={styles.stats}>
        <Stat
          title="Total"
          value={formatCurrency(
            total,
            "INR"
          )}
        />

        <Stat
          title="Average"
          value={formatCurrency(
            average,
            "INR"
          )}
        />

        <Stat
          title="Highest"
          value={highestMonth}
        />
      </View>

      {/* Chart */}

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: expenses,
              strokeWidth: 4,
            },
          ],
        }}
        width={width}
        height={250}
        fromZero
        bezier
        withShadow
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines
        withVerticalLabels
        withHorizontalLabels
        chartConfig={{
          backgroundGradientFrom:
            palette.card,
          backgroundGradientTo:
            palette.card,

          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(24,128,242,${opacity})`,

          fillShadowGradient:
            palette.primary,

          fillShadowGradientOpacity:
            0.25,

          labelColor: () =>
            palette.subtext,

          propsForDots: {
            r: "6",
            strokeWidth: "3",
            stroke:
              palette.primary,
            fill: "#ffffff",
          },

          propsForBackgroundLines:
            {
              stroke:
                palette.border,
            },
        }}
        style={styles.chart}
      />

      {/* Footer */}

      <View
        style={[
          styles.footer,
          {
            backgroundColor:
              palette.primary +
              "12",
          },
        ]}
      >
        <Ionicons
          name="sparkles"
          size={22}
          color={palette.primary}
        />

        <Typography
          style={{
            marginLeft: 10,
            flex: 1,
          }}
        >
          Highest spending in{" "}
          <Typography
            style={{
              fontWeight: "700",
            }}
          >
            {highestMonth}
          </Typography>
          . Try reducing your
          expenses this month.
        </Typography>
      </View>
    </Card>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  const { palette } =
    useAppTheme();

  return (
    <View>
      <Typography
        style={{
          color:
            palette.subtext,
          fontSize: 13,
        }}
      >
        {title}
      </Typography>

      <Typography
        style={{
          marginTop: 6,
          fontWeight: "700",
        }}
      >
        {value}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    paddingBottom: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  stats: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 20,
  },

  chart: {
    borderRadius: 18,
    marginLeft: -14,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
});