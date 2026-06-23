import { useQuery } from "@tanstack/react-query";

import { getRecurringTransactions } from "../services/recurring.service";

export function useRecurring() {
  return useQuery({
    queryKey: ["recurring-transactions"],
    queryFn: getRecurringTransactions,
  });
}