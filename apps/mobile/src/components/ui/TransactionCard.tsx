import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  emoji: string;
  title: string;
  amount: string;
  income?: boolean;
};

export default function TransactionCard({
  emoji,
  title,
  amount,
  income = false,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{emoji}</Text>

        <Text style={styles.title}>{title}</Text>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: income ? "#22C55E" : "#EF4444",
          },
        ]}
      >
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#172554",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  emoji: {
    fontSize: 24,
    marginRight: 12,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
});