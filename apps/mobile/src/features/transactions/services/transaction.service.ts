import { supabase } from "../../../lib/supabase/client";
import { getCurrentUserId } from "../../../lib/supabase/user";

import {
  Transaction,
  CreateTransactionInput,
} from "../types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      categories (
        id,
        name,
        icon,
        color
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  console.log("========== GET TRANSACTIONS ==========");
  console.log(data);
  console.log(error);

  if (error) throw error;

  return (data ?? []) as Transaction[];
}

export async function createTransaction(
  payload: Omit<CreateTransactionInput, "user_id">
): Promise<Transaction> {
  const userId = await getCurrentUserId();

  console.log("========== USER ==========");
  console.log(userId);

  console.log("========== PAYLOAD ==========");
  console.log({
    ...payload,
    user_id: userId,
  });

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...payload,
      user_id: userId,
    })
    .select(`
      *,
      categories (
        id,
        name,
        icon,
        color
      )
    `)
    .single();

  console.log("========== RESULT ==========");
  console.log(data);
  console.log(error);

  if (error) throw error;

  return data as Transaction;
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getTransactionById(id: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color
        )
      `)
      .eq("id", id)
      .single();
  
    if (error) throw error;
  
    return data as Transaction;
  }
  
  export async function updateTransaction(
    id: string,
    payload: Omit<CreateTransactionInput, "user_id">
  ) {
    const { data, error } = await supabase
      .from("transactions")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
  
    if (error) throw error;
  
    return data;
  }