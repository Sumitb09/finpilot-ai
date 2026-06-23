import React from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  value: string;

  onChangeText(text: string): void;

  onSend(): void;
};

export default function ChatInput({
  value,
  onChangeText,
  onSend,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: palette.border,
          backgroundColor: palette.card,
        },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: palette.text,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Ask FinPilot AI..."
        placeholderTextColor={
          palette.subtext
        }
      />

      <Pressable onPress={onSend}>
        <Ionicons
          name="send"
          size={22}
          color={palette.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderRadius: 16,

    paddingHorizontal: 14,

    paddingVertical: 8,
  },

  input: {
    flex: 1,

    fontSize: 16,

    marginRight: 10,
  },
});