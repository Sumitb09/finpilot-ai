import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  balance: string;
};

export default function BalanceCard({
  balance,
}: Props) {
  return (
    <LinearGradient
      colors={[
        "#2563EB",
        "#3B82F6",
        "#60A5FA",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.greeting}>
        👋 Welcome back
      </Text>

      <Text style={styles.label}>
        Current Balance
      </Text>

      <Text style={styles.balance}>
        {balance}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📈 FinPilot AI is monitoring your finances
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 24,
    marginTop: 24,
    marginHorizontal: 2,
    elevation: 6,
  },

  greeting: {
    color: "#DBEAFE",
    fontSize: 16,
    marginBottom: 12,
  },

  label: {
    color: "#BFDBFE",
    fontSize: 15,
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "800",
    marginTop: 8,
  },

  footer: {
    marginTop: 28,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    paddingTop: 14,
  },

  footerText: {
    color: "#E0F2FE",
    fontSize: 14,
  },
});