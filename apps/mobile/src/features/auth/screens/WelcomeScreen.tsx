import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";
import { useAppTheme } from "../../../theme/useAppTheme";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const { palette } = useAppTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <Text
          style={[
            styles.logo,
            { color: palette.primary },
          ]}
        >
          💰
        </Text>

        <Text
          style={[
            styles.title,
            { color: palette.text },
          ]}
        >
          FinPilot AI
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: palette.subtext },
          ]}
        >
          {t("auth.welcomeSubtitle")}
        </Text>

        <View style={styles.buttons}>
          <Button
            title={t("auth.login")}
            onPress={() =>
              router.push("/login")
            }
          />

          <View style={{ height: 14 }} />

          <Button
            title={t("auth.createAccount")}
            variant="outline"
            onPress={() =>
              router.push("/register")
            }
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    fontSize: 72,
    textAlign: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 14,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 24,
  },

  buttons: {
    marginTop: 60,
  },
});