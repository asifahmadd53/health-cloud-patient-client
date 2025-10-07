import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appointments } from "../../screens";
import MakeAppointment from "../../screens/MakeAppointment";

const AppointmentsRoutes = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
    <Stack.Screen options={{headerShown:false}} name="Appointments" component={Appointments} />
   
    </Stack.Navigator>
  )
}

export default AppointmentsRoutes
