import { supabase } from "../../../lib/supabase/client";

export async function parseVoiceTransaction(
  transcript: string
) {
  const { data, error } =
    await supabase.functions.invoke("ai", {
      body: {
        task: "voice_transaction",
        payload: {
          transcript,
        },
      },
    });

  if (error) {
    throw error;
  }

  if (!data.success) {
    throw new Error(
      data.error ??
        "Unable to parse transaction."
    );
  }

  return data.data;
}