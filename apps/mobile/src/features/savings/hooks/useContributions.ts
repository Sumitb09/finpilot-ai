import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../../../lib/queryKeys";
import { getContributions } from "../services/savings.service";

export function useContributions(
  goalId: string
) {
  return useQuery({
    queryKey:
      queryKeys.savings.contributions(
        goalId
      ),

    queryFn: () =>
      getContributions(goalId),

    enabled: Boolean(goalId),
  });
}