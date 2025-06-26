import { useAuthStore } from "@/src/auth/stores/auth.store";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const { isLoggedIn, logOut } = useAuthStore();
  return (
    <View className={`flex-1 dark:bg-gray-900 bg-gray-50`}>
      {/* Header */}
      <View className="p-6 bg-gray-100 dark:bg-gray-800 rounded-b-3xl">
        <Text className="text-3xl font-bold dark:text-white text-gray-900 text-center">
          Welcome! This is the Home Page
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Text
          className={`text-xl text-center dark:text-gray-200 text-gray-800`}
        >
          Welcome to your home page.{" "}
          {isLoggedIn ? "You are logged in!" : "You are not logged in!"}
        </Text>
      </View>

      <View className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
        <Link asChild push href="/(protected)/settings">
          <TouchableOpacity className="px-6 py-3 rounded-full bg-blue-500 dark:bg-blue-700">
            <Text className="text-white text-lg font-semibold">
              Go to Settings
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Logout Button */}
      <View className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <TouchableOpacity
          onPress={logOut}
          className="px-6 py-3 rounded-full bg-red-500j dark:bg-red-700"
        >
          <Text className="text-white text-lg font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
