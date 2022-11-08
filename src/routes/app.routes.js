import React from "react";
import { View, Text } from "react-native";
import { Splash } from "../screens/splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

function Home() {
  return (
    <View>
      <Text>Hello Home</Text>
    </View>
  );
}

function Home2() {
  return (
    <View>
      <Text>Hello Home2</Text>
    </View>
  );
}

export default function AppRoutes() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Splash" component={Splash} />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Home2" component={Home2} />
    </AppStack.Navigator>
  );
}
