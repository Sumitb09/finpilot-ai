import { isToday, isYesterday } from "date-fns";

import { Transaction } from "../types/transaction";

export interface TransactionGroup {
  title: string;
  data: Transaction[];
}

export function groupTransactions(
  transactions: Transaction[]
): TransactionGroup[] {
  const today: Transaction[] = [];
  const yesterday: Transaction[] = [];
  const earlier: Transaction[] = [];

  transactions.forEach((transaction) => {
    const date = new Date(
      transaction.transaction_date
    );

    if (isToday(date)) {
      today.push(transaction);
    } else if (isYesterday(date)) {
      yesterday.push(transaction);
    } else {
      earlier.push(transaction);
    }
  });

  const groups: TransactionGroup[] = [];

  if (today.length) {
    groups.push({
      title: "Today",
      data: today,
    });
  }

  if (yesterday.length) {
    groups.push({
      title: "Yesterday",
      data: yesterday,
    });
  }

  if (earlier.length) {
    groups.push({
      title: "Earlier",
      data: earlier,
    });
  }

  return groups;
}