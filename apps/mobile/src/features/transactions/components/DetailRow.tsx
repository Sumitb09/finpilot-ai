import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  label: string;
  value: string;
};

export default function DetailRow({
  label,
  value,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.label,
          {
            color: palette.subtext,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.value,
          {
            color: palette.text,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
  },
});