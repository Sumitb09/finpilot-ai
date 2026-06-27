import React from "react";
import { Alert, View, Text, Switch, StyleSheet,} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";

import AvatarCard from "../components/AvatarCard";
import SettingsItem from "../components/SettingsItem";
import SettingsSection from "../components/SettingsSection";

import { signOut } from "../../auth/services/auth.service";
import { useProfile } from "../hooks/useProfile";
import { formatCurrency } from "@/src/utils/currency";
import { useAppTheme } from "../../../theme/useAppTheme";
import { useLogout } from "../../auth/hooks/useLogout";

export default function SettingsScreen() {
  const { data: profile, isPending } = useProfile();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useAppTheme();
  const isDark = theme === "dark";
  const logout = useLogout();

  async function handleLogout() {
    await logout.mutateAsync();
    router.replace("/login");
  }

  if (isPending) {
    return <Screen />;
  }

  return (
    <Screen>
      <AvatarCard
        name={profile?.full_name ?? ""}
        email={profile?.email ?? ""}
      />

      <SettingsSection title={t("settings.account")}>
        <SettingsItem
          icon="👤"
          title={t("settings.editProfile")}
          onPress={() => router.push("/edit-profile")}
        />

        <SettingsItem
          icon="🌎"
          title={t("settings.language")}
          value={
            i18n.language === "hi"
              ? "हिन्दी"
              : "English"
          }
          onPress={() =>
            Alert.alert(
              t("settings.language"),
              "",
              [
                {
                  text: "English",
                  onPress: () =>
                    i18n.changeLanguage("en"),
                },
                {
                  text: "हिन्दी",
                  onPress: () =>
                    i18n.changeLanguage("hi"),
                },
                {
                  text: t("common.cancel"),
                  style: "cancel",
                },
              ]
            )
          }
        />

        <View style={styles.themeCard}>
          <View style={styles.themeLeft}>
            <Text style={styles.themeIcon}>
              {isDark ? "🌙" : "☀️"}
            </Text>

            <Text style={styles.themeText}>
              {t("settings.theme")}
            </Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={(value) =>
              setTheme(value ? "dark" : "light")
            }
            thumbColor="#FFFFFF"
            trackColor={{
              false: "#94A3B8",
              true: "#0EA5E9",
            }}
          />
        </View>

        <SettingsItem
          icon="💰"
          title={t("settings.currency")}
          value={profile?.currency ?? "INR"}
          onPress={() => Alert.alert("Coming Soon")}
        />
      </SettingsSection>

      <SettingsSection title={t("settings.finance")}>
        <SettingsItem
          icon="💵"
          title={t("settings.monthlyIncome")}
          value={formatCurrency(
            profile?.monthly_income ?? 0,
            profile?.currency ?? "INR"
          )}
          onPress={() => Alert.alert("Coming Soon")}
        />

        <SettingsItem
          icon="🎯"
          title={t("settings.monthlyBudget")}
          value={formatCurrency(
            profile?.monthly_budget ?? 0,
            profile?.currency ?? "INR"
          )}
          onPress={() => Alert.alert("Coming Soon")}
        />
      </SettingsSection>

      <SettingsSection title={t("settings.security")}>
        <SettingsItem
          icon="🔑"
          title={t("settings.changePassword")}
          onPress={() => Alert.alert("Coming Soon")}
        />

        <SettingsItem
          icon="🗑️"
          title={t("settings.deleteAccount")}
          danger
          onPress={() => Alert.alert("Coming Soon")}
        />

        <SettingsItem
          icon="🚪"
          title={t("settings.logout")}
          danger
          onPress={handleLogout}
        />
      </SettingsSection>
    </Screen>
  );
}
const styles = StyleSheet.create({
  themeCard: {
    backgroundColor: "#0B7285",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  themeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  themeIcon: {
    fontSize: 28,
    marginRight: 14,
  },

  themeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});