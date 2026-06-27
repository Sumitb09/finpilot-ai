import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { queryKeys } from "../../../lib/queryKeys";
  import { addContribution } from "../services/savings.service";
  
  export function useAddContribution() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        goal,
        amount,
      }: {
        goal: any;
        amount: number;
      }) =>
        addContribution(
          goal,
          amount
        ),
  
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.savings.all,
        });
  
        queryClient.invalidateQueries({
          queryKey: queryKeys.savings.detail(
            variables.goal.id
          ),
        });
  
        queryClient.invalidateQueries({
          queryKey:
            queryKeys.savings.contributions(
              variables.goal.id
            ),
        });
  
        queryClient.invalidateQueries({
          queryKey: queryKeys.analytics.all,
        });
      },
    });
  }