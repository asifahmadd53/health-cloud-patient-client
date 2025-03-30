import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrProfile } from "../../screens"; 

const Stack = createNativeStackNavigator();

const DrProfileRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrProfile" component={DrProfile} />
    </Stack.Navigator>
  );
};

export default DrProfileRoutes;
