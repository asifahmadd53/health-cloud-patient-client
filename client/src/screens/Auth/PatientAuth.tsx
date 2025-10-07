import {
  Image,
  KeyboardAvoidingView,
  Platform,
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
import { Input } from "@rneui/themed";
import PhoneInput from '@linhnguyen96114/react-native-phone-input';

const PatientAuth = () => {

  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          className="px-5 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="">
            <View className="items-left justify-center">
              <View className="flex-row items-center gap-2 mt-12">

                <Image className="w-16 h-16" resizeMode="contain" source={Images.logo} />
                {/* <Text className="font-bold text-xl">Health Cloud</Text> */}
              </View>
            </View>
            <Text className="text-2xl font-bold mt-6">
              Registration
            </Text>
            <Text className="text-sm text-gray-500 mt-3">
              A four-digit code will be sent to your phone. Ensure it's active for verification.
            </Text>
          </View>
          <View className="pt-5 w-[99%] mx-auto gap-2">
            <Text className="text-base md:text-lg font-semibold tracking-wider">Phone #</Text>

            <View
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor: focused ? "#2895cb" : "#ccc",
              }}
            >
              <PhoneInput
                containerStyle={{
                  width: "100%",
                  borderRadius: 8,
                  backgroundColor: "transparent",
                }}
                flagButtonStyle={{
                  width: 60,
                  justifyContent: "center",
                  marginRight: -2,
                }}
                codeTextStyle={{
                  marginLeft: -8,
                  marginRight: 6,
                  paddingRight: 0,
                }}
                textContainerStyle={{
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  backgroundColor: "transparent",
                }}
                disableArrowIcon
                defaultValue={phone}
                defaultCode="PK"
                onChangeFormattedText={setPhone}
                withShadow={false}
                autoFocus={true}
                textInputProps={{
                  onFocus: () => setFocused(true),
                  onBlur: () => setFocused(false),
                }}
              />
            </View>
            <Pressable
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 60,
              }}
              onPress={() => { }}
            />
          </View>

          <View className="my-8">
            <CustomButton label="Send Code" link="OTPVerification" />
          </View>
          <View className="items-center mt-4 px-4">
            <Text className="text-xs text-gray-500 text-center">
              ⚕️ Your phone number will only be used for{" "}
              <Text className="font-semibold">secure verification</Text> and{" "}
              <Text className="font-semibold">appointment updates</Text>.
            </Text>

            <Text className="text-xs text-gray-500 text-center mt-3">
              By continuing, you agree to our{" "}
              <Text
                className="text-secondary font-semibold"
                // onPress={() => navigation.navigate("TermsAndConditions")}
              >
                Terms & Conditions
              </Text>
            </Text>

            <Text className="text-xs text-gray-500 text-center mt-3">
              Need help?{" "}
              <Text className="text-secondary font-semibold">
                Contact Support
              </Text>
            </Text>
          </View>

      </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PatientAuth;

