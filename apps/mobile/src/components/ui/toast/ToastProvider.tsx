import React, {
    PropsWithChildren,
    useCallback,
    useMemo,
    useState,
  } from "react";
  
  import {
    StyleSheet,
    View,
  } from "react-native";
  
  import { ToastContext } from "./ToastContext";
  import { ToastItem, ToastType } from "./toast.types";
  import Toast from "./Toast";
  
  export default function ToastProvider({
    children,
  }: PropsWithChildren) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
  
    const removeToast = useCallback((id: string) => {
      setToasts((current) =>
        current.filter((item) => item.id !== id)
      );
    }, []);
  
    const show = useCallback(
      (
        type: ToastType,
        message: string,
        title?: string
      ) => {
        const id = `${Date.now()}-${Math.random()}`;
  
        const toast: ToastItem = {
          id,
          type,
          title,
          message,
        };
  
        setToasts((current) => [
          ...current,
          toast,
        ]);
      },
      [removeToast]
    );
  
    const value = useMemo(
      () => ({
        show,
  
        success: (
          message: string,
          title = "Success"
        ) =>
          show(
            "success",
            message,
            title
          ),
  
        error: (
          message: string,
          title = "Error"
        ) =>
          show(
            "error",
            message,
            title
          ),
  
        warning: (
          message: string,
          title = "Warning"
        ) =>
          show(
            "warning",
            message,
            title
          ),
  
        info: (
          message: string,
          title = "Info"
        ) =>
          show(
            "info",
            message,
            title
          ),
      }),
      [show]
    );
  
    return (
      <ToastContext.Provider
        value={value}
      >
        {children}
  
        <View
          pointerEvents="box-none"
          style={styles.container}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          ))}
        </View>
      </ToastContext.Provider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
  
      top: 60,
  
      left: 0,
  
      right: 0,
  
      zIndex: 9999,
    },
  });