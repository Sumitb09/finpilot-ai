import { create } from "zustand";

export interface ReceiptDraft {
    merchant?: string;
    amount?: number;
    date?: string;
    category?: string;
    note?: string;
  
    image?: string;
  
    items?: {
      name: string;
      quantity?: number;
      price: number;
    }[];
  }

type ReceiptStore = {
  receipt: ReceiptDraft | null;

  setReceipt: (receipt: ReceiptDraft) => void;

  clearReceipt: () => void;
};

export const useReceiptStore =
  create<ReceiptStore>((set) => ({
    receipt: null,

    setReceipt: (receipt) =>
      set({
        receipt,
      }),

    clearReceipt: () =>
      set({
        receipt: null,
      }),
  }));