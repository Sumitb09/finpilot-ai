import { serve } from "https://deno.land/std/http/server.ts";

import { corsHeaders } from "../_shared/cors.ts";
import { success, failure } from "../_shared/response.ts";
import { AIRequest } from "../_shared/types.ts";

import { handleChat } from "../handlers/chat.ts";
import { handleReceipt } from "../handlers/receipt.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const body =
      (await req.json()) as AIRequest;

    switch (body.task) {
      case "chat":
        return success(
          await handleChat(body.payload)
        );

      case "receipt":
        return success(
          await handleReceipt(
            String(body.payload.image ?? "")
          )
        );

      default:
        return failure(
          "Unsupported task",
          400
        );
    }
  } catch (error) {
    console.error(error);

    return failure(
      error instanceof Error
        ? error.message
        : "Internal Server Error"
    );
  }
});