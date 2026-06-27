import { useMutation } from "@tanstack/react-query";

import { signIn } from "../services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: signIn,
  });
}