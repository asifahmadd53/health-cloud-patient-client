import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/PatientAuth';
import ForgetPassword from '../../screens/ForgetPassword/ForgetPassword';
import OTP from '../../screens/ForgetPassword/OTP';
import NewPassword from '../../screens/ForgetPassword/NewPassword';
import SignUpComplete from '../../screens/Auth/SignUpCompleted';
import OTPVerification from '../../screens/Auth/OTPVerification';
import PatientAuth from '../../screens/Auth/PatientAuth';


const AuthLayout = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="PatientAuth">
    <Stack.Screen name="PatientAuth"  component={PatientAuth} />
    <Stack.Screen name="sign-in"component={SignIn} />
    <Stack.Screen name="forget-password"component={ForgetPassword} />
    <Stack.Screen name="otp"component={OTP} />
    <Stack.Screen name="new-password"component={NewPassword} />
    <Stack.Screen name="OTPVerification"component={OTPVerification} />
  </Stack.Navigator>
  );
};

export default AuthLayout;
