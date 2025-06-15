import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </React.Fragment>
  );
}