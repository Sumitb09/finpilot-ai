import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../../components/ui/Screen";

export default function ReceiptViewerScreen() {
  const { image } =
    useLocalSearchParams<{
      image: string;
    }>();

  return (
    <Screen>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
});