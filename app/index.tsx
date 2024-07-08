import { View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "nativewind";

const HomeScreen = () => {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Button onPress={toggleColorScheme}>
        <Text>Hello</Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
