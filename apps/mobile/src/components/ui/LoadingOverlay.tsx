import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
} from "react-native";

import Typography from "./Typography";
import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  visible: boolean;
  message?: string;
};

export default function LoadingOverlay({
  visible,
  message,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                palette.card,
              borderColor:
                palette.border,
            },
          ]}
        >
          <ActivityIndicator
            size="large"
            color={palette.primary}
          />

          {!!message && (
            <Typography
              style={[
                styles.message,
                {
                  color:
                    palette.text,
                },
              ]}
            >
              {message}
            </Typography>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: 260,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  message: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 15,
  },
});