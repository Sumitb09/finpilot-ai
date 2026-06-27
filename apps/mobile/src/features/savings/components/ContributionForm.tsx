import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  loading?: boolean;
  onSubmit(
    amount: number,
    note: string
  ): Promise<void>;
};

export default function ContributionForm({
  loading,
  onSubmit,
}: Props) {
  const { palette } =
    useAppTheme();

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  async function handleSave() {
    if (
      !amount ||
      Number(amount) <= 0
    ) {
      Alert.alert(
        "Validation",
        "Enter a valid amount."
      );
      return;
    }

    await onSubmit(
      Number(amount),
      note
    );

    setAmount("");
    setNote("");
  }

  return (
    <View>
      <Typography
        variant="h2"
        style={{
          marginBottom: 20,
        }}
      >
        💰 Add Contribution
      </Typography>

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Amount"
        style={[
          styles.input,
          {
            backgroundColor:
              palette.card,
            color: palette.text,
          },
        ]}
      />

      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Note (optional)"
        style={[
          styles.input,
          {
            backgroundColor:
              palette.card,
            color: palette.text,
          },
        ]}
      />

      <Button
        title="Add Money"
        loading={loading}
        onPress={handleSave}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    input: {
      borderRadius: 14,
      padding: 16,
      marginBottom: 16,
    },
  });