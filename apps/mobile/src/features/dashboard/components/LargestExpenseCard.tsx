import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  title: string;
  category: string;
  amount: number;
};

export default function LargestExpenseCard({
  title,
  category,
  amount,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Card>
      <Typography
        variant="h3"
        style={styles.heading}
      >
        🔥 Largest Expense
      </Typography>

      <Typography
        variant="h2"
        style={{
          color: palette.text,
          marginBottom: 20,
        }}
      >
        {title}
      </Typography>

      <View style={styles.row}>
        <Typography
          style={{
            color: palette.subtext,
          }}
        >
          Category
        </Typography>

        <Typography>{category}</Typography>
      </View>

      <View style={styles.row}>
        <Typography
          style={{
            color: palette.subtext,
          }}
        >
          Amount
        </Typography>

        <Typography
          style={{
            color: palette.danger,
            fontWeight: "700",
          }}
        >
          ₹{amount.toLocaleString()}
        </Typography>
      </View>

      <Typography
        style={[
          styles.footer,
          {
            color: palette.subtext,
          },
        ]}
      >
        Your biggest expense this month.
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 18,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  footer: {
    marginTop: 20,
    fontSize: 13,
  },
});