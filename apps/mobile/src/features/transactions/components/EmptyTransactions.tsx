import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import Typography from "../../../components/ui/Typography";
import Button from "../../../components/ui/Button";

export default function EmptyTransactions() {
  return (
    <View style={styles.container}>
      <Typography
        variant="h1"
        style={styles.emoji}
      >
        💸
      </Typography>

      <Typography
        variant="h3"
        style={styles.title}
      >
        No Transactions Yet
      </Typography>

      <Typography style={styles.subtitle}>
        Start tracking your finances by adding
        your first transaction.
      </Typography>

      <Button
        title="Add Transaction"
        onPress={() =>
          router.push(
            "/(protected)/add-transaction"
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 60,
  },

  emoji: {
    fontSize: 60,
    marginBottom: 18,
  },

  title: {
    marginBottom: 10,
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 28,
  },
});