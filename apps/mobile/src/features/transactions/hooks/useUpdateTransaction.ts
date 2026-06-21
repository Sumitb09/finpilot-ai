import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import { updateTransaction } from "../services/transaction.service";
  
  export function useUpdateTransaction() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: {
        id: string;
        payload: Parameters<
          typeof updateTransaction
        >[1];
      }) =>
        updateTransaction(id, payload),
  
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });
  
        queryClient.invalidateQueries({
          queryKey: [
            "transaction",
            variables.id,
          ],
        });
  
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
      },
    });
  }