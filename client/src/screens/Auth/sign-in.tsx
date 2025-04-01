import { Link } from "expo-router";
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
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white px-5 min-h-screen ">
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
            <CustomInput placeholder={'Enter your Phone #'} icon={Icons.tick} value={pmdc} onChange={setpmcd} />
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

            {/* <View className="flex-row items-center my-4 px-3">
              <View className="flex-1 border-b border-gray-300" />
              <Text className="mx-2 text-gray-500 lg:text-xl">or continue with</Text>
              <View className="flex-1 border-b border-gray-300" />
            </View> */}
            {/* <View className="w-[70%] mx-auto mt-6">
              <Button buttonColor="#FFFFFF" contentStyle={{ borderColor: 'lightgray', borderWidth: 1, height: 60, borderRadius: 10 }} icon={() => <Image style={{ width: 24, height: 24, marginRight: 10 }} resizeMode="contain" source={Icons.google} />} mode="contained-tonal" style={{ borderRadius: 0 }}>
                Sign in with Google
              </Button>
            </View> */}
            <Text onPress={() => navigation.navigate('sign-up')} className="text-[#253237] text-base font-medium text-center lg:text-xl">
              Don’t have an account?<Text className="text-secondary"> Join us</Text>
            </Text>



          </View>







        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
