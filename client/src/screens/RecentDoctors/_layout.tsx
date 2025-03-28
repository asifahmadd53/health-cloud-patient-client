import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RecentDr from './RecentDr'

const RecentDrLayout = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen name='RecentDr' component={RecentDr} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default RecentDrLayout

const styles = StyleSheet.create({})