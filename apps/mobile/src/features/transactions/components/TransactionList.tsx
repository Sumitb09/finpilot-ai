import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";

import TransactionCard from "../../../components/ui/TransactionCard";
import { useTransactions } from "../hooks/useTransactions";
import { Transaction } from "../types/transaction";

type Props = {
  data?: Transaction[];
};

export default function TransactionList({
  data: externalData,
}: Props) {
  const {
    data = [],
    isPending,
    error,
  } = useTransactions();

  const transactions = externalData ?? data;

  if (isPending && !externalData) {
    return (
      <ActivityIndicator
        size="large"
        color="#2563EB"
      />
    );
  }

  if (error && !externalData) {
    return (
      <Text style={styles.message}>
        Failed to load transactions.
      </Text>
    );
  }

  if (transactions.length === 0) {
    return (
      <Text style={styles.message}>
        No transactions yet.
      </Text>
    );
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TransactionCard
          id={item.id}
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