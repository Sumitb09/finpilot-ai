import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, } from "react-native";
import { router } from "expo-router";
import TransactionCard from "../../../components/ui/TransactionCard";
import { useAppTheme } from "../../../theme/useAppTheme";
import { Transaction } from "../types/transaction";
import TransactionSkeleton from "./TransactionSkeleton";
import EmptyTransactions from "./EmptyTransactions";

type Props = {
  data: Transaction[];
  loading?: boolean;
  error?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function TransactionList({
  data,
  loading = false,
  error = false,
  refreshing = false,
  onRefresh,
}: Props) {
  const { palette } = useAppTheme();
  if (loading) {
    return (
      <TransactionSkeleton
        size="large"
        color={palette.primary}
      />
    );
  }
  if (error) {
    return (
      <Text
        style={[
          styles.message,
          { color: palette.subtext },
        ]}
      >
        Failed to load transactions.
      </Text>
    );
  }
  if (data.length === 0) {
    return (
      <EmptyTransactions />
   );
  }
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.primary}
          />
        ) : undefined
      }
      renderItem={({ item }) => (
        <TransactionCard
          id={item.id}
          emoji={item.categories?.icon ?? "💳"}
          title={item.title}
          amount={`${
            item.type === "expense" ? "-" : "+"
          }₹${Number(item.amount).toLocaleString()}`}
          income={item.type === "income"}
          onPress={() =>
            router.push({
              pathname:
                "/(protected)/transaction/[id]",
              params: {
                id: item.id,
              },
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    marginVertical: 24,
    fontSize: 16,
  },
});