import { useState } from "react";

import { Transaction } from "../../transactions/types/transaction";
import { generateMonthlyReport } from "../services/report.service";

export function useReport() {
  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState("");

  async function generate(
    transactions: Transaction[],
    budget: number
  ) {
    setLoading(true);

    try {
      const result =
        await generateMonthlyReport(
          transactions,
          budget
        );

      setReport(result);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    report,
    generate,
  };
}