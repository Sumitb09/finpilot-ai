import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  title: string;
  total: number;
  currency: string;
  children: React.ReactNode;
};

export default function TransactionGroup({
  title,
  total,
  currency,
  children,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: palette.text },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.total,
            {
              color:
                total >= 0
                  ? palette.success
                  : palette.danger,
            },
          ]}
        >
          {currency}
          {Math.abs(total).toFixed(2)}
        </Text>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  total: {
    fontSize: 15,
    fontWeight: "700",
  },
});