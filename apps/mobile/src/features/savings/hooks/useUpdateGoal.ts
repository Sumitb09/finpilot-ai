import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { queryKeys } from "../../../lib/queryKeys";
  import { updateGoal } from "../services/savings.service";
  
  export function useUpdateGoal() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: {
        id: string;
        payload: any;
      }) => updateGoal(id, payload),
  
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.savings.all,
        });
  
        queryClient.invalidateQueries({
          queryKey: queryKeys.savings.detail(
            variables.id
          ),
        });
  
        queryClient.invalidateQueries({
          queryKey: queryKeys.analytics.all,
        });
      },
    });
  }