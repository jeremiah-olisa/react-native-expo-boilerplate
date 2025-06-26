"use client";

import {
  AppTheme,
  useTheme,
} from "@/components/ui/ThemeProvider/ThemeProvider";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleThemeChange = (newTheme: AppTheme) => {
    setTheme(newTheme);
    setShowDropdown(false); // Close the dropdown after selection
  };

  return (
    <View className="p-6">
      {/* Header Title */}
      <Text className="text-3xl font-bold text-center dark:text-white text-gray-900">
        Welcome! 👋
      </Text>
      <Text className="text-lg text-center mt-2 dark:text-gray-300 text-gray-600">
        Choose your preferred theme
      </Text>

      {/* Theme Dropdown Button */}
      <TouchableOpacity
        onPress={() => setShowDropdown(!showDropdown)}
        className="mt-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-700"
        activeOpacity={0.7}
      >
        <Text className="text-xl font-semibold text-center dark:text-white text-gray-900">
          {theme === "light"
            ? "Light Theme"
            : theme === "dark"
            ? "Dark Theme"
            : "System Theme"}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {showDropdown && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDropdown}
          onRequestClose={() => setShowDropdown(false)}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={() => setShowDropdown(false)} // Close on background press
          >
            <View className="bg-white dark:bg-gray-800 p-4 rounded-t-lg">
              <TouchableOpacity
                onPress={() => handleThemeChange("light")}
                className={`flex-row items-center p-3 rounded-md  dark:bg-blue-500 bg-gray-100`}
              >
                <Text className="text-2xl mr-2">☀️</Text>
                <Text className={`font-semibold dark:text-white text-gray-900`}>
                  Light
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleThemeChange("dark")}
                className={`flex-row items-center p-3 rounded-md dark:bg-blue-500 bg-gray-100`}
              >
                <Text className="text-2xl mr-2">🌙</Text>
                <Text className={`font-semibold dark:text-white text-gray-900`}>
                  Dark
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleThemeChange("system")}
                className={`flex-row items-center p-3 rounded-md dark:bg-blue-500 bg-gray-100`}
              >
                <Text className="text-2xl mr-2">⚙️</Text>
                <Text className={`font-semibold dark:text-white text-gray-900`}>
                  System
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}
