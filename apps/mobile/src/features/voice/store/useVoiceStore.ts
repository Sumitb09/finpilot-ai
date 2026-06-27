import { create } from "zustand";

export interface VoiceDraft {
  merchant?: string;
  amount?: number;
  note?: string;
  category?: string;
  paymentMethod?: string;
}

type VoiceStore = {
  draft: VoiceDraft | null;

  setDraft: (draft: VoiceDraft) => void;

  clearDraft: () => void;
};

export const useVoiceStore =
  create<VoiceStore>((set) => ({
    draft: null,

    setDraft: (draft) =>
      set({ draft }),

    clearDraft: () =>
      set({ draft: null }),
  }));