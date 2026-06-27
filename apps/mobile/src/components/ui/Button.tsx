import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";

import Typography from "./Typography";

import { radius, shadows } from "../../theme";
import { useAppTheme } from "../../theme/useAppTheme";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "outline" | "danger";
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
}: ButtonProps) {
  const { palette } = useAppTheme();

  const primary = variant === "primary";
  const outline = variant === "outline";
  const danger = variant === "danger";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={loading || disabled}
      onPress={onPress}
      style={[
        styles.button,

        primary && {
          backgroundColor: palette.primary,
          ...shadows.card,
        },

        danger && {
          backgroundColor: palette.danger,
        },

        outline && {
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: palette.primary,
        },

        (loading || disabled) && {
          opacity: 0.6,
        },

        style,
      ]}
    >
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color={
              outline
                ? palette.primary
                : "#FFFFFF"
            }
            size="small"
          />

          <Typography
            style={[
              styles.text,
              {
                marginLeft: 10,
                color: outline
                  ? palette.primary
                  : "#FFFFFF",
              },
            ]}
          >
            Please wait...
          </Typography>
        </View>
      ) : (
        <Typography
          style={[
            styles.text,
            {
              color: outline
                ? palette.primary
                : "#FFFFFF",
            },
          ]}
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});