import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY!,
});

export async function analyzeReceipt(
  imageBase64: string
) {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
          },
        },
        {
          text: `
Extract this receipt.

Return ONLY JSON.

{
 "merchant":"",
 "amount":0,
 "category":"",
 "date":"",
 "items":[]
}
`,
        },
      ],
    });

  return response.text ?? "";
}