import { useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
  requestRecordingPermissionsAsync,
} from "expo-audio";

export function useVoiceRecorder() {
  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const [recording, setRecording] =
    useState(false);

  async function start() {
    const permission =
      await requestRecordingPermissionsAsync();

    if (!permission.granted) {
      throw new Error(
        "Microphone permission denied."
      );
    }

    await recorder.prepareToRecordAsync();

    recorder.record();

    setRecording(true);
  }

  async function stop() {
    await recorder.stop();

    setRecording(false);

    if (!recorder.uri) {
      throw new Error(
        "Recording failed."
      );
    }

    const base64 =
      await FileSystem.readAsStringAsync(
        recorder.uri,
        {
          encoding:
            FileSystem.EncodingType.Base64,
        }
      );

    return base64;
  }

  return {
    recording,
    start,
    stop,
    duration:
      recorder.currentTime,
  };
}