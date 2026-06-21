import React from "react";
import { View, StyleSheet } from "react-native";

import Section from "../../../components/ui/Section";
import QuickActionCard from "../../../components/ui/QuickActionCard";

export default function QuickActions() {
  return (
    <Section title="Quick Actions">
      <View style={styles.container}>
        <QuickActionCard
          emoji="➕"
          title="Expense"
          onPress={() => {}}
        />

        <QuickActionCard
          emoji="💰"
          title="Income"
          onPress={() => {}}
        />

        <QuickActionCard
          emoji="📷"
          title="Scan"
          onPress={() => {}}
        />

        <QuickActionCard
          emoji="🤖"
          title="AI Coach"
          onPress={() => {}}
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