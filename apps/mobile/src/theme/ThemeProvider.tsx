import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  import { AppTheme } from "./theme.types";
  import { getTheme, saveTheme } from "./theme.service";
  import colors from "./colors";
  import { Appearance } from "react-native";
  
  interface ThemeContextValue {
    theme: AppTheme;
    palette: typeof colors.dark;
    setTheme(theme: AppTheme): Promise<void>;
  }
  
  const ThemeContext = createContext<ThemeContextValue>(null!);
  
  export function ThemeProvider({
    children,
  }: React.PropsWithChildren) {
    const [theme, setCurrentTheme] =
      useState<AppTheme>("dark");
  
    useEffect(() => {
      load();
    }, []);
  
    async function load() {
      const savedTheme = await getTheme();
      setCurrentTheme(savedTheme);
    }
  
    async function setTheme(theme: AppTheme) {
      setCurrentTheme(theme);
      await saveTheme(theme);
    }
  
    const system = Appearance.getColorScheme();

    const palette =
      theme==="system"
        ?(system==="dark"
        ?colors.dark
          :colors.light)
          :theme==="dark"
        ?colors.dark
          :colors.light;
  
    return (
      <ThemeContext.Provider
        value={{
          theme,
          palette,
          setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export function useTheme() {
    return useContext(ThemeContext);
  }