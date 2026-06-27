import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { queryKeys } from "../../../lib/queryKeys";
  import { createGoal } from "../services/savings.service";
  
  export function useCreateGoal() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createGoal,
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.savings.all,
        });
  
        queryClient.invalidateQueries({
          queryKey: queryKeys.analytics.all,
        });
      },
    });
  }