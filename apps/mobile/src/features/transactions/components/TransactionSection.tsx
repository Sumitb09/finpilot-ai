import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function TransactionSection({
  title,
  children,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: palette.text,
          },
        ]}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
});