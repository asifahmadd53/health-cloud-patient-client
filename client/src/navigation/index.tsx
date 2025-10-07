import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLayout from './AuthNavigation';
import DrawerLayout from './DrawerNavigation';
import TabLayout from './TabNavigation';
import HomeRoutes from './Main/HomeRoutes';
import DrProfileLayout from './DrProfileNavigation/DrProfileRoutes';
import FamilyLayout from './FamilyNavigation';
import TopTabsLayout from './TopTabsNavigation';
import DocumentsLayout from './DocumentsNavigation';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={AuthLayout} />
      <Stack.Screen name="drawer" component={DrawerLayout} />
      <Stack.Screen name="tabs" component={TabLayout} />
      <Stack.Screen name="home" component={HomeRoutes} />
      <Stack.Screen name="DrProfileRoutes" component={DrProfileLayout} />
      <Stack.Screen name='AddFamilyLayout' component={FamilyLayout} />
      <Stack.Screen
        name="AppointmentsRoutes"
        component={TopTabsLayout}
        options={{ headerShown: false, title: 'Appointments' }}
      />
      <Stack.Screen name='DocumentLayout' component={DocumentsLayout}/>
    </Stack.Navigator>
  );
};

export default AppLayout;
