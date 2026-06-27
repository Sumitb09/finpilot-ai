import { useMutation } from "@tanstack/react-query";

import { signUp } from "../services/auth.service";

export function useRegister() {
  return useMutation({
    mutationFn: signUp,
  });
}