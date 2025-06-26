import { Text, View } from "react-native";

export default function SettingsPage() {
  return (
    <View className="flex-1 dark:bg-gray-900 bg-gray-50">
      {/* Header */}
      <View className="p-6 bg-gray-100 dark:bg-gray-800 rounded-b-3xl">
        <Text className="text-3xl font-bold dark:text-white text-gray-900 text-center">
          Settings
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Text
          className={`text-xl text-center dark:text-gray-200 text-gray-800`}
        >
          This is the settings page.
        </Text>
      </View>
    </View>
  );
}
