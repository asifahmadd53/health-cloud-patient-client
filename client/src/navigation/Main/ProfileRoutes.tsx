import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddDocuments, EditProfile, UserProfile } from '../../screens';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddDocuments" component={AddDocuments} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
