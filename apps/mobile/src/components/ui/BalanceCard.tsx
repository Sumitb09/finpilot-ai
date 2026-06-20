import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  balance: string;
};

export default function BalanceCard({ balance }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Current Balance</Text>

      <Text style={styles.balance}>{balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#12344A",
    borderRadius: 20,
    padding: 24,
    marginTop: 30,
  },

  label: {
    color: "#94A3B8",
    fontSize: 16,
  },

  balance: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "700",
    marginTop: 8,
  },
});