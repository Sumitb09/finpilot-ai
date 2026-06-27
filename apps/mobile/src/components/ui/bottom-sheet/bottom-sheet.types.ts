import React from "react";

export interface BottomSheetOptions {
  title?: string;

  subtitle?: string;

  content: React.ReactNode;

  snapPoints?: string[];

  dismissible?: boolean;
}