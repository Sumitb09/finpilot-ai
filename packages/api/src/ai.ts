import { supabase } from "../../../apps/mobile/src/lib/supabase/client";
import { getClient } from "./client";

const supabase = getClient();
export class AI {
    static async chat(
      payload: ChatPayload
    ) {
      const supabase = getClient();
  
      const { data, error } =
        await supabase.functions.invoke(
          "ai",
          {
            body: {
              task: "chat",
              payload,
            },
          }
        );
  
      if (error) throw error;
  
      return data.data.reply;
    }
  }

export async function askAI(
  payload: {
    prompt: string;
    history?: unknown[];
    transactions?: unknown[];
    monthlyBudget?: number;
  }
) {
  const { data, error } =
    await supabase.functions.invoke(
      "ai",
      {
        body: {
          task: "chat",
          payload,
        },
      }
    );

  if (error) {
    throw error;
  }

  if (!data.success) {
    throw new Error(
      data.error
    );
  }

  return data.data.reply;
}
static async receipt(image: string) {
    const supabase = getClient();
  
    const { data, error } =
      await supabase.functions.invoke("ai", {
        body: {
          task: "receipt",
          payload: {
            image,
          },
        },
      });
  
    if (error) {
      throw error;
    }
  
    if (!data.success) {
      throw new Error(
        data.error ?? "Unknown AI error"
      );
    }
  
    return data.data;
  }