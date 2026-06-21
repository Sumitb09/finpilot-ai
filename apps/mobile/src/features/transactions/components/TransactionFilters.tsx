import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Filter = "all" | "income" | "expense";

type Props = {
  value: Filter;
  onChange(filter: Filter): void;
};

export default function TransactionFilters({
  value,
  onChange,
}: Props) {
  const { palette } = useAppTheme();

  const filters: Filter[] = [
    "all",
    "income",
    "expense",
  ];

  return (
    <View style={styles.container}>
      {filters.map((item) => {
        const active = item === value;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => onChange(item)}
            style={[
              styles.chip,
              {
                backgroundColor: active
                  ? palette.primary
                  : palette.card,
              },
            ]}
          >
            <Text
              style={{
                color: active
                  ? "#fff"
                  : palette.text,
                fontWeight: "600",
              }}
            >
              {item.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },
});