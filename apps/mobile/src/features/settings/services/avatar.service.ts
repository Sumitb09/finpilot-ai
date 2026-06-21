import * as ImagePicker from "expo-image-picker";

import { supabase } from "../../../lib/supabase/client";
import { getCurrentUserId } from "../../../lib/supabase/user";

export async function uploadAvatar(): Promise<string | null> {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Gallery permission denied.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) return null;

  const asset = result.assets[0];

  const userId = await getCurrentUserId();

  const response = await fetch(asset.uri);
  const blob = await response.blob();

  const fileName = `${userId}.jpg`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, blob, {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return publicUrl;
}