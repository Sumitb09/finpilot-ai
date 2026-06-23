import { supabase } from "../../../lib/supabase/client";

import { ChatMessage } from "../types/chat";

export async function getMessages() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("ai_messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map(
    (message): ChatMessage => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.created_at,
    })
  );
}

export async function saveMessage(
  role: "user" | "assistant",
  content: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("ai_messages")
    .insert({
      user_id: user.id,
      role,
      content,
    });

  if (error) {
    throw error;
  }
}

export async function clearConversation() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from("ai_messages")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
}