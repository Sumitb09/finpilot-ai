import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function AuthInput({
  label,
  error,
  ...props
}: Props) {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: palette.text,
          },
        ]}
      >
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor={palette.subtext}
        style={[
          styles.input,
          {
            color: palette.text,
            backgroundColor: palette.card,
            borderColor: error
              ? palette.danger
              : palette.border,
          },
        ]}
      />

      {!!error && (
        <Text
          style={[
            styles.error,
            {
              color: palette.danger,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    fontSize: 16,
  },

  error: {
    marginTop: 6,
    fontSize: 13,
  },
});