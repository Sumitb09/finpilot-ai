import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>
        📭
      </Text>

      <Text style={styles.title}>
        No Transactions Yet
      </Text>

      <Text style={styles.subtitle}>
        Add your first expense to begin tracking.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    alignItems: "center",
  },

  emoji: {
    fontSize: 42,
  },

  title: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 12,
    fontSize: 18,
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 6,
    textAlign: "center",
  },
});