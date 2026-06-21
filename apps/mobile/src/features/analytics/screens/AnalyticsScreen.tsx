import React from "react";
import { Text } from "react-native";

import Screen from "../../../components/ui/Screen";

export default function AnalyticsScreen() {
  return (
    <Screen>
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "700",
          marginTop: 20,
        }}
      >
        Analytics
      </Text>
    </Screen>
  );
}