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
            
           <View className="">
                      <View className="items-center justify-center">
                      <View className="flex-row items-center gap-2 mt-12">
                     
                        <Image className="w-16 h-16"  resizeMode="contain" source={Images.logo}/>
                        <Text className="font-bold text-xl">Health Cloud</Text>
                      </View>
                      </View>
                     <Text className="text-3xl font-bold mt-12">
                     Registration
                     </Text>
                     <Text className="text-lg text-gray-500 mt-3">A four digit code will be sent to your phone number</Text>
                    </View>
          <View className="pt-5 w-[97%] mx-auto gap-2">
           
         
            <Text className="text-base md:text-lg font-semibold tracking-wider">Phone #</Text>
            <CustomInput
              placeholder={"Phone"}
              value={phone}
              icon={Icons.phone}
              onChange={setPhone}
            />
           
           
            
          </View>
          {/* <Pressable
            onPress={onToggleSwitch}
            className="flex-row items-center justify-center text-sm pt-6 "
          >
         <Switch color="#2895cb" value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Text className="ml-2">
              I agree with the Terms of Service & Privacy Policy
            </Text>
          </Pressable> */}
         <View className="my-8">
         <CustomButton label="Send Code" link="OTPVerification"/>
         </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
