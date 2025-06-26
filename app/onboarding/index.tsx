import { useAuthStore } from "@/src/auth/stores/auth.store";
import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    emoji: "👋",
    title: "Welcome",
    description: "Discover amazing features that will make your life easier",
  },
  {
    emoji: "⚡",
    title: "Fast & Easy",
    description: "Get things done quickly with our intuitive interface",
  },
  {
    emoji: "🎉",
    title: "Ready to Go",
    description: "Start your journey with us today",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { completeOnboarding } = useAuthStore();

  const handleNext = () => {
    const nextSlide = currentSlide + 1;

    if (nextSlide < slides.length) {
      setCurrentSlide(nextSlide);
      scrollRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  return (
    <View className="flex-1 pt-16 bg-white dark:bg-gray-900">
      {/* Slides */}
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(newIndex);
        }}
        className="mt-10"
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            className="w-screen items-center px-8"
            style={{ width }}
          >
            <Text className="text-8xl mb-6">{slide.emoji}</Text>
            <Text className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              {slide.title}
            </Text>
            <Text className="text-lg text-center text-gray-600 dark:text-gray-400 px-4">
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Progress Indicators */}
      <View className="flex-row justify-center mb-4">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 mx-1 rounded-full ${
              index === currentSlide
                ? "bg-blue-500 w-6"
                : "bg-gray-300 dark:bg-gray-600 w-2"
            }`}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="px-8 mb-10">
        {currentSlide === slides.length - 1 ? (
          <>
            <Link
              asChild
              push
              href="/auth/sign-in"
              className="bg-blue-500 py-4 rounded-full items-center dark:bg-blue-700 mb-4"
            >
              <Text className="text-center text-white font-bold text-lg">Login</Text>
            </Link>

            <Link
              asChild
              push
              href="/auth/sign-up"
              className="border border-blue-500 py-4 rounded-full items-center dark:border-blue-700"
            >
              <Text className="text-center text-blue-500 font-bold text-lg dark:text-blue-400">
                Register
              </Text>
            </Link>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleNext}
              className="bg-blue-500 py-4 rounded-full items-center dark:bg-blue-700"
            >
              <Text className="text-white font-bold text-lg">Next</Text>
            </TouchableOpacity>
            {currentSlide < slides.length - 1 && (
              <TouchableOpacity
                onPress={() => completeOnboarding()}
                className="mt-4 py-4 rounded-full items-center"
              >
                <Text className="text-gray-500 font-medium dark:text-gray-300">
                  Skip
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}
