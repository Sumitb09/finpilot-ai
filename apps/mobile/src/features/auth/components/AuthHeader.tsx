import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.logo,
          {
            backgroundColor:
              palette.primary + "20",
          },
        ]}
      >
        <Text style={styles.logoText}>
          💰
        </Text>
      </View>

      <Text
        style={[
          styles.title,
          {
            color: palette.text,
          },
        ]}
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
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 32,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  logoText: {
    fontSize: 42,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});