import React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Action = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
};

export default function QuickActions() {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  const actions: Action[] = [
    {
      title: t("dashboard.scanPay"),
      icon: "qr-code-outline",
      route: "/(protected)/scan-upi",
      color: "#5B5FEF",
    },
    {
      title: t("dashboard.addTransaction"),
      icon: "add-outline",
      route: "/(protected)/add-transaction",
      color: "#22C55E",
    },
    {
      title: t("dashboard.scanReceipt"),
      icon: "camera-outline",
      route: "/(protected)/scan-receipt",
      color: "#F59E0B",
    },
    {
      title: t("dashboard.voiceEntry"),
      icon: "mic-outline",
      route: "/(protected)/voice-transaction",
      color: "#EC4899",
    },
    {
      title: t("dashboard.aiCoach"),
      icon: "sparkles-outline",
      route: "/(protected)/(tabs)/ai",
      color: "#8B5CF6",
    },
    {
      title: t("dashboard.report"),
      icon: "stats-chart-outline",
      route: "/(protected)/report",
      color: "#06B6D4",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {actions.map((action) => (
          <Pressable
            key={action.title}
            style={({ pressed }) => [
              styles.item,
              pressed && {
                transform: [{ scale: 0.94 }],
                opacity: 0.85,
              },
            ]}
            android_ripple={{
              color: action.color + "25",
              borderless: true,
            }}
            onPress={() => router.push(action.route as any)}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: action.color,
                  shadowColor: action.color,
                },
              ]}
            >
              <Ionicons
                name={action.icon}
                size={22}
                color="#fff"
              />
            </View>

            <Typography
              numberOfLines={2}
              style={[
                styles.title,
                {
                  color: palette.text,
                },
              ]}
            >
              {action.title}
            </Typography>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  scrollContainer: {
    paddingHorizontal: 6,
    paddingRight: 24,
  },

  item: {
    width: 74,
    alignItems: "center",
    marginRight: 18,
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",

    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  title: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 15,
    paddingHorizontal: 2,
  },
});