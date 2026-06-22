import { GoogleGenAI } from "@google/genai";

const apiKey =
  process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  console.log(
    "Gemini API Key:",
    process.env.EXPO_PUBLIC_GEMINI_API_KEY
  );

if (!apiKey) {
  console.warn(
    "EXPO_PUBLIC_GEMINI_API_KEY is not configured."
  );
}

const ai = new GoogleGenAI({
  apiKey: apiKey ?? "",
});

export async function askGemini(
  prompt: string
): Promise<string> {
  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    const text = response.text?.trim();

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    return text;
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error
    );

    throw error;
  }
}