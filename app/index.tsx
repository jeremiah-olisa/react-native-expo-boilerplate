import { View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Button>
        <Text className="bg-primary">Hello</Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
