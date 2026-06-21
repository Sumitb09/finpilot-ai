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
        value={value}
        onChangeText={onChangeText}
        placeholder="Search transactions"
        placeholderTextColor={palette.subtext}
        style={[
          styles.input,
          {
            color: palette.text,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 10,
    fontSize: 16,
  },
});