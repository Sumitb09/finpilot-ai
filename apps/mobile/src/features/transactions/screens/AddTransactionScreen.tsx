import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  router,
  useLocalSearchParams,
} from "expo-router";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";

import AmountInput from "../components/AmountInput";
import CategoryChips from "../components/CategoryChips";
import QuickAmountChips from "../components/QuickAmountChips";
import TransactionTypeSelector from "../components/TransactionTypeSelector";

import { useAddTransaction } from "../hooks/useAddTransaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import { useTransaction } from "../hooks/useTransaction";

import { useProfile } from "../../settings/hooks/useProfile";
import { useCategories } from "../../categories/hooks/useCategories";

import { predictCategory } from "../../categories/utils/categoryMatcher";

import { useAppTheme } from "../../../theme/useAppTheme";
import TransactionDatePicker from "../components/TransactionDatePicker";
import MerchantInput from "../components/MerchantInput";
import { useReceiptStore } from "../../receipt/store";
import { useVoiceStore } from "../../voice";

export default function AddTransactionScreen() {
  const { palette } = useAppTheme();

  const { id } = useLocalSearchParams();

  const editing = typeof id === "string";

  const { t } = useTranslation();

  const createMutation = useAddTransaction();
  const updateMutation = useUpdateTransaction();

  const { data: transaction } =
    useTransaction(editing ? id : "");

  const { data: profile } = useProfile();

  const { data: categories = [] } =
    useCategories();

  const [type, setType] = useState<
    "income" | "expense"
  >("expense");

  const [amount, setAmount] =
    useState("");

  const [merchant, setMerchant] =
    useState("");

  const [note, setNote] =
    useState("");

  const [categoryId, setCategoryId] =
    useState<string | null>(null);

  const [date, setDate] = useState(new Date());

  const [autoDetected, setAutoDetected] =
    useState(true);

  const {
    receipt,
    clearReceipt,
  } = useReceiptStore();


  useEffect(() => {
    if (!transaction) return;

    setAmount(String(transaction.amount));
    setMerchant(transaction.title);
    setNote(transaction.note ?? "");
    setCategoryId(transaction.category_id);
    setType(transaction.type);
  }, [transaction]);

    
  useEffect(() => {
    if (!merchant.trim()) return;
  
    const predicted = predictCategory(merchant);
  
    if (!predicted) return;
  
    const found = categories.find(
      (item) =>
        item.name.toLowerCase() ===
        predicted.toLowerCase()
    );
  
    if (found && autoDetected) {
      setCategoryId(found.id);
    }
  }, [merchant, categories, autoDetected]);



  const selectedCategory = useMemo(
    () =>
      categories.find(
        (item) => item.id === categoryId
      ),
    [categories, categoryId]
  );

  useEffect(() => {
    if (!receipt) return;
  
    if (receipt.merchant) {
      setMerchant(receipt.merchant);
    }
  
    if (receipt.amount) {
      setAmount(String(receipt.amount));
    }
  
    if (receipt.note) {
      setNote(receipt.note);
    }
  
    if (receipt.date) {
      let parsed = new Date(receipt.date);
      if (isNaN(parsed.getTime())) {
        const parts = receipt.date.split(/[/-]/);    
        if (parts.length === 3) {    
          // DD/MM/YYYY or DD-MM-YYYY   
          parsed = new Date(    
            Number(parts[2]),    
            Number(parts[1]) - 1,   
            Number(parts[0])    
          );    
        }    
      }
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
      }
    }
  
    if (
      receipt.items &&
      receipt.items.length > 0
    ) {

    const itemsText =
      receipt.items
        ?.map(
          (item) =>
            `• ${item.name} - ${item.price}`
        )
        .join("\n") ?? "";
    const finalNote = 
      receipt.note
        ? `${receipt.note}\n\n${itemsText}`
        : itemsText;
      setNote(finalNote);
    
  }
  
    if (receipt.category) {
      const found = categories.find(
        (category) =>
          category.name.toLowerCase() ===
          receipt.category!.toLowerCase()
      );
  
      if (found) {
        setCategoryId(found.id);
      }
    }
  }, [receipt, categories]);

  const {
    draft,
    clearDraft,
} = useVoiceStore();

