import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  id: string;
  emoji: string;
  title: string;
  amount: string;
  income?: boolean;
};

export default function TransactionCard({
  id,
  emoji,
  title,
  amount,
  income = false,
}: Props) {
  const { palette } = useAppTheme();

  function handlePress() {
      router.push({
        pathname: "/(protected)/edit-transaction/[id]",
        params: { id },
      });
  }

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{
        color: palette.border,
      }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.emoji}>
          {emoji}
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: palette.text,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: income
              ? palette.success
              : palette.danger,
          },
        ]}
      >
        {amount}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 16,

    borderRadius: 14,

    borderWidth: 1,

    marginBottom: 12,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  emoji: {
    fontSize: 24,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
});