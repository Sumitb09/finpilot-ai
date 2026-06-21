import { Transaction } from "../types/transaction";

export type TransactionFilter =
  | "all"
  | "income"
  | "expense";

export function filterTransactions(
  transactions: Transaction[],
  search: string,
  filter: TransactionFilter
) {
  const query = search.trim().toLowerCase();

  return transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title
        .toLowerCase()
        .includes(query);

    const matchesFilter =
      filter === "all"
        ? true
        : transaction.type === filter;

    return matchesSearch && matchesFilter;
  });
}