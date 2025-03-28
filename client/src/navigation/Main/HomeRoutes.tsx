import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appointments, DrProfile, RecentDoctors, Specialist, UserProfile } from '../../screens';


const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="DrProfile" component={DrProfile} />
      <Stack.Screen name="RecentDoctors" component={RecentDoctors} />
      <Stack.Screen name="Specialist" component={Specialist} />
    </Stack.Navigator>
  );
};

export default HomeRoutes;

