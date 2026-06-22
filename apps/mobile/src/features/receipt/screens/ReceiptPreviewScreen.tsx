import React from "react";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Screen from "../../../components/ui/Screen";
import Card from "../../../components/ui/Card";
import Typography from "../../../components/ui/Typography";
import Button from "../../../components/ui/Button";

export default function ReceiptPreviewScreen() {
  const { receipt } = useLocalSearchParams();

  const data = JSON.parse(
    receipt as string
  );

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Typography variant="h2">
            🧾 Receipt Preview
          </Typography>

          <Typography>
            Merchant
          </Typography>
          <Typography>
            {data.merchant}
          </Typography>

          <Typography
            style={{ marginTop: 20 }}
          >
            Amount
          </Typography>

          <Typography>
            ₹{data.amount}
          </Typography>

          <Typography
            style={{ marginTop: 20 }}
          >
            Category
          </Typography>

          <Typography>
            {data.category}
          </Typography>

          <Typography
            style={{ marginTop: 20 }}
          >
            Date
          </Typography>

          <Typography>
            {data.date}
          </Typography>

          <Typography
            style={{ marginTop: 24 }}
            variant="h3"
          >
            Items
          </Typography>

          {data.items.map(
            (
              item: any,
              index: number
            ) => (
              <Typography
                key={index}
              >
                • {item.name} — ₹
                {item.price}
              </Typography>
            )
          )}

          <Button
            title="💾 Save Transaction"
            onPress={() => {}}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}