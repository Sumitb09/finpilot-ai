import { useState } from "react";

import { analyzeReceipt } from "../services/receiptAI.service";
import { imageToBase64 } from "../utils/image";

import { ReceiptResult } from "../types/receipt";

export function useReceiptScanner() {
  const [loading, setLoading] =
    useState(false);

  async function scanReceipt(
    uri: string
  ): Promise<ReceiptResult> {
    setLoading(true);

    try {
      const base64 =
        await imageToBase64(uri);

      const response =
        await analyzeReceipt(base64);

      return JSON.parse(response);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    scanReceipt,
  };
}