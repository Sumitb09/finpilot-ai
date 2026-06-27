import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Button from "./Button";
import Typography from "./Typography";
import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  visible: boolean;

  title: string;

  description?: string;

  confirmTitle?: string;

  cancelTitle?: string;

  confirmVariant?: "primary" | "danger";

  loading?: boolean;

  onConfirm(): void;

  onCancel(): void;

  children?: React.ReactNode;
};

export default function AppModal({
  visible,
  title,
  description,
  confirmTitle = "OK",
  cancelTitle = "Cancel",
  confirmVariant = "primary",
  loading = false,
  onConfirm,
  onCancel,
  children,
}: Props) {
  const { palette } = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Pressable
        style={styles.overlay}
        onPress={onCancel}
      >
        <Pressable
          style={[
            styles.card,
            {
              backgroundColor:
                palette.card,
            },
          ]}
        >
          <Typography
            variant="h2"
            style={{
              marginBottom: 12,
            }}
          >
            {title}
          </Typography>

          {!!description && (
            <Typography
              style={{
                color:
                  palette.subtext,
                marginBottom: 20,
              }}
            >
              {description}
            </Typography>
          )}

          {children}

          <View style={styles.buttons}>
            <Button
              title={cancelTitle}
              variant="outline"
              style={{ flex: 1 }}
              onPress={onCancel}
            />

            <View
              style={{
                width: 12,
              }}
            />

            <Button
              title={confirmTitle}
              loading={loading}
              variant={confirmVariant}
              style={{ flex: 1 }}
              onPress={onConfirm}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    borderRadius: 28,
    padding: 24,
  },

  buttons: {
    flexDirection: "row",
    marginTop: 24,
  },
});