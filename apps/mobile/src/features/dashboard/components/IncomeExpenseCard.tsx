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
        Income vs Expense
      </Typography>

      <View style={styles.section}>
        <View style={styles.row}>
          <Typography>Income</Typography>

          <Typography>
            ₹{income.toLocaleString()}
          </Typography>
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
              styles.fill,
              {
                width: `${incomePercent}%`,
                backgroundColor: palette.success,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Typography>Expense</Typography>

          <Typography>
            ₹{expense.toLocaleString()}
          </Typography>
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
              styles.fill,
              {
                width: `${expensePercent}%`,
                backgroundColor: palette.danger,
              },
            ]}
          />
        </View>
      </View>

      <Typography
        style={{
          marginTop: 18,
          fontWeight: "700",
        }}
      >
        Savings ₹
        {(income - expense).toLocaleString()}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontWeight: "700",
  },

  section: {
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  track: {
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 20,
  },
});