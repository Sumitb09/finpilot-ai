import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

import { useAppTheme } from "../../../theme/useAppTheme";
import { formatCurrency } from "../../../utils/currency";

type CategoryTrend = {
  name: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "same";
  icon: string;
};

type Props = {
  categories: CategoryTrend[];
  currency: string;
};

export default function CategoryTrendCard({
  categories,
  currency,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Card style={styles.card}>
      <Typography
        variant="h3"
        style={styles.heading}
      >
        📊 Category Intelligence
      </Typography>

      {categories.map((category) => (
        <View
          key={category.name}
          style={styles.row}
        >
          <View style={styles.left}>
            <Typography style={styles.icon}>
              {category.icon}
            </Typography>

            <View>
              <Typography style={styles.name}>
                {category.name}
              </Typography>

              <Typography
                style={{
                  color: palette.subtext,
                }}
              >
                {formatCurrency(
                  category.amount,
                  currency
                )}
              </Typography>
            </View>
          </View>

          <View style={styles.right}>
            <Typography
              style={{
                color:
                  category.trend === "up"
                    ? "#EF4444"
                    : category.trend === "down"
                    ? "#22C55E"
                    : palette.subtext,
                fontWeight: "700",
              }}
            >
              {category.trend === "up"
                ? "▲"
                : category.trend === "down"
                ? "▼"
                : "•"}{" "}
              {category.percentage}%
            </Typography>
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },

  heading: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  right: {
    alignItems: "flex-end",
  },

  icon: {
    fontSize: 26,
    marginRight: 14,
  },

  name: {
    fontWeight: "700",
    marginBottom: 2,
  },
});