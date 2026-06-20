import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  emoji: string;
  title: string;
  onPress: () => void;
};

export default function QuickActionCard({
  emoji,
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#1E293B",
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 14,
  },

  emoji: {
    fontSize: 34,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});