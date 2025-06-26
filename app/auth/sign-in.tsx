import { useAuthStore } from "@/src/auth/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

// Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { authenticate, logIn } = useAuthStore();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
    clearErrors("root");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API

      const mockUser = authenticate(data.email, data.password);

      // Simulate login success
      logIn(mockUser);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setError("root", {
        message: "Something went wrong during login.",
      });
    }
  });

  return (
    <View className="flex-1 justify-center p-6 bg-gray-50 dark:bg-gray-800">
      <Text className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
        Welcome Back
      </Text>

      {errors.root && (
        <Text className="text-red-500 mb-4 text-center">
          {errors.root.message}
        </Text>
      )}

      {/* Email */}
      <View className="mb-4">
        <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-md p-3 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-black dark:text-white`}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mt-1 text-sm">
            {errors.email.message}
          </Text>
        )}
      </View>

      {/* Password */}
      <View className="mb-6">
        <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Password
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-md p-3 ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-black dark:text-white`}
              placeholder="Enter your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 mt-1 text-sm">
            {errors.password.message}
          </Text>
        )}
      </View>

      {/* Submit */}
      <TouchableOpacity
        className="bg-blue-500 rounded-md p-3 items-center dark:bg-blue-700"
        onPress={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-medium">Log In</Text>
        )}
      </TouchableOpacity>

      {/* Link to Login Screen */}
      <View className="mt-6 text-center">
        <Link asChild push href={"/auth/sign-up"}>
          <TouchableOpacity>
            <Text className="text-sm font-medium text-blue-500 dark:text-blue-400">
              Don&apos;t have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
