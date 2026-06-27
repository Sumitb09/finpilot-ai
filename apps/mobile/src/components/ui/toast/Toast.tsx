import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

import { useAppTheme } from "../../../theme/useAppTheme";
import { ToastItem } from "./toast.types";
import * as Haptics from "expo-haptics";

type Props = {
  toast: ToastItem;
  onRemove(id: string): void;
};

export default function Toast({
  toast,
  onRemove,
}: Props) {
  const { palette } = useAppTheme();

  const translateY = useSharedValue(-80);
  const opacity = useSharedValue(0);

  useEffect(() => {

    switch (toast.type) {
  
      case "success":
  
        Haptics.notificationAsync(
  
          Haptics.NotificationFeedbackType.Success
  
        );
  
        break;
  
      case "warning":
  
        Haptics.notificationAsync(
  
          Haptics.NotificationFeedbackType.Warning
  
        );
  
        break;
  
      case "error":
  
        Haptics.notificationAsync(
  
          Haptics.NotificationFeedbackType.Error
  
        );
  
        break;
  
      default:
  
        Haptics.impactAsync(
  
          Haptics.ImpactFeedbackStyle.Light
  
        );
  
    }
  
  }, []);

  const animatedStyle =
    useAnimatedStyle(() => ({
      opacity: opacity.value,

      transform: [
        {
          translateY:
            translateY.value,
        },

        {
          scale: interpolate(
            opacity.value,
            [0, 1],
            [0.95, 1]
          ),
        },
      ],
    }));

  const config = {
    success: {
      icon: "checkmark-circle",
      color: palette.success,
    },

    error: {
      icon: "close-circle",
      color: palette.danger,
    },

    warning: {
      icon: "warning",
      color: palette.warning,
    },

    info: {
      icon: "information-circle",
      color: palette.primary,
    },
  }[toast.type];

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor:
            palette.card,

          borderLeftColor:
            config.color,
        },
      ]}
    >
      <Ionicons
        name={config.icon as any}
        size={24}
        color={config.color}
      />

      <View style={styles.content}>
        {!!toast.title && (
          <Text
            style={[
              styles.title,
              {
                color:
                  palette.text,
              },
            ]}
          >
            {toast.title}
          </Text>
        )}

        <Text
          style={{
            color:
              palette.subtext,
          }}
        >
          {toast.message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    borderLeftWidth: 5,

    borderRadius: 20,

    padding: 16,

    marginHorizontal: 20,

    marginTop: 12,

    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
});