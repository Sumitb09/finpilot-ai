import React, { useMemo, useState } from "react";
import Screen from "../../../components/ui/Screen";
import Section from "../../../components/ui/Section";
import TransactionList from "../components/TransactionList";
import SearchBar from "../components/SearchBar";
import TransactionFilters from "../components/TransactionFilters";
import { useTransactions } from "../hooks/useTransactions";
import { useTransactionFilters } from "../hooks/useTransactionFilters";

export default function TransactionsScreen() {
  const { data = [], isPending, error, refetch, isRefetching, } = useTransactions();
  const {search, setSearch, filter, setFilter, filteredTransactions, } = useTransactionFilters(data);
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
        <TransactionList 
          data={filteredTransactions}
          loading={isPending}
          error={!!error}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      </Section>
    </Screen>
  );
}