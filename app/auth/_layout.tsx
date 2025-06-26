import { useAuthStore } from "@/src/auth/stores/auth.store";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { isLoggedIn, shouldCreateAccount } = useAuthStore();

  return (
    <Stack initialRouteName="sign-in" screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="sign-in" />
        <Stack.Protected guard={shouldCreateAccount}>
          <Stack.Screen name="sign-up" />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
};

export default AuthLayout;
