import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

import {
  TransactionFilter,
} from "../hooks/useTransactionFilters";

type Props = {
  value: TransactionFilter;
  onChange(
    value: TransactionFilter
  ): void;
};

const filters: TransactionFilter[] = [
  "all",
  "income",
  "expense",
];

export default function TransactionFilters({
  value,
  onChange,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const active =
          value === filter;

        return (
          <Pressable
            key={filter}
            onPress={() =>
              onChange(filter)
            }
            style={[
              styles.button,
              {
                backgroundColor: active
                  ? palette.primary
                  : palette.card,

                borderColor:
                  palette.border,
              },
            ]}
          >
            <Typography
              style={{
                color: active
                  ? "#FFF"
                  : palette.text,
              }}
            >
              {filter
                .charAt(0)
                .toUpperCase() +
                filter.slice(1)}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
  },

  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 12,

    borderWidth: 1,

    marginRight: 10,
  },
});