import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Screen from "../../../components/ui/Screen";
import Typography from "../../../components/ui/Typography";
import Button from "../../../components/ui/Button";
import FormInput from "../../../components/ui/FormInput";

export default function VerifyPhoneScreen() {
  const { phone } = useLocalSearchParams<{
    phone?: string;
  }>();

  const [otp, setOtp] = useState("");

  function handleVerify() {
    // TODO:
    // Integrate Supabase Phone OTP

    router.replace("/(auth)/register");
  }

  return (
    <Screen>
      <Typography variant="h1">
        Verify Phone
      </Typography>

      <Typography
        style={styles.subtitle}
      >
        Enter the 6-digit verification code
        sent to
      </Typography>

      <Typography
        variant="h3"
        style={styles.phone}
      >
        {phone ?? "Your Phone Number"}
      </Typography>

      <FormInput
        label="Verification Code"
        placeholder="123456"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />

      <Button
        title="Verify"
        onPress={handleVerify}
        disabled={otp.length !== 6}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 12,
  },

  phone: {
    marginBottom: 28,
  },
});