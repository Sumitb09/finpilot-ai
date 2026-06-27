import * as Linking from "expo-linking";

export async function payViaUPI(
  url: string
) {
  const supported =
    await Linking.canOpenURL(url);

  if (!supported) {
    throw new Error(
      "No UPI app found."
    );
  }

  return Linking.openURL(url);
}