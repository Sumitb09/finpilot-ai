import { generateText } from "../_shared/gemini.ts";
import { buildChatPrompt } from "../_shared/prompts.ts";
import { AIRequest } from "../_shared/types.ts";

export async function handleChat(
  payload: AIRequest["payload"]
) {
  const reply = await generateText(
    buildChatPrompt(payload)
  );

  return {
    reply,
  };
}