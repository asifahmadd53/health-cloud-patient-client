import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Specialists from '../../screens/Specialist/Specialist'

const SpecialistRoutes = () => {
    const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name='Specialist' options={{headerShown:false}} component={Specialists}/>
      
    </Stack.Navigator>
  )
}

export default SpecialistRoutes
