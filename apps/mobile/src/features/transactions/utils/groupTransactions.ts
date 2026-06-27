import {
  isToday,
  isYesterday,
  format,
} from "date-fns";

export function groupTransactions(
  transactions: any[]
) {
  const groups: Record<
    string,
    any[]
  > = {};

  transactions.forEach((transaction) => {
    const date = new Date(
      transaction.transaction_date
    );

    let key = "";

    if (isToday(date)) {
      key = "Today";
    } else if (isYesterday(date)) {
      key = "Yesterday";
    } else {
      key = format(
        date,
        "MMMM d, yyyy"
      );
    }

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(transaction);
  });

  return groups;
}