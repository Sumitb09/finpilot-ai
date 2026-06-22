import { useMemo, useState } from "react";

import { Transaction } from "../types/transaction";

export type TransactionFilter =
  | "all"
  | "income"
  | "expense";

export function useTransactionFilters(
  transactions: Transaction[]
) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState<TransactionFilter>("all");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(query) ||
        transaction.note
          ?.toLowerCase()
          .includes(query) ||
        transaction.categories?.name
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "all"
          ? true
          : transaction.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return {
    search,
    setSearch,

    filter,
    setFilter,

    filteredTransactions,
  };
}