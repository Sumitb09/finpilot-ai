import { corsHeaders } from "./cors.ts";
import { AIResponse } from "./types.ts";

export function success<T>(
  data: T
) {
  const body: AIResponse<T> = {
    success: true,
    data,
  };

  return new Response(
    JSON.stringify(body),
    {
      headers: {
        ...corsHeaders,
        "Content-Type":
          "application/json",
      },
    }
  );
}

export function failure(
  message: string,
  status = 500
) {
  const body: AIResponse = {
    success: false,
    error: message,
  };

  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type":
          "application/json",
      },
    }
  );
}