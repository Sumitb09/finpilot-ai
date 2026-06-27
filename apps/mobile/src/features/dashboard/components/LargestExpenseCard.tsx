import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

import { useAppTheme } from "../../../theme/useAppTheme";
import { formatCurrency } from "../../../utils/currency";

import { Transaction } from "../../transactions/types/transaction";

type Props = {
  transaction: Transaction;
  currency: string;
};

export default function LargestExpenseCard({
  transaction,
  currency,
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
        {transaction.title}
      </Typography>

      <View style={styles.row}>
        <Typography
          style={{
            color: palette.subtext,
          }}
        >
          Category
        </Typography>

        <Typography>
          {transaction.categories?.name ??
            "Other"}
        </Typography>
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
          {formatCurrency(
            Number(transaction.amount),
            currency
          )}
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