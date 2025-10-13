import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileRoutes from './ProfileRoutes';
import AppointmentsRoutes from './AppointmentsRoutes';
import SpecialistRoutes from './SpecialistRoutes';
import FAQScreen from '../../screens/FAQ';

const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentsRoutes" component={AppointmentsRoutes} />
      <Stack.Screen name="SpecialistRoutes" component={SpecialistRoutes} />
      <Stack.Screen name="ProfileRoutes" component={ProfileRoutes} />
      <Stack.Screen name='FaqRoute' component={FAQScreen}/>
    </Stack.Navigator>
  );
};

export default HomeRoutes;
