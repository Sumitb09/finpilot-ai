import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../../../components/ui/Screen";
import Card from "../../../components/common/Card";
import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

import { useUPIStore } from "../store/useUPIStore";
import { payViaUPI } from "../services/upiLauncher";

import { useAppTheme } from "../../../theme/useAppTheme";
import  { useSaveUPITransaction} from "../hooks/useSaveUPITransaction";

export default function PaymentPreviewScreen() {
  const { palette } = useAppTheme();

  const saveMutation = useSaveUPITransaction();

  const {
    payment,
    clear,
  } = useUPIStore();

  const [amount, setAmount] = useState(
    payment?.amount?.toString() ?? ""
  );

  if (!payment) {
    router.back();
    return null;
  }

  async function handlePay() {
    try {
      const url =
        `upi://pay?pa=${payment.upiId}` +
        `&pn=${encodeURIComponent(payment.merchant)}` +
        `&am=${amount}` +
        `&tn=${encodeURIComponent(payment.note ?? "")}` +
        `&cu=${payment.currency}`;
  
      await payViaUPI(url);
  
      Alert.alert(
        "Payment Status",
        "Did you successfully complete the payment?",
        [
          {
            text: "No",
            style: "cancel",
            onPress: () => {
              clear();
              router.back();
            },
          },
          {
            text: "Yes",
            onPress: async () => {
                await saveMutation.mutateAsync({
                    title:
                        payment.merchant,                
                    amount:
                        Number(amount),               
                    type:
                        "expense",                
                    payment_method:
                        "UPI",                
                    upi_id:
                        payment.upiId,                
                    transaction_date:
                        new Date().toISOString(),                
                    note:
                        "Paid via UPI",
                    source:
                        "upi",               
                });
              clear();
  
              Alert.alert(
                "Success",
                "Payment recorded successfully."
              );
  
              router.replace("/(protected)/(tabs)");
            },
          },
        ]
      );
    } catch (e: any) {
      Alert.alert(
        "Payment Failed",
        e.message
      );
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Typography
          variant="h2"
          style={styles.header}
        >
          UPI Payment
        </Typography>

        <Card style={styles.card}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor:
                  palette.primary + "20",
              },
            ]}
          >
            <Ionicons
              name="business"
              color={palette.primary}
              size={34}
            />
          </View>

          <Typography
            variant="h3"
            style={styles.center}
          >
            {payment.merchant}
          </Typography>

          <Typography
            style={[
              styles.upi,
              {
                color: palette.subtext,
              },
            ]}
          >
            {payment.upiId}
          </Typography>

          <View style={styles.divider} />

          <Typography>
            Amount
          </Typography>

          <View style={styles.summary}>
  <Typography variant="h3">
    Payment Summary
  </Typography>

  <View style={styles.row}>
    <Typography>Merchant</Typography>
    <Typography style={styles.value}>
      {payment.merchant}
    </Typography>
  </View>

  <View style={styles.row}>
    <Typography>Payment Method</Typography>
    <Typography style={styles.value}>
      UPI
    </Typography>
  </View>

  <View style={styles.row}>
    <Typography>Currency</Typography>
    <Typography style={styles.value}>
      {payment.currency}
    </Typography>
  </View>

  <View style={styles.row}>
    <Typography>AI Category</Typography>
    <Typography style={styles.value}>
      🍔 Food
    </Typography>
  </View>
</View>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={[
              styles.amountInput,
              {
                color: palette.text,
                borderColor:
                  palette.border,
              },
            ]}
          />

          <View style={styles.info}>
            <Ionicons
              name="wallet-outline"
              size={20}
              color={palette.primary}
            />

            <Typography>
              Currency
            </Typography>

            <Typography
              style={styles.right}
            >
              {payment.currency}
            </Typography>
          </View>

          <View style={styles.info}>
            <Ionicons
              name="shield-checkmark"
              size={20}
              color="#00C853"
            />

            <Typography>
              Secure UPI Payment
            </Typography>
          </View>

          <View style={styles.info}>
            <Ionicons
              name="sparkles"
              size={20}
              color="#F59E0B"
            />

            <Typography>
              AI Category
            </Typography>

            <Typography
              style={styles.right}
            >
              🍔 Food
            </Typography>
          </View>

          {payment.note ? (
            <>
              <View
                style={
                  styles.divider
                }
              />

              <Typography>
                Note
              </Typography>

              <Typography
                style={{
                  color:
                    palette.subtext,
                }}
              >
                {payment.note}
              </Typography>
            </>
          ) : null}
        </Card>

        <Button
          title={`Pay ₹${amount}`}
          onPress={handlePay}
          style={styles.payButton}
        />

        <Button
          title="Cancel"
          variant="secondary"
          onPress={() =>
            router.back()
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    marginBottom: 20,
  },

  card: {
    borderRadius: 26,
    padding: 24,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  center: {
    textAlign: "center",
  },

  upi: {
    textAlign: "center",
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 24,
  },

  amountInput: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 18,
    marginTop: 12,
    marginBottom: 20,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 10,
  },

  right: {
    marginLeft: "auto",
    fontWeight: "700",
  },

  payButton: {
    marginTop: 30,
    marginBottom: 12,
  },
  summary: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  
  value: {
    fontWeight: "700",
  },
});