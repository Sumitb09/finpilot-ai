import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { queryKeys } from "../../../lib/queryKeys";
  import { deleteGoal } from "../services/savings.service";
  
  export function useDeleteGoal() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteGoal,
  
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