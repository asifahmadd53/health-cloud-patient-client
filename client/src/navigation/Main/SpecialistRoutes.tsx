import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Specialist } from '../../screens'

const SpecialistRoutes = () => {
    const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name='Specialist' options={{headerShown:false}} component={Specialist}/>
    </Stack.Navigator>
  )
}

export default SpecialistRoutes
