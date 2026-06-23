import React from "react";
import { View, StyleSheet } from "react-native";

import Typography from "../../../components/ui/Typography";
import TransactionList from "./TransactionList";

import { TransactionGroup as Group } from "../utils/groupTransactions";

type Props = {
  group: Group;
};

export default function TransactionGroup({
  group,
}: Props) {
  return (
    <View style={styles.container}>
      <Typography
        variant="h3"
        style={styles.title}
      >
        {group.title}
      </Typography>

      <TransactionList
        data={group.data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  title: {
    marginBottom: 14,
    fontWeight: "700",
  },
});