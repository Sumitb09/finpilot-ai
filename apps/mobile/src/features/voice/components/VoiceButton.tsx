import React from "react";
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  recording: boolean;
  loading?: boolean;
  onPress: () => void;
};

export default function VoiceButton({
  recording,
  loading = false,
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: recording
            ? "#EF4444"
            : palette.primary,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Ionicons
          name={
            recording
              ? "stop"
              : "mic"
          }
          color="#fff"
          size={28}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});