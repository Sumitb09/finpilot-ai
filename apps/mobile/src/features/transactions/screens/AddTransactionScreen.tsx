import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import {
  router,
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";

import AmountInput from "../components/AmountInput";
import CategoryGrid from "../components/CategoryGrid";
import TransactionTypeSelector from "../components/TransactionTypeSelector";

import { useAddTransaction } from "../hooks/useAddTransaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import { useTransaction } from "../hooks/useTransaction";

export default function AddTransactionScreen() {
  const { id } = useLocalSearchParams();

  const editing = typeof id === "string";

  const createMutation = useAddTransaction();
  const updateMutation = useUpdateTransaction();

  const { data: transaction } = useTransaction(
    editing ? id : ""
  );

  const [type, setType] = useState<"income" | "expense">("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (!transaction) return;

    setTitle(transaction.title);
    setAmount(String(transaction.amount));
    setNote(transaction.note ?? "");
    setCategoryId(transaction.category_id);
    setType(transaction.type);
  }, [transaction]);

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

    const payload = {
      title: title.trim(),
      amount: Number(amount),
      note,
      type,
      category_id: categoryId,
      transaction_date: new Date().toISOString(),
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({
          id,
          payload,
        });

        Alert.alert(
          "Success",
          "Transaction updated."
        );
      } else {
        await createMutation.mutateAsync(payload);

        Alert.alert(
          "Success",
          "Transaction added."
        );
      }

      router.back();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message ?? "Something went wrong."
      );
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>
        {editing
          ? "Edit Transaction"
          : "Add Transaction"}
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
        style={[styles.input, styles.noteInput]}
        multiline
      />

      <Button
        title={
          editing
            ? "Update Transaction"
            : "Save Transaction"
        }
        onPress={handleSave}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
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