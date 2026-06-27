import React from "react";
import {
  Pressable,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

import { radius, shadows } from "../../theme";
import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function Card({
  children,
  style,
  onPress,
}: Props) {
  const { palette } = useAppTheme();

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 18,
    ...shadows.card,
  },
});