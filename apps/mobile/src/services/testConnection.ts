import { supabase } from "../lib/supabase/client";

export async function testConnection() {
  const { data, error } = await supabase.auth.getSession();

  console.log("Session:", data);

  if (error) {
    console.log("Supabase Error:", error);
  } else {
    console.log("✅ Connected to Supabase");
  }
}