import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Typography from "../../../components/ui/Typography";
import Card from "../../../components/common/Card";

type AppItem = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  package: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (pkg: string) => void;
};

const apps: AppItem[] = [
  {
    name: "Google Pay",
    icon: "logo-google",
    package: "com.google.android.apps.nbu.paisa.user",
  },
  {
    name: "PhonePe",
    icon: "phone-portrait",
    package: "com.phonepe.app",
  },
  {
    name: "Paytm",
    icon: "wallet",
    package: "net.one97.paytm",
  },
  {
    name: "BHIM",
    icon: "card",
    package: "in.org.npci.upiapp",
  },
  {
    name: "Amazon Pay",
    icon: "logo-amazon",
    package: "in.amazon.mShop.android.shopping",
  },
];

export default function UPIAppPicker({
  visible,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Card style={styles.sheet}>
          <Typography variant="h3">
            Choose Payment App
          </Typography>

          {apps.map((app) => (
            <Pressable
              key={app.package}
              style={styles.row}
              onPress={() =>
                onSelect(app.package)
              }
            >
              <Ionicons
                name={app.icon}
                size={26}
              />

              <Typography
                style={styles.name}
              >
                {app.name}
              </Typography>
            </Pressable>
          ))}
        </Card>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,.45)",
  },

  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },

  name: {
    marginLeft: 18,
    fontSize: 17,
    fontWeight: "600",
  },
});