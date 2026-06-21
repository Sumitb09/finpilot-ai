import { supabase } from "../../../lib/supabase/client";
import { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return (data ?? []) as Category[];
}