import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
  editable?: boolean;
};

export default function ProfileInput({
  label,
  value,
  onChangeText,
  keyboardType,
  editable = true,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#94A3B8"
        style={[
          styles.input,
          !editable && styles.disabled,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    color: "#94A3B8",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#083B54",
    color: "white",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
  },

  disabled: {
    opacity: 0.6,
  },
});