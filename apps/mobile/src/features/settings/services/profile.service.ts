import { supabase } from "../../../lib/supabase/client";
import { getCurrentUserId } from "../../../lib/supabase/user";

import {
  Profile,
  UpdateProfileInput,
} from "../types/profile";

export async function getProfile(): Promise<Profile> {
    const userId = await getCurrentUserId();
  
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
  
    if (error) throw error;
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    return {
      ...data,
      email: user?.email ?? "",
    };
  }

export async function updateProfile(
  payload: UpdateProfileInput
) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}