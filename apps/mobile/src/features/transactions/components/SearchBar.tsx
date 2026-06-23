import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  value: string;
  onChangeText(text: string): void;
};

export default function SearchBar({
  value,
  onChangeText,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={palette.subtext}
      />

      <TextInput
        style={[
          styles.input,
          {
            color: palette.text,
          },
        ]}
        placeholder="Search transactions..."
        placeholderTextColor={palette.subtext}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 14,
    fontSize: 16,
  },
});