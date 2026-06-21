import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function SettingsSection({
  title,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  title: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 14,
    letterSpacing: 1,
  },
});