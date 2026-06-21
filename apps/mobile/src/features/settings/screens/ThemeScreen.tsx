import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";
import { useTheme } from "../../../theme/ThemeProvider";

export default function ThemeScreen() {
  const { theme, setTheme } = useTheme();

  async function select(
    value: "light" | "dark" | "system"
  ) {
    await setTheme(value);
    router.back();
  }

  return (
    <Screen>
      <Option
        title="🌙 Dark"
        active={theme === "dark"}
        onPress={() => select("dark")}
      />

      <Option
        title="☀️ Light"
        active={theme === "light"}
        onPress={() => select("light")}
      />

      <Option
        title="⚙️ System"
        active={theme === "system"}
        onPress={() => select("system")}
      />
    </Screen>
  );
}

function Option({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress(): void;
}) {
  return (
    <Pressable
      style={[
        styles.item,
        active && styles.active,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#083C52",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  active: {
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  text: {
    color: "#fff",
    fontSize: 17,
  },
});