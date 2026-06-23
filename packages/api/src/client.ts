import { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function initializeAPI(
  supabase: SupabaseClient
) {
  client = supabase;
}

export function getClient() {
  if (!client) {
    throw new Error(
      "API client has not been initialized."
    );
  }

  return client;
}