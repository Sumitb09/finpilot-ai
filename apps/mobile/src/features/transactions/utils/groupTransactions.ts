import { Transaction } from "../types/transaction";

export function groupTransactions(
  transactions: Transaction[]
) {
  const groups: Record<
    string,
    Transaction[]
  > = {};

  transactions.forEach((transaction) => {
    const date =
      transaction.transaction_date;

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(transaction);
  });

  return Object.entries(groups);
}