import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  icon: string;
  title: string;
  value?: string;
  danger?: boolean;
  onPress: () => void;
};

export default function SettingsItem({
  icon,
  title,
  value,
  danger,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <Text style={styles.icon}>{icon}</Text>

        <Text
          style={[
            styles.title,
            danger && styles.danger,
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.right}>
        {value ? (
          <Text style={styles.value}>{value}</Text>
        ) : null}

        {!danger && (
          <Text style={styles.arrow}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#083B54",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 24,
    marginRight: 14,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  value: {
    color: "#94A3B8",
    marginRight: 8,
  },

  arrow: {
    color: "#94A3B8",
    fontSize: 22,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  danger: {
    color: "#EF4444",
  },
});