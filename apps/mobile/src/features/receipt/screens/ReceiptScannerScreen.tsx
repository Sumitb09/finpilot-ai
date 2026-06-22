import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import Button from "../../../components/ui/Button";
import Screen from "../../../components/ui/Screen";
import Typography from "../../../components/ui/Typography";

import { useReceiptScanner } from "../hooks/useReceiptScanner";

export default function ReceiptScannerScreen() {
  const cameraRef =
    useRef<CameraView>(null);

  const [permission, requestPermission] =
    useCameraPermissions();

  const {
    loading,
    scanReceipt,
  } = useReceiptScanner();

  if (!permission) {
    return <Screen />;
  }

  if (!permission.granted) {
    return (
      <Screen>
        <Button
          title="Allow Camera"
          onPress={requestPermission}
        />
      </Screen>
    );
  }

  async function handleCapture() {
    try {
      const photo =
        await cameraRef.current?.takePictureAsync({
          quality: 0.8,
        });

      if (!photo) return;

      const receipt =
        await scanReceipt(photo.uri);

      router.push({
        pathname:
          "/(protected)/receipt-preview",
        params: {
          receipt: JSON.stringify(receipt),
        },
      });
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error",
        "Failed to scan receipt."
      );
    }
  }

  async function handleGallery() {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (result.canceled) return;

    const receipt =
      await scanReceipt(
        result.assets[0].uri
      );

    router.push({
      pathname:
        "/(protected)/receipt-preview",
      params: {
        receipt: JSON.stringify(receipt),
      },
    });
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
      />

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator
            size="large"
            color="#fff"
          />

          <Typography
            style={styles.text}
          >
            🤖 AI is reading your receipt...
          </Typography>
        </View>
      )}

      <View style={styles.bottom}>
        <Button
          title="📷 Capture"
          onPress={handleCapture}
        />

        <Button
          title="🖼 Gallery"
          onPress={handleGallery}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  bottom: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
    gap: 12,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 18,
  },
});