import { supabase } from "../../../lib/supabase/client";

export async function parseVoice(
  transcript: string
) {
  const { data, error } =
    await supabase.functions.invoke("ai", {
      body: {
        task: "voice_parser",
        payload: {
          transcript,
        },
      },
    });

  if (error) throw error;

  if (!data.success) {
    throw new Error(
      data.error ??
        "Unable to parse."
    );
  }

  return data.data;
}