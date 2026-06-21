import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { AuthProvider } from "../src/providers/AuthProvider";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { useAppTheme } from "../src/theme/useAppTheme";

const queryClient = new QueryClient();

function RootNavigator() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
      />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(protected)" />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}