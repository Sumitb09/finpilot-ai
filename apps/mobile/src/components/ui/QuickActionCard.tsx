import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

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
  const { palette } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>

      <Text
        style={[
          styles.title,
          {
            color: palette.text,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
  },

  emoji: {
    fontSize: 34,
    marginBottom: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});