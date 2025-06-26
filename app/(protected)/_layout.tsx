import Header from "@/components/Header";
import { Stack } from "expo-router";
import React from "react";

const ProtectedLayout = () => {
  return <Stack screenOptions={{ header: Header }}></Stack>;
};

export default ProtectedLayout;
