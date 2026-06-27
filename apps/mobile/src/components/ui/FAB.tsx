import React, { useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import { useAppTheme } from "../../theme/useAppTheme";

type Action = {
  label: string;
  icon: string;
  onPress: () => void;
};

type Props = {
  onPress?: () => void;
  actions?: Action[];
};

export default function FAB({
  onPress,
  actions = [],
}: Props) {
  const { palette } = useAppTheme();

  const [open, setOpen] = useState(false);

  const animation = React.useRef(
    new Animated.Value(0)
  ).current;

  function toggle() {
    if (actions.length === 0) {
      onPress?.();
      return;
    }

    Animated.spring(animation, {
      toValue: open ? 0 : 1,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  }

  return (
    <View
      pointerEvents="box-none"
      style={styles.container}
    >
      {actions.map((action, index) => {
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(index + 1) * 70],
        });

        const opacity = animation;

        return (
          <Animated.View
            key={action.label}
            style={[
              styles.action,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            <Pressable
              style={[
                styles.actionButton,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
              onPress={() => {
                toggle();
                action.onPress();
              }}
            >
              <Text style={styles.icon}>
                {action.icon}
              </Text>

              <Text
                style={{
                  color: palette.text,
                  fontWeight: "600",
                }}
              >
                {action.label}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}

      <Pressable
        onPress={toggle}
        style={[
          styles.fab,
          {
            backgroundColor: palette.primary,
          },
        ]}
      >
        <Text style={styles.plus}>
          {open ? "×" : "+"}
        </Text>
      </Pressable>
    </View>
  );
}

export function TransactionFAB() {
  return (
    <FAB
      actions={[
        {
          icon: "➕",
          label: "Transaction",
          onPress: () =>
            router.push(
              "/(protected)/add-transaction"
            ),
        },
        {
          icon: "🧾",
          label: "Receipt",
          onPress: () =>
            router.push(
              "/(protected)/scan-receipt"
            ),
        },
        {
          icon: "🎤",
          label: "Voice",
          onPress: () => {
            // Voice entry coming next
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 24,
    bottom: 24,
    alignItems: "flex-end",
  },

  fab: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  plus: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  action: {
    position: "absolute",
    right: 0,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 160,
    elevation: 5,
  },

  icon: {
    fontSize: 20,
  },
});