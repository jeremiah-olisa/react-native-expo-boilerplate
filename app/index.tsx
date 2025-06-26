import { useTheme } from "@/components/ui/ThemeProvider/ThemeProvider";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { theme, setTheme, isDarkMode } = useTheme();

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <View className="p-6 items-center">
        <Text
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Welcome! 👋
        </Text>
        <Text
          className={`text-lg mt-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Choose your preferred theme
        </Text>
      </View>

      {/* Theme Cards */}
      <View className="flex-row justify-center mt-8 px-4">
        <ThemeCard
          emoji="☀️"
          title="Light"
          active={theme === "light"}
          onPress={() => setTheme("light")}
          isDarkMode={isDarkMode}
        />
        <ThemeCard
          emoji="🌙"
          title="Dark"
          active={theme === "dark"}
          onPress={() => setTheme("dark")}
          isDarkMode={isDarkMode}
        />
        <ThemeCard
          emoji="⚙️"
          title="System"
          active={theme === "system"}
          onPress={() => setTheme("system")}
          isDarkMode={isDarkMode}
        />
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Text
          className={`text-xl text-center ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {isDarkMode
            ? "Dark mode is easier on the eyes at night 🌃"
            : "Light mode is great for daytime use ☀️"}
        </Text>
      </View>
    </View>
  );
}

function ThemeCard({
  emoji,
  title,
  active,
  onPress,
  isDarkMode,
}: {
  emoji: string;
  title: string;
  active: boolean;
  onPress: () => void;
  isDarkMode: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mx-2 p-4 rounded-xl items-center ${
        active
          ? isDarkMode
            ? "bg-blue-700"
            : "bg-blue-500"
          : isDarkMode
          ? "bg-gray-800"
          : "bg-gray-200"
      }`}
      activeOpacity={0.7}
    >
      <Text className="text-4xl mb-2">{emoji}</Text>
      <Text
        className={`font-semibold ${
          active ? "text-white" : isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
