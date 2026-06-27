import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

import { RecurringTransaction } from "../types/recurring";
import { formatCurrency } from "../../../utils/currency";

type Props = {
  recurring: RecurringTransaction;
  currency: string;
};

export default function RecurringCard({
  recurring,
  currency,
}: Props) {
  return (
    <Card>
      <Typography variant="h3">
        {recurring.title}
      </Typography>

      <Typography>
        {formatCurrency(
          Number(recurring.amount),
          currency
        )}
      </Typography>

      <Typography>
        {recurring.frequency}
      </Typography>

      <Typography>
        Next:{" "}
        {new Date(
          recurring.next_date
        ).toLocaleDateString()}
      </Typography>

      <Typography>
        {recurring.active
          ? "🟢 Active"
          : "⚪ Inactive"}
      </Typography>
    </Card>
  );
}

const styles = StyleSheet.create({});