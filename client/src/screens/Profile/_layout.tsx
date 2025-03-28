import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
const ProfileLayout = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default ProfileLayout