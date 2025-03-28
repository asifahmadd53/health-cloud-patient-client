import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayout from './AuthNavigation';
import DrawerLayout from './DrawerNavigation';
import TabLayout from './TabNavigation';
import HomeRoutes from './Main/HomeRoutes';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth">
        {() => <AuthLayout />}
      </Stack.Screen>
      <Stack.Screen name="drawer">
        {() => <DrawerLayout />}
      </Stack.Screen>
      <Stack.Screen name="tabs">
        {() => <TabLayout />}
      </Stack.Screen>
      
    </Stack.Navigator>
  );
};

export default AppLayout;
