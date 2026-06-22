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

  category?: string;
  date?: string;
};

export default function TransactionCard({
  id,
  emoji,
  title,
  amount,
  income = false,
  category = "Transaction",
  date = "Today",
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
          transform: [
            {
              scale: pressed
                ? 0.98
                : 1,
            },
          ],
        },
      ]}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                income
                  ? "#DCFCE7"
                  : "#FEE2E2",
            },
          ]}
        >
          <Text style={styles.emoji}>
            {emoji}
          </Text>
        </View>

        <View style={styles.details}>
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

          <Text
            style={[
              styles.subtitle,
              {
                color: palette.subtext,
              },
            ]}
          >
            {date}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  palette.background,
              },
            ]}
          >
            <Text
              style={{
                color: palette.subtext,
                fontSize: 12,
              }}
            >
              {category}
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
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 18,

    borderRadius: 22,

    borderWidth: 1,

    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  emoji: {
    fontSize: 28,
  },

  details: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  amount: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 12,
  },
});