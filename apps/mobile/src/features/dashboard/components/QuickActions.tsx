import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import Section from "../../../components/ui/Section";
import QuickActionCard from "../../../components/ui/QuickActionCard";

export default function QuickActions() {
  return (
    <Section title="Quick Actions">
      <View style={styles.container}>
        <QuickActionCard
          emoji="➕"
          title="Expense"
          onPress={() =>
            router.push("/(protected)/add-transaction")
          }
        />

        <QuickActionCard
          emoji="💰"
          title="Income"
          onPress={() =>
            router.push(
              "/(protected)/add-transaction?type=income"
            )
          }
        />

        <QuickActionCard
          emoji="📷"
          title="Scan"
          onPress={() => {
            // OCR (Sprint 8)
          }}
        />

        <QuickActionCard
          emoji="🤖"
          title="AI Coach"
          onPress={() =>
            router.push("/(protected)/(tabs)/ai")
          }
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});