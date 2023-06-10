import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../../screens/Profile';
import EditDataScreen from '../../screens/EditDataScreen';

const ProfileStack = createNativeStackNavigator();

export default function ProfileRoutes() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="EditDataScreen" component={EditDataScreen} />
    </ProfileStack.Navigator>
  );
}
