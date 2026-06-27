import React from "react";
import { Text, StyleSheet } from "react-native";

import Card from "./Card";

type Props = {
  title: string;
  value: string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "#fff",
}: Props) {
  return (
    <Card>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          { color },
        ]}
      >
        {value}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#94A3B8",
    fontSize: 14,
  },

  value: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
});