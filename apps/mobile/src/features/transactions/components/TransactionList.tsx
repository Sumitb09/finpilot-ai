import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";

import TransactionCard from "../../../components/ui/TransactionCard";
import { useTransactions } from "../hooks/useTransactions";

export default function TransactionList() {
  const {
    data = [],
    isPending,
    error,
  } = useTransactions();
  console.log("Transactions:", data);
  console.log("Error:", error);

  if (isPending) {
    return (
      <ActivityIndicator
        size="large"
        color="#2563EB"
      />
    );
  }

  if (error) {
    return (
      <Text style={styles.message}>
        Failed to load transactions.
      </Text>
    );
  }

  if (data.length === 0) {
    return (
      <Text style={styles.message}>
        No transactions yet.
      </Text>
    );
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TransactionCard
          emoji={item.categories?.icon ?? "💳"}
          title={item.title}
          amount={`${item.type === "expense" ? "-" : "+"}₹${Number(
            item.amount
          ).toLocaleString()}`}
          income={item.type === "income"}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  message: {
    color: "#94A3B8",
    textAlign: "center",
    marginVertical: 24,
  },
});