import { useState } from "react";

import { transcribeAudio } from "../services/transcribe.service";
import { parseVoice } from "../services/voiceParser.service";

export function useVoiceTransaction() {
  const [loading, setLoading] =
    useState(false);

  async function process(
    audioBase64: string
  ) {
    setLoading(true);

    try {
      const transcript =
        await transcribeAudio(
          audioBase64
        );

      const parsed =
        await parseVoice(
          transcript.text
        );

      return {
        transcript:
          transcript.text,
        ...parsed,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    process,
  };
}