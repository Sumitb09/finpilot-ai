import { Transaction } from "../../transactions/types/transaction";

export function getExpenseTrend(
  transactions: Transaction[]
) {
  const days = new Array(31).fill(0);

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const day =
        new Date(t.transaction_date).getDate();

      days[day - 1] += Number(t.amount);
    });

  return days;
}

export function getIncomeTrend(
  transactions: Transaction[]
) {
  const days = new Array(31).fill(0);

  transactions
    .filter((t) => t.type === "income")
    .forEach((t) => {
      const day =
        new Date(t.transaction_date).getDate();

      days[day - 1] += Number(t.amount);
    });

  return days;
}