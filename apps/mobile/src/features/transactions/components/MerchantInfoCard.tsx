import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";

type Props = {
  merchant: string;
  category: string;
};

export default function MerchantInfoCard({
  merchant,
  category,
}: Props) {
  return (
    <Card style={styles.card}>
      <Typography variant="h3">
        Merchant
      </Typography>

      <View style={styles.row}>
        <Typography>Name</Typography>
        <Typography>{merchant}</Typography>
      </View>

      <View style={styles.row}>
        <Typography>Category</Typography>
        <Typography>{category}</Typography>
      </View>
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