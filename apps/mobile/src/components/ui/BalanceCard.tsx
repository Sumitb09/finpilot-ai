import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  balance: string;
};

export default function BalanceCard({ balance }: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: palette.secondaryText,
          },
        ]}
      >
        Current Balance
      </Text>

      <Text
        style={[
          styles.balance,
          {
            color: palette.text,
          },
        ]}
      >
        {balance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    marginTop: 30,
  },

  label: {
    fontSize: 16,
  },

  balance: {
    fontSize: 38,
    fontWeight: "700",
    marginTop: 8,
  },
});