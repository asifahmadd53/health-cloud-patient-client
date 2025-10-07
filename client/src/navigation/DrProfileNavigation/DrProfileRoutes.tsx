import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrProfile } from "../../screens"; 
import MakeAppointment from "../../screens/MakeAppointment";

const Stack = createNativeStackNavigator();

const DrProfileLayout = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrProfile" component={DrProfile} />
      <Stack.Screen options={{ headerShown: false }} name="MakeAppointment" component={MakeAppointment} />
    </Stack.Navigator>
  );
};

export default DrProfileLayout;
