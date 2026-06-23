import { GoogleGenAI } from "npm:@google/genai@^1.12.0";

const ai = new GoogleGenAI({
  apiKey: Deno.env.get("GEMINI_API_KEY")!,
});

export async function generateText(
    contents: unknown
  ) {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });
  
    return response.text ?? "";
  }