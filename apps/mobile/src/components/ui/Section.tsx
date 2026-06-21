import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Section({
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
    marginBottom: 28,
  },

  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 14,
  },
});