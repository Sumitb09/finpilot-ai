import { MERCHANT_DICTIONARY } from "./merchantDictionary";

export function predictCategory(
  value: string
) {
  const query = value.toLowerCase();

  for (const [category, words] of Object.entries(
    MERCHANT_DICTIONARY
  )) {
    if (
      words.some((word) =>
        query.includes(word)
      )
    ) {
      return category;
    }
  }

  return null;
}