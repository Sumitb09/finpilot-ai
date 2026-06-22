import { supabase } from "../../../lib/supabase/client";

export async function analyzeReceipt(
  imageBase64: string
) {
  const { data, error } =
    await supabase.functions.invoke("ai", {
      body: {
        task: "receipt",
        payload: {
          image: imageBase64,
        },
      },
    });

  if (error) {
    throw error;
  }

  if (!data.success) {
    throw new Error(
      data.error ?? "Receipt scan failed."
    );
  }

  return data.data;
}