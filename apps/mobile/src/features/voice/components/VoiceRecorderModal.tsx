import React from "react";

import {
  Modal,
  View,
  StyleSheet,
} from "react-native";

import Typography from "../../../components/ui/Typography";

import VoiceWave from "./VoiceWave";
import VoiceButton from "./VoiceButton";

type Props = {
  visible: boolean;

  recording: boolean;

  loading: boolean;

  timer: string;

  onPress: () => void;
};

export default function VoiceRecorderModal({
  visible,
  recording,
  loading,
  timer,
  onPress,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <View style={styles.overlay}>
        <VoiceWave />

        <Typography variant="h2">
          {recording
            ? "Listening..."
            : "Processing..."}
        </Typography>

        <Typography
          style={styles.timer}
        >
          {timer}
        </Typography>

        <VoiceButton
          recording={recording}
          loading={loading}
          onPress={onPress}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },

  timer: {
    fontSize: 34,
    fontWeight: "700",
  },
});