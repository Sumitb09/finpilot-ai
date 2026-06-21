import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "../services/transaction.service";

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
}