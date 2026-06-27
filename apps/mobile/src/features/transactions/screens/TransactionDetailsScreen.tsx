import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  router,
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../../components/ui/Screen";

import TransactionHero from "../components/TransactionHero";
import MerchantInfoCard from "../components/MerchantInfoCard";
import PaymentInfoCard from "../components/PaymentInfoCard";
import ReceiptCard from "../components/ReceiptCard";
import TagsCard from "../components/TagsCard";
import NoteCard from "../components/NoteCard";
import TransactionActions from "../components/TransactionActions";

import { useTransaction } from "../hooks/useTransaction";


export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { data: transaction } =
    useTransaction(id as string);

  if (!transaction) {
    return <Screen />;
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <TransactionHero
          icon={
            transaction.categories?.icon ??
            "💳"
          }
          title={transaction.title}
          amount={Number(
            transaction.amount
          )}
          income={
            transaction.type === "income"
          }
          category={
            transaction.categories?.name ??
            "General"
          }
          date={new Date(
            transaction.transaction_date
          ).toLocaleString()}
        />

        <MerchantInfoCard
          merchant={
            transaction.merchant ??
            transaction.title
          }
          category={
            transaction.categories?.name ??
            "General"
          }
        />

        <PaymentInfoCard
          paymentMethod={
            transaction.payment_method
          }
          upiId={transaction.upi_id}
          reference={
            transaction.transaction_reference
          }
        />

<ReceiptCard
  receiptImage={transaction.receipt_image}
  onPress={() =>
    router.push({
      pathname:
        "/(protected)/receipt-viewer",
      params: {
        image:
          transaction.receipt_image!,
      },
    })
  }
/>

        <TagsCard
          tags={transaction.tags}
        />

        <NoteCard
          note={transaction.note}
        />

        <TransactionActions
          onEdit={() =>
            router.push(
              `/(protected)/edit-transaction/${transaction.id}`
            )
          }
          onDelete={() =>
            Alert.alert(
              "Delete Transaction",
              "Are you sure you want to delete this transaction?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    // TODO:
                    // Delete transaction mutation
                  },
                },
              ]
            )
          }
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
});