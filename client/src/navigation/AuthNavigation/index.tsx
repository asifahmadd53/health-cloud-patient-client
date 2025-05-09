import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../../screens/Auth/sign-in';
import SignUp from '../../screens/Auth/sign-up';
import ForgetPassword from '../../screens/ForgetPassword/forget-password';
import OTP from '../../screens/ForgetPassword/otp';
import NewPassword from '../../screens/ForgetPassword/new-password';
import SignUpComplete from '../../screens/Auth/sign-up-completed';
import OTPVerification from '../../screens/Auth/OTPVerification';


const AuthLayout = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="sign-up">
    <Stack.Screen name="sign-up" options={{ headerShown: false }} component={SignUp} />
    <Stack.Screen name="sign-in" options={{ headerShown: false }} component={SignIn} />
    <Stack.Screen name="forget-password" options={{  headerShown: false}} component={ForgetPassword} />
    <Stack.Screen name="otp" options={{ headerShown: false}} component={OTP} />
    <Stack.Screen name="new-password" options={{ headerShown: false}} component={NewPassword} />
    <Stack.Screen name="OTPVerification" options={{  headerShown: false}} component={OTPVerification} />
  </Stack.Navigator>
  );
};

export default AuthLayout;
