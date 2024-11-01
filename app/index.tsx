import { View } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { Button, ButtonText } from "@gluestack-ui/themed";

const HomeScreen = () => {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Button onPress={toggleColorScheme}>
        <ButtonText>Hello</ButtonText>
      </Button>
    </View>
  );
};

export default HomeScreen;
