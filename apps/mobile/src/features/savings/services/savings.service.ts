import { supabase } from "../../../lib/supabase/client";
import { getCurrentUserId } from "../../../lib/supabase/user";

import {
  SavingsGoal,
  CreateGoalInput,
  UpdateGoalInput,
} from "../types/goal";

import { AddContributionInput } from "../types/contribution";

export async function getGoals(): Promise<SavingsGoal[]> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("savings_goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as SavingsGoal[];
}

export async function getGoal(
  id: string
): Promise<SavingsGoal> {
  const { data, error } =
    await supabase
      .from("savings_goals")
      .select("*")
      .eq("id", id)
      .single();

  if (error) throw error;

  return data as SavingsGoal;
}

export async function createGoal(
  input: CreateGoalInput
): Promise<SavingsGoal> {
  const userId =
    await getCurrentUserId();

  const { data, error } =
    await supabase
      .from("savings_goals")
      .insert({
        ...input,
        user_id: userId,
      })
      .select()
      .single();

  if (error) throw error;

  return data as SavingsGoal;
}

export async function updateGoal(
  id: string,
  payload: UpdateGoalInput
): Promise<SavingsGoal> {
  const { data, error } =
    await supabase
      .from("savings_goals")
      .update({
        ...payload,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

  if (error) throw error;

  return data as SavingsGoal;
}

export async function deleteGoal(
  id: string
) {
  const { error } =
    await supabase
      .from("savings_goals")
      .delete()
      .eq("id", id);

  if (error) throw error;
}

export async function addContribution(
  goal: SavingsGoal,
  amount: number
): Promise<SavingsGoal> {
  const { data, error } =
    await supabase
      .from("savings_goals")
      .update({
        saved_amount:
          Number(goal.saved_amount) +
          Number(amount),
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", goal.id)
      .select()
      .single();

  if (error) throw error;

  return data as SavingsGoal;
}

export async function getContributions(
  goalId: string
) {
  const { data, error } =
    await supabase
      .from("savings_contributions")
      .select("*")
      .eq("goal_id", goalId)
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data ?? [];
}

export async function saveContribution(
  input: AddContributionInput
) {
  const userId =
    await getCurrentUserId();

  const { data, error } =
    await supabase
      .from("savings_contributions")
      .insert({
        ...input,
        user_id: userId,
      })
      .select()
      .single();

  if (error) throw error;

  return data;
}