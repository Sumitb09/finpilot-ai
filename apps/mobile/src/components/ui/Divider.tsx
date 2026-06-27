import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

export default function Divider() {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor:
            palette.border,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 20,
  },
});