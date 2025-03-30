import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Appointments, RecentDoctors, Specialist} from '../../screens';
import ProfileRoutes from './ProfileRoutes';

const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" component={ProfileRoutes} options={{headerShown:false}} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Specialist" component={Specialist} />
      <Stack.Screen name="RecentDoctors" component={RecentDoctors} />
    </Stack.Navigator>

  );
};

export default HomeRoutes;

