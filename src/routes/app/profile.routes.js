import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StatusBar } from "react-native";

const ProfileStack = createNativeStackNavigator();

function ProfileScreen() {
  return (
    <View>
      <Text>Hello</Text>
      <StatusBar
        backgroundColor="#fff"
        barStyle={"light-content"}
        translucent
      />
    </View>
  );
}

export default function ProfileRoutes() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}
