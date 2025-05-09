import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayout from './AuthNavigation';
import DrawerLayout from './DrawerNavigation';
import TabLayout from './TabNavigation';
import HomeRoutes from './Main/HomeRoutes';
import DrProfileRoutes from './DrProfileNavigation/DrProfileRoutes';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={AuthLayout} />
      <Stack.Screen name="drawer" component={DrawerLayout} />
      <Stack.Screen name="tabs" component={TabLayout} />
      <Stack.Screen name="home" component={HomeRoutes} />
      <Stack.Screen name="DrProfileRoutes" component={DrProfileRoutes} />
    </Stack.Navigator>
  );
};

export default AppLayout;
