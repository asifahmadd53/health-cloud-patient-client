import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { Switch } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Icons from "../../utils/libs/constants/Icons";
import Images from "../../utils/libs/constants/Images";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [name, setName] = useState("");
  const [pmdc, setPmdc] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const navigation = useNavigation()

  return (
    <SafeAreaView className="bg-white min-h-full px-5">
      <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
            <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                className='mt-6 mb-2 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                  <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
                </TouchableOpacity>
           <View className="">
                      <View className="items-center justify-center">
                      <View className="flex-row items-center gap-2">
                      {/* style={{width:width*.13, height:height*.07}} */}
                        <Image className="w-16 h-16"  resizeMode="contain" source={Images.logo}/>
                        <Text className="font-bold text-xl">Health Cloud</Text>
                      </View>
                      </View>
                     <Text className="text-3xl font-bold mt-5">
                      Sign Up
                     </Text>
                     <Text className="text-base text-gray-600 mt-1">Give creadential to sign up your account</Text>
                    </View>
          <View className="pt-5 w-[97%] mx-auto gap-2">
          <Text className="text-base md:text-lg font-semibold tracking-wider">Full name</Text>
            <CustomInput
              placeholder={"Name"}
              value={name}
              icon={Icons.user}
              onChange={setName}
            />
            <Text className="text-base md:text-lg font-semibold tracking-wider">Email</Text>
            <CustomInput
              placeholder={"Email"}
              value={email}
              icon={Icons.email}
              onChange={setEmail}
            />
            <Text className="text-base md:text-lg font-semibold tracking-wider">Phone #</Text>
            <CustomInput
              placeholder={"Phone"}
              value={phone}
              icon={Icons.phone}
              onChange={setPhone}
            />
            <Text className="text-base md:text-lg font-semibold tracking-wider">Password</Text>
            <CustomPasswordInput
              placeholder={"Password"}
              value={password}
              onChange={setPassword}
             
            />
            <Text className="text-base md:text-lg font-semibold tracking-wider">Confirm Password</Text>
            <CustomPasswordInput
              placeholder={"Confirm Password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </View>
          <Pressable
            onPress={onToggleSwitch}
            className="flex-row items-center justify-center text-sm pt-6 "
          >
         <Switch color="#2895cb" value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Text className="ml-2">
              I agree with the Terms of Service & Privacy Policy
            </Text>
          </Pressable>
         <View className="my-5">
         <CustomButton label="Sign Up" link="sign-up-completed"/>
         </View>
         <View className="flex-row items-center my-2 px-3">
            <View className="flex-1 border-b border-gray-300" />
            <Text className="mx-2 text-gray-500">or continue with</Text>
            <View className="flex-1 border-b border-gray-300" />
          </View>
          <View className="w-[70%] mx-auto mt-4 mb-7">
          <Button buttonColor="#FFFFFF" contentStyle={{borderColor:'lightgray', borderWidth:1,height:60,borderRadius:10}}  icon={()=><Image style={{ width: 24, height: 24,marginRight:10 }} resizeMode="contain" source={Icons.google}/>} mode="contained-tonal" style={{borderRadius:0}}>
          Sign in with Google
          </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
