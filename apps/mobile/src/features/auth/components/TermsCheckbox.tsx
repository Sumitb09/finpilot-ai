import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { useAppTheme } from "../../../theme/useAppTheme";
import { useTranslation } from "react-i18next";

type Props = {
  checked: boolean;
  onChange(): void;
};

export default function TermsCheckbox({
  checked,
  onChange,
}: Props) {
  const { palette } = useAppTheme();
  const { t } = useTranslation();

  return (
    <Pressable
      onPress={onChange}
      style={styles.row}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked
              ? palette.primary
              : "transparent",
            borderColor:
              palette.primary,
          },
        ]}
      />

      <Text
        style={{
          color: palette.text,
          flex: 1,
        }}
      >
        {t("auth.acceptTerms")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 12,
  },
});