import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

type Props = {
  paymentMethod?: string;
  upiId?: string;
  reference?: string;
};

export default function PaymentInfoCard({
  paymentMethod,
  upiId,
  reference,
}: Props) {
  return (
    <Card style={styles.card}>
      <Typography variant="h3">
        Payment
      </Typography>

      <View style={styles.row}>
        <Typography>Method</Typography>
        <Typography>{paymentMethod}</Typography>
      </View>

      {upiId && (
        <View style={styles.row}>
          <Typography>UPI ID</Typography>
          <Typography>{upiId}</Typography>
        </View>
      )}

      {reference && (
        <View style={styles.row}>
          <Typography>Reference</Typography>
          <Typography>{reference}</Typography>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },

  row: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});