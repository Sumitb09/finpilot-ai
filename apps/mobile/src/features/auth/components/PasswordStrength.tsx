import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";
import { useTranslation } from "react-i18next";

type Props = {
  password: string;
};

export default function PasswordStrength({
  password,
}: Props) {
  const { palette } = useAppTheme();

  const score = calculate(password);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            style={[
              styles.bar,
              {
                backgroundColor:
                  item <= score
                    ? palette.primary
                    : palette.border,
              },
            ]}
          />
        ))}
      </View>

      <Text
        style={{
          color: palette.subtext,
          marginTop: 6,
        }}
      >
        {t(`auth.passwordStrength.${label(score).toLowerCase()}`)}
      </Text>
    </View>
  );
}

function calculate(password: string) {
  let score = 0;

  if (password.length >= 8) score++;

  if (/[A-Z]/.test(password)) score++;

  if (/[0-9]/.test(password)) score++;

  if (
    /[^A-Za-z0-9]/.test(password)
  )
    score++;

  return score;
}
function label(score: number) {
    switch (score) {
      case 1:
        return "weak";
      case 2:
        return "fair";
      case 3:
        return "good";
      case 4:
        return "strong";
      default:
        return "";
    }
  }

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
  },

  bar: {
    flex: 1,
    height: 8,
    borderRadius: 10,
    marginHorizontal: 2,
  },
});