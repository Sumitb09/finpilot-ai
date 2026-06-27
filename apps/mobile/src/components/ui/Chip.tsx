import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  label: string;
  selected?: boolean;
  onPress?(): void;
};

export default function Chip({
  label,
  selected = false,
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? palette.primary
            : palette.card,
          borderColor: selected
            ? palette.primary
            : palette.border,
        },
      ]}
    >
      <Text
        style={{
          color: selected
            ? "#FFFFFF"
            : palette.text,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
});