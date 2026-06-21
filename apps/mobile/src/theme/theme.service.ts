import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppTheme } from "./theme.types";

const KEY = "theme";

export async function saveTheme(theme: AppTheme) {
  await AsyncStorage.setItem(KEY, theme);
}

export async function getTheme(): Promise<AppTheme> {
  const value = await AsyncStorage.getItem(KEY);

  return (value as AppTheme) ?? "dark";
}