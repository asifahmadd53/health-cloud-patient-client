import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrProfile from "./DrProfile";


const DrProfileLayout = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="DrProfile" component={DrProfile} />
        </Stack.Navigator>
    );
};

export default DrProfileLayout;
