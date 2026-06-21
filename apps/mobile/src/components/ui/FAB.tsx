import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  onPress: () => void;
};

export default function FAB({
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: palette.primary,
        },
      ]}
    >
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 24,
    bottom: 24,

    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
  },

  plus: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
});