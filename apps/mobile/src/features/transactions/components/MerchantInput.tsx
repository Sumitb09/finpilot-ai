import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function MerchantInput({
  value,
  onChangeText,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography
        variant="h3"
        style={styles.heading}
      >
        Merchant
      </Typography>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Netflix, Uber, Amazon, Rent..."
        placeholderTextColor={palette.subtext}
        style={[
          styles.input,
          {
            backgroundColor: palette.card,
            borderColor: palette.border,
            color: palette.text,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  heading: {
    marginBottom: 12,
  },

  input: {
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 18,
    fontSize: 17,
  },
});