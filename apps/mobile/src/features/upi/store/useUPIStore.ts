import { create } from "zustand";

import { UPIData } from "../types/upi";

type Store = {
  payment: UPIData | null;

  setPayment: (
    payment: UPIData
  ) => void;

  clear: () => void;
};

export const useUPIStore =
create<Store>((set) => ({
  payment: null,

  setPayment: payment =>
    set({ payment }),

  clear: () =>
    set({
      payment: null,
    }),
}));