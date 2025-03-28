import { Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Specialist from './Specialist'

const SpecialistLayout = () => {
    
    const Stack = createNativeStackNavigator()

  return (
    
    <Stack.Navigator>
      <Stack.Screen name='specialist' options={{headerShown:false}} component={Specialist}/>
    </Stack.Navigator>
  )
}

export default SpecialistLayout
