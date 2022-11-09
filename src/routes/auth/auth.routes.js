import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../screens/Login";
import { Splash } from "../../screens/splash";
import { BackHandler } from "react-native";

const AuthStack = createNativeStackNavigator();

export default function AuthRoutes() {
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  }, []);
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
