import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProfile } from '../../screens';


const ProfileRoutes = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={UserProfile} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default ProfileRoutes