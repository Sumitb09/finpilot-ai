import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  icon: string;
  title: string;
  amount: number;
  percentage: number;
};

export default function CategoryRow({
  icon,
  title,
  amount,
  percentage,
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
          {icon} {title}
        </Text>

        <Text
          style={[
            styles.amount,
            { color: palette.text },
          ]}
        >
          ₹{amount.toLocaleString()}
        </Text>
      </View>

      <View
        style={[
          styles.track,
          {
            backgroundColor: palette.border,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: palette.primary,
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.percent,
          {
            color: palette.secondaryText,
          },
        ]}
      >
        {percentage}% of expenses
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    fontWeight: "700",
  },

  track: {
    height: 8,
    borderRadius: 99,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: 99,
  },

  percent: {
    marginTop: 6,
    fontSize: 12,
  },
});