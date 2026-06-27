import { useMutation } from "@tanstack/react-query";

import { verifyOTP } from "../services/phone.service";

export function useVerifyOTP() {
  return useMutation({
    mutationFn: ({
      phone,
      token,
    }: {
      phone: string;
      token: string;
    }) =>
      verifyOTP(phone, token),
  });
}