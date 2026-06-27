import { useMutation } from "@tanstack/react-query";

import { sendOTP } from "../services/phone.service";

export function useSendOTP() {
  return useMutation({
    mutationFn: sendOTP,
  });
}