import { supabase } from "../../../lib/supabase/client";

export async function transcribeAudio(
  audioBase64: string
) {
  const { data, error } =
    await supabase.functions.invoke("ai", {
      body: {
        task: "voice_transcription",
        payload: {
          audio: audioBase64,
        },
      },
    });

  if (error) throw error;

  if (!data.success) {
    throw new Error(
      data.error ??
        "Unable to transcribe audio."
    );
  }

  return data.data;
}