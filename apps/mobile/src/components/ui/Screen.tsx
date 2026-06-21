import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "../../theme/useAppTheme";

type Props = {
  children: React.ReactNode;
};

export default function Screen({ children }: Props) {
  const { palette } = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: palette.background,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: palette.background,
          },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});