import React from "react";
import { View, StyleSheet } from "react-native";

import Button from "../../../components/ui/Button";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function TransactionActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>
      <Button
        title="Edit"
        onPress={onEdit}
      />

      <Button
        title="Delete"
        variant="secondary"
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    gap: 12,
  },
});