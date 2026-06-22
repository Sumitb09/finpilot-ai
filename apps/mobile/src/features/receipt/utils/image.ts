import * as FileSystem from "expo-file-system/legacy";

export async function imageToBase64(
  uri: string
) {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
}