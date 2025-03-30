import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileRoutes from './ProfileRoutes';
import AppointmentsRoutes from './AppointmentsRoutes';
import SpecialistRoutes from './SpecialistRoutes';

const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentsRoutes" component={AppointmentsRoutes} />
      <Stack.Screen name="SpecialistRoutes" component={SpecialistRoutes} />
      <Stack.Screen name="ProfileRoutes" component={ProfileRoutes} />
    </Stack.Navigator>
  );
};

export default HomeRoutes;
