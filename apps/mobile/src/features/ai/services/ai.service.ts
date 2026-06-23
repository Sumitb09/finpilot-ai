import { supabase } from "../../../lib/supabase/client";

type ChatPayload = {
  prompt: string;
  history?: unknown[];
  transactions?: unknown[];
  monthlyBudget?: number;
};

export async function askGemini(
  payload: ChatPayload
) {
  const { data, error } =
    await supabase.functions.invoke("ai", {
      body: {
        task: "chat",
        payload,
      },
    });

  if (error) {
    throw error;
  }

  if (!data.success) {
    throw new Error(
      data.error ?? "AI request failed."
    );
  }

  return data.data.reply;
}