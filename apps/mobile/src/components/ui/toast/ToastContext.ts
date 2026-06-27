import { createContext } from "react";
import { ToastType } from "./toast.types";

export interface ToastContextType {
  show: (
    type: ToastType,
    message: string,
    title?: string
  ) => void;

  success: (
    message: string,
    title?: string
  ) => void;

  error: (
    message: string,
    title?: string
  ) => void;

  warning: (
    message: string,
    title?: string
  ) => void;

  info: (
    message: string,
    title?: string
  ) => void;
}

export const ToastContext =
  createContext<ToastContextType | null>(
    null
  );