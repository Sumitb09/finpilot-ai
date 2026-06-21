import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import { radius, shadows } from "../../theme";
import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function Card({
  children,
  style,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 18,
    ...shadows.card,
  },
});