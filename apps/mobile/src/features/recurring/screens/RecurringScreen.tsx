import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";

import Screen from "../../../components/ui/Screen";
import Typography from "../../../components/ui/Typography";
import Button from "../../../components/ui/Button";

import { router } from "expo-router";

import { useRecurring } from "../hooks/useRecurring";
import RecurringCard from "../components/RecurringCard";
import { useProfile } from "../../settings/hooks/useProfile";

export default function RecurringScreen() {
  const {
    data = [],
    isPending,
  } = useRecurring();
  const { data: profile } = useProfile();

  if (isPending) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  return (
    <Screen>
      <Typography
        variant="h2"
        style={styles.title}
      >
        🔁 Recurring Transactions
      </Typography>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecurringCard 
            recurring={item}
            currency={profile?.currency ?? "INR"} />
        )}
        ListEmptyComponent={
          <Typography
            style={styles.empty}
          >
            No recurring transactions.
          </Typography>
        }
      />

      <Button
        title="+ Add Recurring"
        onPress={() => {}
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
  },
});