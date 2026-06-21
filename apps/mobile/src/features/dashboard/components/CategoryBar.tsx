import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  icon: string;
  name: string;
  amount: number;
  percentage: number;
};

export default function CategoryBar({
  icon,
  name,
  amount,
  percentage,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.icon}>{icon}</Text>

        <Text
          style={[
            styles.name,
            { color: palette.text },
          ]}
        >
          {name}
        </Text>

        <Text
          style={[
            styles.amount,
            { color: palette.subtext },
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
            styles.progress,
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
          { color: palette.subtext },
        ]}
      >
        {percentage}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  icon: {
    fontSize: 22,
    marginRight: 10,
  },

  name: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
  },

  amount: {
    fontWeight: "600",
  },

  track: {
    height: 8,
    borderRadius: 20,
    overflow: "hidden",
  },

  progress: {
    height: 8,
    borderRadius: 20,
  },

  percent: {
    marginTop: 6,
    alignSelf: "flex-end",
    fontSize: 13,
  },
});