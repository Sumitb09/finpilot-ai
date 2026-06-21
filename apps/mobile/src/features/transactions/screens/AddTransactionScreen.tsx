import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";

import AmountInput from "../components/AmountInput";
import CategoryGrid from "../components/CategoryGrid";
import TransactionTypeSelector from "../components/TransactionTypeSelector";

import { useAddTransaction } from "../hooks/useAddTransaction";

export default function AddTransactionScreen() {
  const mutation = useAddTransaction();

  const [type, setType] = useState<"income" | "expense">("expense");

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [note, setNote] = useState("");

  const [categoryId, setCategoryId] = useState<string | null>(null);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert("Validation", "Please enter a title.");
      return;
    }

    if (!amount) {
      Alert.alert("Validation", "Please enter an amount.");
      return;
    }

    if (!categoryId) {
      Alert.alert("Validation", "Please select a category.");
      return;
    }

    try {
      await mutation.mutateAsync({
        title: title.trim(),
        amount: Number(amount),
        note,
        type,
        category_id: categoryId,
        transaction_date: new Date().toISOString(),
      });

      Alert.alert("Success", "Transaction added successfully.");

      router.back();
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Error",
        error.message ?? "Failed to save transaction."
      );
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>
        Add Transaction
      </Text>

      <TransactionTypeSelector
        value={type}
        onChange={setType}
      />

      <AmountInput
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        placeholder="Title"
        placeholderTextColor="#94A3B8"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <CategoryGrid
        selectedId={categoryId}
        onSelect={setCategoryId}
      />

      <TextInput
        placeholder="Note (Optional)"
        placeholderTextColor="#94A3B8"
        value={note}
        onChangeText={setNote}
        style={[
          styles.input,
          styles.noteInput,
        ]}
        multiline
      />

      <Button
        title="Save Transaction"
        onPress={handleSave}
        loading={mutation.isPending}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
  },

  noteInput: {
    height: 100,
    textAlignVertical: "top",
  },
});