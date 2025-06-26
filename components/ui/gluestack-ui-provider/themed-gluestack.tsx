"use client";

import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { ReactNode } from "react";
import { GluestackUIProvider } from ".";
import { useTheme } from "../ThemeProvider/ThemeProvider";

export function ThemedGluestackUIProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isDarkMode, navigationTheme } = useTheme();

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <GluestackUIProvider mode={isDarkMode ? "dark" : "light"}>
        {children}
      </GluestackUIProvider>
    </NavigationThemeProvider>
  );
}