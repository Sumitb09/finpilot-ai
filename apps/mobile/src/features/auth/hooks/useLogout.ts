import { useMutation } from "@tanstack/react-query";

import { signOut } from "../services/auth.service";

export function useLogout() {
  return useMutation({
    mutationFn: signOut,
  });
}