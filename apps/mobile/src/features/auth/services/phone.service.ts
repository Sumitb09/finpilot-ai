import { supabase } from "../../../lib/supabase/client";

export async function sendOTP(
  phone: string
) {
  const { data, error } =
    await supabase.auth.signInWithOtp({
      phone,
    });

  if (error) throw error;

  return data;
}

export async function verifyOTP(
  phone: string,
  token: string
) {
  const { data, error } =
    await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

  if (error) throw error;

  return data;
}