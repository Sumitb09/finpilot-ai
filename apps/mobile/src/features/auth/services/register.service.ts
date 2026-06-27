import { supabase } from "../../../lib/supabase/client";

import { RegisterInput } from "../types/register";

export async function registerUser(
  input: RegisterInput
) {
  const {
    fullName,
    email,
    phone,
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