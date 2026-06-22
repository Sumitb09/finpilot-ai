import { supabase } from "../../../lib/supabase/client";

import {
  CreateRecurringTransaction,
  RecurringTransaction,
} from "../types/recurring";

async function getUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id;
}

export async function getRecurringTransactions() {
  const userId = await getUserId();

  if (!userId) return [];

  const { data, error } = await supabase
    .from("recurring_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("next_date", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ??
    []) as RecurringTransaction[];
}

export async function createRecurringTransaction(
  recurring: CreateRecurringTransaction
) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("User not found");
  }

  const { error } = await supabase
    .from("recurring_transactions")
    .insert({
      user_id: userId,
      ...recurring,
    });

  if (error) {
    throw error;
  }
}

export async function updateRecurringTransaction(
  id: string,
  recurring: Partial<CreateRecurringTransaction>
) {
  const { error } = await supabase
    .from("recurring_transactions")
    .update(recurring)
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteRecurringTransaction(
  id: string
) {
  const { error } = await supabase
    .from("recurring_transactions")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}