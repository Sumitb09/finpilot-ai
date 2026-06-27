import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../../../components/common/Card";
import Typography from "../../../components/ui/Typography";
import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  receiptImage?: string | null;
  onPress: () => void;
};

export default function ReceiptCard({
  receiptImage,
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  if (!receiptImage) return null;

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Typography variant="h3">
            🧾 Receipt
          </Typography>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={palette.subtext}
          />
        </View>

        <Image
          source={{
            uri: receiptImage,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.footer}>
          <View style={styles.badge}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#22C55E"
            />

            <Typography
              style={styles.badgeText}
            >
              AI Scanned
            </Typography>
          </View>

          <Typography
            style={{
              color: palette.primary,
              fontWeight: "700",
            }}
          >
            Tap to View
          </Typography>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },

  footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
  },

  badgeText: {
    marginLeft: 6,
    fontWeight: "600",
  },
});