import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { radius } from "../../theme";
import { useAppTheme } from "../../theme/useAppTheme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
};

export default function Button({
  title,
  onPress,
  loading = false,
}: ButtonProps) {
  const { palette } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        {
          backgroundColor: palette.primary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: palette.text,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: radius.md,
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});