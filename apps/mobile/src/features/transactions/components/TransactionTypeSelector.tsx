import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  value: "income" | "expense";
  onChange: (
    value: "income" | "expense"
  ) => void;
};

export default function TransactionTypeSelector({
  value,
  onChange,
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
      <Pressable
        onPress={() =>
          onChange("expense")
        }
        style={[
          styles.option,
          value === "expense" && {
            backgroundColor:
              "#EF4444",
          },
        ]}
      >
        <Typography
          style={[
            styles.text,
            {
              color:
                value === "expense"
                  ? "#FFFFFF"
                  : palette.text,
            },
          ]}
        >
          💸 Expense
        </Typography>
      </Pressable>

      <Pressable
        onPress={() =>
          onChange("income")
        }
        style={[
          styles.option,
          value === "income" && {
            backgroundColor:
              "#22C55E",
          },
        ]}
      >
        <Typography
          style={[
            styles.text,
            {
              color:
                value === "income"
                  ? "#FFFFFF"
                  : palette.text,
            },
          ]}
        >
          💰 Income
        </Typography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 18,
    borderWidth: 1,
    padding: 4,
    marginBottom: 24,
  },

  option: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});