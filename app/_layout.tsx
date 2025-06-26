import { Stack } from "expo-router";

import { ThemedGluestackUIProvider } from "@/components/ui/gluestack-ui-provider/themed-gluestack";
import { ThemeProvider } from "@/components/ui/ThemeProvider/ThemeProvider";
import "@/global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedGluestackUIProvider>
        <Stack />
      </ThemedGluestackUIProvider>
    </ThemeProvider>
  );
}