useEffect(() => {

    if (!draft) return;

    setMerchant(
        draft.merchant ?? ""
    );

    setAmount(
        String(draft.amount ?? "")
    );

    setType(
        draft.type ?? "expense"
    );

    setNote(
        draft.note ?? ""
    );

    if (draft.date) {
        const parsed =
            new Date(draft.date);

        if (!isNaN(parsed.getTime())) {
            setDate(parsed);
        }
    }

    const found =
        categories.find(
            c =>
                c.name.toLowerCase() ===
                draft.category?.toLowerCase()
        );

    if (found) {
        setCategoryId(found.id);
    }

    clearDraft();

}, [
    draft,
    categories
]);

  async function handleSave() {
    if (!amount.trim()) {
      Alert.alert(
        t("alerts.validation"),
        t("transactions.enterAmount")
      );
      return;
    }

    if (!categoryId) {
      Alert.alert(
        t("alerts.validation"),
        t("transactions.selectCategory")
      );
      return;
    }

    const transactionDate =
      date instanceof Date &&
      !isNaN(date.getTime())
        ? date.toISOString()
        : new Date().toISOString();

    const payload = {
      title:
        merchant.trim() ||
        selectedCategory?.name ||
        "Transaction",
    
      amount: Number(amount),   
      note: note.trim(),    
      type,    
      category_id: categoryId,    
      transaction_date: transactionDate,    
      receipt_image: receipt?.image ?? null,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({
          id,
          payload,
        });
        clearReceipt();

        Alert.alert(
          t("alerts.success"),
          t(
            "transactions.transactionUpdated"
          )
        );
      } else {
        await createMutation.mutateAsync(
          payload
        );
        clearReceipt();

        Alert.alert(
          t("alerts.success"),
          t(
            "transactions.transactionAdded"
          )
        );
      }

      router.back();
    } catch (error: any) {
      Alert.alert(
        t("alerts.error"),
        error?.message ??
          t(
            "common.somethingWentWrong"
          )
      );
    }
  }


  return (
    <Screen>
      <Text
        style={[
          styles.title,
          {
            color: palette.text,
          },
        ]}
      >
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
        currency={
          profile?.currency ?? "INR"
        }
        onChangeText={setAmount}
      />

      <QuickAmountChips
        currency={
          profile?.currency ?? "INR"
        }
        onSelect={(value) =>
          setAmount(String(value))
        }
      />

      <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.heading,
            {
            color: palette.text,
            marginBottom: 0,
            },
          ]}
        >
         Merchant
        </Text>

        <TransactionDatePicker
          value={date}
          onChange={setDate}
        />
      </View>

        <MerchantInput
          value={merchant}
          onChangeText={(text) => {
            setMerchant(text);        
            setAutoDetected(false);        
          }}
          onScan={() =>
          router.push("/(protected)/scan-receipt")
          }
        />

        {merchant.trim().length > 0 &&
          selectedCategory && (
          <View
            style={[
              styles.suggestion,
              {
                backgroundColor:
                  palette.primary + "20",
              },
            ]}
          >
            <Text
              style={{
                color:
                  palette.primary,
                fontWeight: "700",
              }}
            >
              ✨ Detected:{" "}
              {selectedCategory.icon}{" "}
              {selectedCategory.name}
            </Text>
          </View>
        )}
        
        {merchant.trim().length > 0 && (
        <CategoryChips
          selectedId={categoryId}
          onSelect={(id) => {
            setAutoDetected(false);        
            setCategoryId(id);       
          }}
        /> )}
      </View>

      <TextInput
        placeholder="Add a note (optional)"
        placeholderTextColor={
          palette.subtext
        }
        value={note}
        onChangeText={setNote}
        multiline
        style={[
          styles.note,
          {
            backgroundColor:
              palette.card,
            color: palette.text,
            borderColor:
              palette.border,
            },
        ]}
      />

      <Button
        title={
          editing
            ? "Update Transaction"
            : "Save Transaction"
        }
        onPress={handleSave}
        disabled={
          !amount || !categoryId
        }
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 24,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  section: {
    marginTop: 18,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
  },

  suggestion: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 16,
  },

  note: {
    minHeight: 110,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    textAlignVertical: "top",
    marginTop: 24,
    marginBottom: 30,
    fontSize: 16,
  },

  button: {
    marginBottom: 40,
  },
});