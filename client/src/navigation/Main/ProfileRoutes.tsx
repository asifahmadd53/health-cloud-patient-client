import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProfile } from '../../screens';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
