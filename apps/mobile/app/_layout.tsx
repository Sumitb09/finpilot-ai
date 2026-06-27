import "../src/i18n";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  QueryClientProvider,
} from "@tanstack/react-query";

import { ThemeProvider } from "../src/theme/ThemeProvider";
import { useAppTheme } from "../src/theme/useAppTheme";

import { ToastProvider } from "@/src/components/ui/toast";
import { BottomSheetProvider } from "@/src/components/ui/bottom-sheet";
import { AuthProvider } from "../src/providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "@/src/config/reactQuery";


function RootNavigator() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar
        style={
          theme === "light"
            ? "dark"
            : "light"
        }
      />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />

        <Stack.Screen name="(protected)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <BottomSheetProvider>
                <RootNavigator />
              </BottomSheetProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}