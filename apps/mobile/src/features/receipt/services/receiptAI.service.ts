import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY!,
});

export async function analyzeReceipt(
    imageBase64: string
  ) {
    let lastError;
  
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response =
          await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
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
  
  Return ONLY valid JSON.
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
      } catch (error) {
        lastError = error;
  
        if (attempt < 3) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1500)
          );
        }
      }
    }
  
    throw lastError;
  }