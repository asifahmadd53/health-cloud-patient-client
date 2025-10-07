import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AddFamily } from '../../screens'

const FamilyLayout = () => {

    const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='AddFamily' component={AddFamily} />
    </Stack.Navigator>
  )
}

export default FamilyLayout