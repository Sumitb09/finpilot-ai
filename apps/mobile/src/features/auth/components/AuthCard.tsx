import React from "react";
import {
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = ViewProps;

export default function AuthCard({
  children,
  style,
  ...props
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      {...props}
      style={[
        styles.container,
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
  container: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 8,
  },
});