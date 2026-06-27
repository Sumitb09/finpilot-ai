import React, {
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
    useState,
  } from "react";
  
  import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";
  
  import Typography from "../Typography";
  
  import { useAppTheme } from "../../../theme/useAppTheme";
  
  import { BottomSheetContext } from "./BottomSheetContext";
  import { BottomSheetOptions } from "./bottom-sheet.types";
  
  export default function BottomSheetProvider({
    children,
  }: PropsWithChildren) {
    const { palette } = useAppTheme();
  
    const bottomSheetRef =
      useRef<BottomSheet>(null);
  
    const [options, setOptions] =
      useState<BottomSheetOptions | null>(
        null
      );
  
    const open = useCallback(
      (
        sheet: BottomSheetOptions
      ) => {
        setOptions(sheet);
  
        requestAnimationFrame(() => {
          bottomSheetRef.current?.expand();
        });
      },
      []
    );
  
    const close = useCallback(() => {
      bottomSheetRef.current?.close();
    }, []);
  
    const value = useMemo(
      () => ({
        open,
        close,
      }),
      [open, close]
    );
  
    return (
      <BottomSheetContext.Provider
        value={value}
      >
        {children}
  
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose
          snapPoints={
            options?.snapPoints ??
            ["45%"]
          }
          onClose={() =>
            setOptions(null)
          }
          backdropComponent={(
            props
          ) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
          backgroundStyle={{
            backgroundColor:
              palette.card,
          }}
          handleIndicatorStyle={{
            backgroundColor:
              palette.border,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {!!options?.title && (
              <Typography
                variant="h3"
                style={{
                  marginBottom: 4,
                }}
              >
                {options.title}
              </Typography>
            )}
  
            {!!options?.subtitle && (
              <Typography
                style={{
                  color:
                    palette.subtext,
                  marginBottom: 20,
                }}
              >
                {options.subtitle}
              </Typography>
            )}
  
            {options?.content}
          </BottomSheetView>
        </BottomSheet>
      </BottomSheetContext.Provider>
    );
  }