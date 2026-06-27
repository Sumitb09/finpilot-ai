import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import { useAppTheme } from "../../theme/useAppTheme";
import PaymentMethodBadge from "./PaymentMethodBadge";

type Props = {
  id: string;

  emoji: string;

  title: string;

  amount: string;

  income: boolean;

  category: string;

  date: string;

  paymentMethod?: string;

  hasReceipt?: boolean;

  isVoice?: boolean;

  recurring?: boolean;
};

export default function TransactionCard({
  id,
  emoji,
  title,
  amount,
  income,
  category,
  date,
  paymentMethod = "Cash",
  hasReceipt = false,
  isVoice = false,
  recurring = false,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Pressable
      onPress={() =>
        router.push(
          `/(protected)/transaction/${id}`
        )
      }
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor:
                palette.background,
            },
          ]}
        >
          <Text style={styles.emoji}>
            {emoji}
          </Text>
        </View>

        <View style={styles.info}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                color: palette.text,
              },
            ]}
          >
            {title}
          </Text>

          <View style={styles.metaRow}>
            <Text
              style={[
                styles.category,
                {
                  color: palette.subtext,
                },
              ]}
            >
              {category}
            </Text>

            {hasReceipt && (
              <Text style={styles.badge}>
                🧾
              </Text>
            )}

            {isVoice && (
              <Text style={styles.badge}>
                🎤
              </Text>
            )}

            {recurring && (
              <Text style={styles.badge}>
                🔁
              </Text>
            )}
          </View>

          <View style={styles.bottomRow}>
            <PaymentMethodBadge
              method={paymentMethod}
            />

            <Text
              style={[
                styles.date,
                {
                  color: palette.subtext,
                },
              ]}
            >
              {date}
            </Text>
          </View>
        </View>
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
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 20,

    padding: 16,
    marginBottom: 12,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  icon: {
    width: 54,
    height: 54,
    borderRadius: 27,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  emoji: {
    fontSize: 26,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  category: {
    fontSize: 13,
  },

  badge: {
    marginLeft: 6,
    fontSize: 13,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  date: {
    fontSize: 12,
  },

  amount: {
    fontWeight: "700",
    fontSize: 18,
  },
});