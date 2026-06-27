import React from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import Screen from "../../../components/ui/Screen";
import Section from "../../../components/ui/Section";

import SearchBar from "../components/SearchBar";
import TransactionFilters from "../components/TransactionFilters";
import TransactionList from "../components/TransactionList";
import { TransactionFAB } from "../../../components/ui/FAB";

import { useTransactions } from "../hooks/useTransactions";
import { useTransactionFilters } from "../hooks/useTransactionFilters";
import { useProfile } from "../../settings/hooks/useProfile";

export default function TransactionsScreen() {
  const { t } = useTranslation();

  const {
    data = [],
    isPending,
    error,
    refetch,
    isRefetching,
  } = useTransactions();

  const { data: profile } = useProfile();

  const {
    search,
    setSearch,
    filter,
    setFilter,
    filteredTransactions,
  } = useTransactionFilters(data);

  return (
    <Screen>
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <TransactionFilters
          value={filter}
          onChange={setFilter}
        />

        <Section
          title={t("transactions.transactions")}
          style={styles.section}
        >
          <TransactionList
            data={filteredTransactions}
            currency={profile?.currency ?? "INR"}
            loading={isPending}
            error={!!error}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </Section>

        <TransactionFAB />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
    flex: 1,
    marginTop: 12,
  },
});