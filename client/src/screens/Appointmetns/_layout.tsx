import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointments from "./Appointments";

const AppointmentsLayout = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Appointments" component={Appointments} />
        </Stack.Navigator>
    );
};

export default AppointmentsLayout;
