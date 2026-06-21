import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

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
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.emoji}>{emoji}</Text>

        <Text
          style={[
            styles.title,
            {
              color: palette.text,
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: income ? palette.success : palette.danger,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 16,

    borderRadius: 14,

    borderWidth: 1,

    marginBottom: 12,
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
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
});