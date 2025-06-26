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
import { Appearance, useColorScheme as useRNColorScheme } from "react-native";

export type AppTheme = "light" | "dark" | "system";

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
  const { setColorScheme } = useNativeWindColorScheme();

  // Calculate the effective theme (resolves "system" to actual scheme)
  const effectiveTheme = useMemo(() => {
    return theme === "system" ? systemColorScheme || "light" : theme;
  }, [theme, systemColorScheme]);

  // Calculate isDarkMode based on effective theme
  const isDarkMode = effectiveTheme === "dark";

  // Memoize navigation theme
  const navigationTheme = useMemo(() => {
    return isDarkMode ? DarkTheme : DefaultTheme;
  }, [isDarkMode]);

  // Load saved theme from storage
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

  // Listen for device theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === "system") {
        setColorScheme(colorScheme || "light");
      }
    });

    return () => subscription.remove();
  }, [theme, setColorScheme]);

  // Update nativewind color scheme when effective theme changes
  useEffect(() => {
    setColorScheme(effectiveTheme);
  }, [effectiveTheme, setColorScheme]);

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
