import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { router } from "expo-router";

import TransactionCard from "../../../components/ui/TransactionCard";

import { useAppTheme } from "../../../theme/useAppTheme";
import {
  formatCurrency,
  getCurrencySymbol,
} from "../../../utils/currency";

import { Transaction } from "../types/transaction";

import TransactionSkeleton from "./TransactionSkeleton";
import EmptyTransactions from "./EmptyTransactions";
import TransactionGroup from "./TransactionGroup";
import SwipeTransaction from "./SwipeTransaction";

import { groupTransactions } from "../utils/groupTransactions";
// import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

type Props = {
  data: Transaction[];
  currency: string;
  loading?: boolean;
  error?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function TransactionList({
  data,
  currency,
  loading = false,
  error = false,
  refreshing = false,
  onRefresh,
}: Props) {
  const { palette } = useAppTheme();

  // Uncomment when delete hook is created
  // const deleteMutation = useDeleteTransaction();

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
          {
            color: palette.subtext,
          },
        ]}
      >
        Failed to load transactions.
      </Text>
    );
  }

  if (data.length === 0) {
    return <EmptyTransactions />;
  }

  const grouped = groupTransactions(data);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.primary}
          />
        ) : undefined
      }
    >
      {Object.entries(grouped).map(
        ([title, transactions]) => {
          const total = transactions.reduce(
            (sum, transaction) =>
              transaction.type === "expense"
                ? sum -
                  Number(transaction.amount)
                : sum +
                  Number(transaction.amount),
            0
          );

          return (
            <TransactionGroup
              key={title}
              title={title}
              total={total}
              currency={getCurrencySymbol(
                currency
              )}
            >
              {transactions.map(
                (transaction) => (
                  <SwipeTransaction
                    key={transaction.id}
                    onEdit={() =>
                      router.push(
                        `/(protected)/edit-transaction/${transaction.id}`
                      )
                    }
                    onDelete={() => {
                      Alert.alert(
                        "Delete Transaction",
                        "Are you sure you want to delete this transaction?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Delete",
                            style: "destructive",
                            onPress: () => {
                              // deleteMutation.mutate(transaction.id);

                              console.log(
                                "Delete:",
                                transaction.id
                              );
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <TransactionCard
  id={transaction.id}
  emoji={transaction.categories?.icon ?? "💳"}
  title={transaction.title}
  amount={`${transaction.type === "expense" ? "-" : "+"}${formatCurrency(
    Number(transaction.amount),
    currency
  )}`}
  income={transaction.type === "income"}
  category={transaction.categories?.name ?? "General"}
  date={new Date(transaction.transaction_date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
  paymentMethod={transaction.payment_method}
  hasReceipt={Boolean(transaction.receipt_image)}
  isVoice={transaction.source === "voice"}
  recurring={Boolean((transaction as any).recurring)}
/>
                  </SwipeTransaction>
                )
              )}
            </TransactionGroup>
          );
        }
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 140,
  },

  message: {
    textAlign: "center",
    marginVertical: 32,
    fontSize: 16,
  },
});