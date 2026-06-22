import { generateText } from "../_shared/gemini.ts";

export async function handleReceipt(
  image: string
) {
  const response = await generateText([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: image,
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
  ]);

  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log(cleaned);

  return JSON.parse(cleaned);
}