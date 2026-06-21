import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
};

export default function TransactionTypeSelector({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          value === "expense" && styles.activeExpense,
        ]}
        onPress={() => onChange("expense")}
      >
        <Text style={styles.text}>Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          value === "income" && styles.activeIncome,
        ]}
        onPress={() => onChange("income")}
      >
        <Text style={styles.text}>Income</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },

  button: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#1E293B",
    marginHorizontal: 4,
  },

  activeExpense: {
    backgroundColor: "#EF4444",
  },

  activeIncome: {
    backgroundColor: "#22C55E",
  },

  text: {
    color: "white",
    fontWeight: "700",
  },
});