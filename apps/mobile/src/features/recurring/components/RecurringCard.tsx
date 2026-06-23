import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";

import { RecurringTransaction } from "../types/recurring";

type Props = {
  recurring: RecurringTransaction;
};

export default function RecurringCard({
  recurring,
}: Props) {
  return (
    <Card>
      <Typography variant="h3">
        {recurring.title}
      </Typography>

      <Typography>
        ₹{Number(
          recurring.amount
        ).toLocaleString()}
      </Typography>

      <Typography>
        {recurring.frequency}
      </Typography>

      <Typography>
        Next:
        {" "}
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