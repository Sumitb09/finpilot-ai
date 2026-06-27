import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";
import { useAppTheme } from "../../../theme/useAppTheme";
import { useLogin } from "../hooks/useLogin";

export default function LoginScreen() {
  const { t } = useTranslation();

  const { palette } = useAppTheme();

  const [email, setEmail] = useState("");
  const login = useLogin();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    async function handleLogin() {
      try {
        setLoading(true);
    
        await login.mutateAsync({
          email: email.trim(),
          password,
        });
    
        router.replace("/(protected)/(tabs)");
      } catch (error: any) {
        Alert.alert(
          t("alerts.error"),
          error?.message ??
            t("common.somethingWentWrong")
        );
      } finally {
        setLoading(false);
      }
    }

  return (
    <Screen>
      <Text
        style={[
          styles.title,
          { color: palette.text },
        ]}
      >
        {t("auth.welcomeBack")}
      </Text>

      <TextInput
        placeholder={t("auth.email")}
        placeholderTextColor={
          palette.subtext
        }
        style={[
          styles.input,
          {
            backgroundColor:
              palette.card,
            color: palette.text,
            borderColor:
              palette.border,
          },
        ]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder={t("auth.password")}
        placeholderTextColor={
          palette.subtext
        }
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor:
              palette.card,
            color: palette.text,
            borderColor:
              palette.border,
          },
        ]}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              palette.primary,
          },
        ]}
        disabled={loading}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {loading
            ? t("auth.signingIn")
            : t("auth.login")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          router.push("/register")
        }
      >
        <Text
          style={[
            styles.registerText,
            {
              color: palette.primary,
            },
          ]}
        >
          {t("auth.noAccount")}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 60,
    marginBottom: 40,
  },

  input: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
    fontSize: 16,
  },

  button: {
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
  },

  registerButton: {
    marginTop: 20,
  },

  registerText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});