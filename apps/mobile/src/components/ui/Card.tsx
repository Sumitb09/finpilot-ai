import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing } from "@/src/theme";

type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
  },
});
