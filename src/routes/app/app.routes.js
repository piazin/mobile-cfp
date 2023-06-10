import HomeRoutes from './home.routes';
import React, { useContext } from 'react';
import ProfileRoutes from './profile.routes';
import { Ionicons } from '@expo/vector-icons';
import { ButtonNew } from '../../components/ButtonNew';
import { ThemeContext } from '../../contexts/themeContext';
import NewTransactionScreen from '../../screens/NewTransaction';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AppTab = createBottomTabNavigator();

export default function AppRoutes() {
  const { deviceTheme } = useContext(ThemeContext);

  return (
    <AppTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name == 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name == 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7E74F1',
        tabBarInactiveTintColor: '#D4D4D4',
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: deviceTheme == 'dark' ? '#1e1e1e' : '#ffffff',
          borderTopWidth: 0,
        },
      })}
    >
      <AppTab.Screen name="Home" component={HomeRoutes} />
      <AppTab.Screen
        name="NewTransactionScreen"
        component={NewTransactionScreen}
        initialParams={{ typeTransaction: 'expense' }}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ size, color }) => <ButtonNew color={color} size={size} />,
        }}
      />

      <AppTab.Screen name="Profile" component={ProfileRoutes} />
    </AppTab.Navigator>
  );
}
