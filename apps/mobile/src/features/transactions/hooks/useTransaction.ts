import { useQuery } from "@tanstack/react-query";

import { getTransactionById } from "../services/transaction.service";

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });
}