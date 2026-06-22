import React from "react";

import TransactionGroup from "./TransactionGroup";

import {
  groupTransactions,
} from "../utils/groupTransactions";

import { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

export default function GroupedTransactionList({
  transactions,
}: Props) {
  const groups =
    groupTransactions(transactions);

  return (
    <>
      {groups.map((group) => (
        <TransactionGroup
          key={group.title}
          group={group}
        />
      ))}
    </>
  );
}