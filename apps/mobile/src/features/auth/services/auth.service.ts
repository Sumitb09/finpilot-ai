import { supabase } from "../../../lib/supabase/client";
import {
  LoginInput,
  SignUpInput,
} from "../types/auth";

export async function signUp(
  input: SignUpInput
) {
  const {
    fullName,
    phone,
    email,
    password,
  } = input;

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

  if (error) throw error;

  return data;
}

export async function signIn(
  input: LoginInput
) {
  const { email, password } =
    input;

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) throw error;
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function getUser() {
  return supabase.auth.getUser();
}