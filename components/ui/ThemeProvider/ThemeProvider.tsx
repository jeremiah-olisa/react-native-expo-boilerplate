"use client";

import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

type AppTheme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: AppTheme;
  navigationTheme: typeof DarkTheme;
  toggleTheme: () => void;
  isDarkMode: boolean;
  setTheme: (theme: AppTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useRNColorScheme();
  const [theme, setCurrentTheme] = useState<AppTheme>("system");

  // Calculate isDarkMode without triggering extra renders
  const isDarkMode = useMemo(() => {
    return (
      theme === "dark" || (theme === "system" && systemColorScheme === "dark")
    );
  }, [theme, systemColorScheme]);

  // Memoize navigation theme to prevent unnecessary recalculations
  const navigationTheme = useMemo(() => {
    return isDarkMode ? DarkTheme : DefaultTheme;
  }, [isDarkMode]);

  // Load saved theme from storage (runs only once)
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = (await SecureStore.getItemAsync(
          "theme"
        )) as AppTheme | null;
        if (savedTheme) {
          setCurrentTheme(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme", error);
      }
    };
    loadTheme();
  }, []);

  // Set the theme in nativewind (only when it changes)
  const { setColorScheme } = useNativeWindColorScheme();
  useEffect(() => {
    const effectiveTheme =
      theme === "system" ? systemColorScheme || "light" : theme;
    setColorScheme(effectiveTheme);
  }, [theme, systemColorScheme, setColorScheme]);

  const setTheme = async (newTheme: AppTheme) => {
    setCurrentTheme(newTheme);
    try {
      await SecureStore.setItemAsync("theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        navigationTheme,
        toggleTheme,
        isDarkMode,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
