import { createContext } from "react";

import { BottomSheetOptions } from "./bottom-sheet.types";

export interface BottomSheetContextType {
  open(
    options: BottomSheetOptions
  ): void;

  close(): void;
}

export const BottomSheetContext =
  createContext<BottomSheetContextType | null>(
    null
  );