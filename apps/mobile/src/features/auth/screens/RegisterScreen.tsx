import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";

import AuthInput from "../components/AuthInput";
import PasswordStrength from "../components/PasswordStrength";
import TermsCheckbox from "../components/TermsCheckbox";

import { useRegister } from "../hooks/useRegister";
import { validateRegister } from "../services/validation.service";

import { useAppTheme } from "../../../theme/useAppTheme";
import PhoneInput from "../components/PhoneInput";
import FormInput from "@/src/components/ui/FormInput";
import { useSendOTP } from "../hooks/useSendOTP";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { palette } = useAppTheme();

  const register = useRegister();
  const sendOTP = useSendOTP();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  async function handleRegister() {
    const error = validateRegister({
      fullName,
      phone,
      email,
      password,
      confirmPassword,
      acceptedTerms,
    });

    if (error) {
      Alert.alert(
        t("alerts.validation"),
        error
      );
      return;
    }

    try {
      await register.mutateAsync({
        fullName,
        phone,
        email: email.trim(),
        password,
      });
      await sendOTP.mutateAsync(phone);

      router.push({
        pathname: "/verify-phone",      
        params: {      
          phone,      
        },      
      });
    } catch (error: any) {
      Alert.alert(
        t("alerts.error"),
        error.message
      );
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
        {t("auth.createAccount")}
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: palette.subtext,
          },
        ]}
      >
        {t("auth.createAccountSubtitle")}
      </Text>

      <FormInput
        icon="person-outline"
        label={t("auth.fullName")}
        value={fullName}
        onChangeText={setFullName}
      />

      <PhoneInput
        value={phone}
        onChangeText={setPhone}
      />

      <FormInput
        icon="mail-outline"
        label={t("auth.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <FormInput
        icon="lock-closed-outline"
        secure
        label={t("auth.password")}
        value={password}
        onChangeText={setPassword}
      />

      <PasswordStrength
        password={password}
      />

      <FormInput
        icon="lock-closed-outline"
        secure
        label={t("auth.confirmPassword")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TermsCheckbox
        checked={acceptedTerms}
        onChange={() =>
          setAcceptedTerms(
            !acceptedTerms
          )
        }
      />

      <Button
        title={
          register.isPending
            ? t("auth.registering")
            : t("auth.register")
        }
        loading={register.isPending}
        onPress={handleRegister}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          router.back()
        }
      >
        <Text
          style={[
            styles.loginText,
            {
              color:
                palette.primary,
            },
          ]}
        >
          {t("auth.haveAccount")}
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
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 28,
  },

  loginButton: {
    marginTop: 24,
  },

  loginText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});