import { useContext } from "react";

import { BottomSheetContext } from "./BottomSheetContext";

export function useBottomSheet() {
  const context = useContext(
    BottomSheetContext
  );

  if (!context) {
    throw new Error(
      "useBottomSheet must be used inside BottomSheetProvider."
    );
  }

  return context;
}