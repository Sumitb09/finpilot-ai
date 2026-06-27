import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { useAppTheme } from "../../../theme/useAppTheme";

type Props = {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SwipeTransaction({
  children,
  onEdit,
  onDelete,
}: Props) {
  const { palette } = useAppTheme();

  function LeftAction() {
    return (
      <Pressable
        onPress={onEdit}
        style={[
          styles.left,
          {
            backgroundColor:
              palette.primary,
          },
        ]}
      >
        <Text style={styles.text}>
          ✏️ Edit
        </Text>
      </Pressable>
    );
  }

  function RightAction() {
    return (
      <Pressable
        onPress={onDelete}
        style={styles.right}
      >
        <Text style={styles.text}>
          🗑 Delete
        </Text>
      </Pressable>
    );
  }

  return (
    <Swipeable
      renderLeftActions={LeftAction}
      renderRightActions={RightAction}
      overshootLeft={false}
      overshootRight={false}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  left: {
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    marginBottom: 12,
  },

  right: {
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 18,
    marginBottom: 12,
  },

  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});