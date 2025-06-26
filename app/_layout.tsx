import { ThemedGluestackUIProvider } from "@/components/ui/gluestack-ui-provider/themed-gluestack";
import { ThemeProvider } from "@/components/ui/ThemeProvider/ThemeProvider";
import "@/global.css";
import { useAuthStore } from "@/src/auth/stores/auth.store";
import { Stack } from "expo-router";

const RootRouteStack = () => {
  const { isLoggedIn, hasCompletedOnboarding } = useAuthStore();

  console.log({ isLoggedIn, hasCompletedOnboarding });
  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedGluestackUIProvider>
        <RootRouteStack />
      </ThemedGluestackUIProvider>
    </ThemeProvider>
  );
}
