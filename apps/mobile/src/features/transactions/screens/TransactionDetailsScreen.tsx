import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";

import DetailRow from "../components/DetailRow";

import { useTransaction } from "../hooks/useTransaction";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams();

  const {
    data: transaction,
    isPending,
  } = useTransaction(id as string);

  const deleteMutation =
    useDeleteTransaction();

  if (isPending || !transaction) {
    return <Screen />;
  }

  function handleDelete() {
    Alert.alert(
      "Delete Transaction",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteMutation.mutateAsync(
              transaction.id
            );

            router.back();
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>
        {transaction.categories?.icon ?? "💳"}{" "}
        {transaction.title}
      </Text>

      <DetailRow
        label="Amount"
        value={`₹${Number(
          transaction.amount
        ).toLocaleString()}`}
      />

      <DetailRow
        label="Type"
        value={transaction.type}
      />

      <DetailRow
        label="Category"
        value={
          transaction.categories?.name ??
          "Other"
        }
      />

      <DetailRow
        label="Date"
        value={transaction.transaction_date}
      />

      <DetailRow
        label="Note"
        value={
          transaction.note || "No notes"
        }
      />

      <Button
        title="Edit Transaction"
        onPress={() =>
          router.push(
            `/(protected)/edit-transaction/${transaction.id}`
          )
        }
      />

      <Text style={{ height: 12 }} />

      <Button
        title="Delete Transaction"
        onPress={handleDelete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
  },
});