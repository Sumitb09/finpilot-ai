import { useState } from "react";

import { useVoiceRecorder } from "./useAudioRecorder";
import { useVoiceTransaction } from "./useVoiceTransaction";

import { useVoiceStore } from "../store/useVoiceStore";

export function useVoiceFlow() {
  const recorder =
    useVoiceRecorder();

  const parser =
    useVoiceTransaction();

  const {
    setDraft,
  } = useVoiceStore();

  const [processing, setProcessing] =
    useState(false);

  async function toggle() {
    if (!recorder.recording) {
      return recorder.start();
    }

    setProcessing(true);

    try {
      const audio =
        await recorder.stop();

      const parsed =
        await parser.process(audio);

      setDraft(parsed);
    } finally {
      setProcessing(false);
    }
  }

  return {
    recording:
      recorder.recording,

    processing,

    duration:
      recorder.duration,

    toggle,
  };
}