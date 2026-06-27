import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Animated,
  Pressable,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../../../components/ui/Screen";
import Button from "../../../components/ui/Button";
import Typography from "../../../components/ui/Typography";

import { parseUPI } from "../services/upiParser";
import { useUPIStore } from "../store/useUPIStore";

export default function ScanUPIScreen() {
  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] =
    useState(false);

  const [torch, setTorch] =
    useState(false);

  const line =
    useRef(new Animated.Value(0))
      .current;

  const { setPayment } =
    useUPIStore();

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(line, {
          toValue: 240,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(line, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!permission) return <Screen />;

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

  async function processQR(
    value: string
  ) {
    if (scanned) return;

    setScanned(true);

    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType
        .Success
    );

    const payment =
      parseUPI(value);

    if (!payment) {
      Alert.alert(
        "Invalid QR",
        "This is not a UPI QR code.",
        [
          {
            text: "Scan Again",
            onPress: () =>
              setScanned(false),
          },
        ]
      );
      return;
    }

    setPayment(payment);

    router.replace(
      "/(protected)/upi-preview"
    );
  }

  async function openGallery() {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
      });

    if (result.canceled) return;

    Alert.alert(
      "Coming Soon",
      "QR detection from gallery will be added next."
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        enableTorch={torch}
        onBarcodeScanned={({ data }) =>
          processQR(data)
        }
      />

      {/* Top */}

      <View style={styles.topBar}>
        <Pressable
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="close"
            color="#fff"
            size={30}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            setTorch(!torch)
          }
        >
          <Ionicons
            name={
              torch
                ? "flash"
                : "flash-off"
            }
            color="#fff"
            size={28}
          />
        </Pressable>
      </View>

      {/* Scanner */}

      <View style={styles.overlay}>
        <View style={styles.frame}>
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY: line,
                  },
                ],
              },
            ]}
          />
        </View>

        <Typography
          style={styles.text}
        >
          Point your camera at any
          UPI QR Code
        </Typography>

        <Typography
          style={styles.sub}
        >
          Google Pay • PhonePe •
          Paytm • BHIM
        </Typography>
      </View>

      {/* Bottom */}

      <View style={styles.bottom}>
        <Button
          title="Choose from Gallery"
          onPress={openGallery}
        />
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    topBar: {
      position: "absolute",
      top: 60,
      left: 20,
      right: 20,
      flexDirection: "row",
      justifyContent:
        "space-between",
      zIndex: 10,
    },

    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    frame: {
      width: 280,
      height: 280,
      borderRadius: 24,
      borderWidth: 3,
      borderColor: "#00E676",
      overflow: "hidden",
    },

    scanLine: {
      width: "100%",
      height: 3,
      backgroundColor: "#00E676",
    },

    text: {
      color: "#fff",
      marginTop: 30,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },

    sub: {
      color: "#bbb",
      marginTop: 8,
      textAlign: "center",
    },

    bottom: {
      position: "absolute",
      bottom: 40,
      width: "100%",
      paddingHorizontal: 20,
    },
  });