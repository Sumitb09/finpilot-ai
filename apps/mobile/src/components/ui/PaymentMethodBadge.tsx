import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Typography from "./Typography";
import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  method?: string;
};

const config = {
  UPI: {
    icon: "qr-code-outline",
    color: "#16A34A",
  },
  Card: {
    icon: "card-outline",
    color: "#2563EB",
  },
  Cash: {
    icon: "cash-outline",
    color: "#F59E0B",
  },
  Bank: {
    icon: "wallet-outline",
    color: "#9333EA",
  },
};

export default function PaymentMethodBadge({
  method = "Cash",
}: Props) {
  const { palette } = useAppTheme();

  const item =
    config[
      method as keyof typeof config
    ] ?? config.Cash;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            item.color + "18",
        },
      ]}
    >
      <Ionicons
        name={item.icon as any}
        size={14}
        color={item.color}
      />

      <Typography
        style={[
          styles.text,
          {
            color: item.color,
          },
        ]}
      >
        {method}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },

  text: {
    fontSize: 11,
    fontWeight: "700",
  },
});