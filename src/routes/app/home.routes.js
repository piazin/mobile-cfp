import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import Wallet from '../../screens/Wallet';

const HomeStack = createNativeStackNavigator();

export default function HomeRoutes() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Wallet" component={Wallet} />
    </HomeStack.Navigator>
  );
}
