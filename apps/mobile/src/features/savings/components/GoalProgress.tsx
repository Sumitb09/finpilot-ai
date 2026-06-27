import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  progress: number;
};

export default function GoalProgress({
  progress,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor:
            palette.border,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(
              progress,
              100
            )}%`,
            backgroundColor:
              palette.primary,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 12,
  },

  fill: {
    height: "100%",
    borderRadius: 20,
  },
});