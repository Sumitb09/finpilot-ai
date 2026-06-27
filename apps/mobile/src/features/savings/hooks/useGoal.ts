import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../../../lib/queryKeys";
import { getGoal } from "../services/savings.service";

export function useGoal(id: string) {
  return useQuery({
    queryKey: queryKeys.savings.detail(id),
    queryFn: () => getGoal(id),
    enabled: Boolean(id),
  });
}