import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../../../lib/queryKeys";
import { getGoals } from "../services/savings.service";

export function useGoals() {
  return useQuery({
    queryKey: queryKeys.savings.all,
    queryFn: getGoals,
  });
}