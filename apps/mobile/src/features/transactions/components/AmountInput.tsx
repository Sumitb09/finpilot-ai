import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getCurrencySymbol } from "../../../utils/currency";

type Props = {
  value: string;
  currency: string;
  onChangeText: (text: string) => void;
};

export default function AmountInput({
  value,
  currency,
  onChangeText,
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
      <Typography
        style={[
          styles.label,
          {
            color: palette.subtext,
          },
        ]}
      >
        Amount
      </Typography>

      <View style={styles.amountRow}>
        <Typography
          style={[
            styles.currency,
            {
              color: palette.primary,
            },
          ]}
        >
          {getCurrencySymbol(currency)}
        </Typography>

        <TextInput
          value={value}
          onChangeText={(text) =>
            onChangeText(
              text.replace(/[^0-9.]/g, "")
            )
          }
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={
            palette.subtext
          }
          style={[
            styles.input,
            {
              color: palette.text,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 16,
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  currency: {
    fontSize: 42,
    fontWeight: "700",
    marginRight: 8,
  },

  input: {
    minWidth: 150,
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
    padding: 0,
  },
});