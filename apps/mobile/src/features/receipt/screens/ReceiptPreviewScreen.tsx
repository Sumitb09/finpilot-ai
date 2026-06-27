import React from "react";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";
import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import Button from "../../../components/ui/Button";

import { useProfile } from "../../settings/hooks/useProfile";
import { formatCurrency } from "../../../utils/currency";
import { useReceiptStore } from "../store";
import { router } from "expo-router";

export default function ReceiptPreviewScreen() {
  const { t } = useTranslation();

  const { receipt } = useReceiptStore();

  const { data: profile } = useProfile();

  const currency = profile?.currency ?? "INR";

  if (!receipt) {
    return (  
      <Screen> 
        <Card> 
          <Typography variant="h2">  
            No receipt found  
          </Typography>  
          <Typography>  
            Please scan a receipt first.  
          </Typography> 
        </Card> 
      </Screen>  
    ); 
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Typography variant="h2">
            🧾 {t("receipt.preview")}
          </Typography>

          <Typography>
            {t("receipt.merchant")}
          </Typography>

          <Typography>
            {receipt.merchant}
          </Typography>

          <Typography
            style={{ marginTop: 20 }}
          >
            {t("receipt.amount")}
          </Typography>

          <Typography>
            {formatCurrency(
              Number(receipt.amount),
              currency
            )}
          </Typography>

          <Typography
            style={{ marginTop: 20 }}
          >
            {t("receipt.category")}
          </Typography>

          <Typography>
            {receipt.category}
          </Typography>

          <Typography
            style={{ marginTop: 20 }}
          >
            {t("receipt.date")}
          </Typography>

          <Typography>
            {receipt.date}
          </Typography>

          <Typography
            style={{ marginTop: 24 }}
            variant="h3"
          >
            {t("receipt.items")}
          </Typography>

          {receipt.items?.map(
            (
              item: any,
              index: number
            ) => (
              <Typography
                key={index}
              >
                • {item.name} —{" "}
                {formatCurrency(
                  Number(item.price),
                  currency
                )}
              </Typography>
            )
          )}

          <Button
            title="Continue"
            onPress={() => {router.push("/(protected)/add-transaction");
            }}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}
