import {

  Text,

  View,
  KeyboardAvoidingView,

  Image,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Icons from "../../utils/libs/constants/Icons";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Images from "../../utils/libs/constants/Images";



const SignIn = () => {

  const [pmdc, setpmcd] = useState('')
  const [password, setPassword] = useState(false)
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white px-4 min-h-screen ">
      <View className="flex-grow pb-5 ">
        <KeyboardAvoidingView>
          <View className="pt-20 ">
            <View className="items-center justify-center ">
              <View className="flex-row items-center gap-2 ">
                {/* style={{width:width*.13, height:height*.07}} */}
                <Image className="w-16 h-16 lg:w-24 lg:h-24" resizeMode="contain" source={Images.logo} />
                <Text className="font-bold text-xl lg:text-4xl">Health Cloud</Text>
              </View>
            </View>
          </View>

          <View className="w-[97%] mx-auto gap-3  lg:px-32 lg:mt-16">
            <Text className="text-3xl font-bold mt-8 lg:text-4xl">
              Sign in
            </Text>
            <Text className="text-base text-gray-600 mt-1 lg:text-2xl">Give creadential to sign in your account</Text>
            <Text className="text-base md:text-lg font-semibold tracking-wider lg:text-2xl">Phone #</Text>
            <CustomInput icon="phone" placeholder={'Enter your Phone #'} value={pmdc} onChangeText={setpmcd} />
            
            <Text className="text-base md:text-lg font-semibold tracking-wider lg:text-2xl">OTP Code</Text>
            <CustomPasswordInput placeholder={'Enter OTP '} value={password} onChange={setPassword} />
            <View className="items-end">

              <Text onPress={() => navigation.navigate('forget-password')} className="text-secondary text-base font-medium lg:text-xl">
                Forgot Password?
              </Text>

            </View>
            <View className="mt-8">
              <CustomButton label={'Login'} link={'drawer'} />
            </View>
            <View className="mx-auto mt-2 items-center gap-5">
            </View>

            <Text onPress={() => navigation.navigate('sign-up')} className="text-[#253237] text-base font-medium text-center lg:text-xl">
              Don’t have an account?<Text className="text-secondary">Join us</Text>
            </Text>



          </View>







        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
