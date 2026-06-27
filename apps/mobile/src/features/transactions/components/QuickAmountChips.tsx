import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getCurrencySymbol } from "../../../utils/currency";

type Props = {
  currency: string;
  onSelect: (amount: number) => void;
};

export default function QuickAmountChips({
  currency,
  onSelect,
}: Props) {
  const { palette } = useAppTheme();

  const amounts = useMemo(() => {
    switch (currency) {
      case "USD":
        return [5, 10, 20, 50, 100, 200];

      case "EUR":
        return [5, 10, 20, 50, 100, 200];

      case "GBP":
        return [5, 10, 20, 50, 100];

      case "JPY":
        return [500, 1000, 3000, 5000, 10000];

      case "AED":
        return [10, 20, 50, 100, 200];

      default:
        return [100, 200, 500, 1000, 2000, 5000];
    }
  }, [currency]);

  const symbol = getCurrencySymbol(currency);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {amounts.map((amount) => (
        <Pressable
          key={amount}
          onPress={() => onSelect(amount)}
          style={[
            styles.chip,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <Typography
            style={{
              color: palette.text,
              fontWeight: "700",
            }}
          >
            {symbol}
            {amount}
          </Typography>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },

  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },
});