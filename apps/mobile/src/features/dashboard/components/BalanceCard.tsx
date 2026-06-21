import React from "react";
import { Text, StyleSheet } from "react-native";

import Card from "../../../components/ui/Card";

type Props = {
  balance: string;
};

export default function BalanceCard({ balance }: Props) {
  return (
    <Card>
      <Text style={styles.label}>
        Total Balance
      </Text>

      <Text style={styles.balance}>
        {balance}
      </Text>

      <Text style={styles.change}>
        ▲ +18.5% this month
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#94A3B8",
    fontSize: 16,
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 8,
  },

  change: {
    color: "#22C55E",
    marginTop: 10,
    fontWeight: "600",
  },
});