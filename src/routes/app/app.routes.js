import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeRoutes from "./home.routes";

const AppTab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppTab.Screen name="Home" component={HomeRoutes} />
    </AppTab.Navigator>
  );
}
