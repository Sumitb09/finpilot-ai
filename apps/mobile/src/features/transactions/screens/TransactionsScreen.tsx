import React, { useMemo, useState } from "react";

import Screen from "../../../components/ui/Screen";
import Section from "../../../components/ui/Section";

import TransactionList from "../components/TransactionList";
import SearchBar from "../components/SearchBar";
import TransactionFilters from "../components/TransactionFilters";

import { useTransactions } from "../hooks/useTransactions";

export default function TransactionsScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<"all" | "income" | "expense">("all");

  const { data = [] } = useTransactions();

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchFilter =
        filter === "all"
          ? true
          : item.type === filter;

      return matchSearch && matchFilter;
    });
  }, [data, search, filter]);

  return (
    <Screen>
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <TransactionFilters
        value={filter}
        onChange={setFilter}
      />

      <Section title="Transactions">
        <TransactionList data={filtered} />
      </Section>
    </Screen>
  );
}