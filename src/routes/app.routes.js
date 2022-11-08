import React from "react";
import { View, Text, BackHandler } from "react-native";
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
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
  });
  return (
    <View>
      <Text>Hello Home2</Text>
    </View>
  );
}

export default function AppRoutes() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Home2" component={Home2} />
    </AppStack.Navigator>
  );
}
