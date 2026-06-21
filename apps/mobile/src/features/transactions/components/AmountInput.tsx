import React from "react";
import {
  TextInput,
  StyleSheet,
} from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function AmountInput({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      placeholder="₹0"
      placeholderTextColor="#64748B"
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1E293B",
    color: "white",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
});