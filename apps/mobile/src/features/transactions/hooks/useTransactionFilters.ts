import { useMemo, useState } from "react";

import { useTransactions } from "./useTransactions";
import {
  filterTransactions,
  TransactionFilter,
} from "../utils/filterTransactions";

export function useTransactionFilters() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<TransactionFilter>("all");

  const {
    data = [],
    isPending,
  } = useTransactions();

  const transactions = useMemo(
    () =>
      filterTransactions(
        data,
        search,
        filter
      ),
    [data, search, filter]
  );

  return {
    transactions,
    search,
    setSearch,
    filter,
    setFilter,
    isPending,
  };
}