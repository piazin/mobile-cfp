import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import Wallet from '../../screens/Wallet';
import EditTransaction from '../../screens/EditTransaction';

const HomeStack = createNativeStackNavigator();

export default function HomeRoutes() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        animationDuration: 5,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Wallet" component={Wallet} />
      <HomeStack.Screen name="EditTransaction" component={EditTransaction} />
    </HomeStack.Navigator>
  );
}
