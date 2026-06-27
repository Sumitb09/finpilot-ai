import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function PhoneInput({
  value,
  onChangeText,
}: Props) {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  const [countryCode, setCountryCode] =
    useState<CountryCode>("IN");

  const [callingCode, setCallingCode] =
    useState("91");

  function onSelect(country: Country) {
    setCountryCode(country.cca2);

    setCallingCode(
      country.callingCode[0] ?? "91"
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.input,
          {
            backgroundColor: palette.card,
            borderColor: palette.border,
          },
        ]}
      >
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          onSelect={onSelect}
        />

        <TextInput
          style={[
            styles.textInput,
            {
              color: palette.text,
            },
          ]}
          keyboardType="phone-pad"
          placeholder={t("auth.phone")}
          placeholderTextColor={palette.subtext}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 56,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
});