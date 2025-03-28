import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddFamily from './AddFamily'

const AddFamilyLayout = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
        <Stack.Screen name='AddFamily' options={{headerShown:false}} component={AddFamily}/>
    </Stack.Navigator>
  )
}

export default AddFamilyLayout