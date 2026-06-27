import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import Typography from "../../../components/ui/Typography";

import { formatCurrency } from "../../../utils/currency";

type Props = {
  amount: number;
  note?: string | null;
  date: string;
  currency: string;
};

export default function ContributionItem({
  amount,
  note,
  date,
  currency,
}: Props) {
  return (
    <View style={styles.row}>
      <View>
        <Typography
          variant="h3"
        >
          {formatCurrency(
            amount,
            currency
          )}
        </Typography>

        {!!note && (
          <Typography>
            {note}
          </Typography>
        )}
      </View>

      <Typography>
        {new Date(
          date
        ).toLocaleDateString()}
      </Typography>
    </View>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: "#333",
    },
  });