import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  onPress: () => void;
};

export default function FloatingButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 24,
    bottom: 34,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },

  icon: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },
});