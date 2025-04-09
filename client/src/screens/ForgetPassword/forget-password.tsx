import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '../../utils/libs/constants/Icons'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const ForgetPassword = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('')


  return (
    <SafeAreaView className="px-5 bg-white flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between mt-6 py-3 lg:px-10">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          className="w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-gray-200 rounded-full"
        >
          <Image className="w-6 h-6 lg:w-9 lg:h-9" source={Icons.leftIcon} />
        </TouchableOpacity>
        <Text className="text-xl font-bold tracking-wide text-gray-900 text-center flex-1 lg:text-2xl">
          Forget Password
        </Text>
      </View>


      {/* Form Container */}
      <View className="flex-1 lg:w-4/5 lg:mx-auto">
      <Text className="text-base pt-2 text-gray-600  lg:text-lg mt-4 lg:mt-10">
        Please enter your phone # to request a password reset
      </Text>
        <View className="lg:mt-2">
          <Text className="text-base font-semibold my-3 lg:text-xl lg:mb-5">Phone #</Text>
          <CustomInput
            onChange={setPhone}
            placeholder={'Enter your phone #'}
            value={phone}
            icon={Icons.phone}
          />
        </View>

        {/* Reset Button */}
        <View className="mt-8 lg:mt-12">
          <CustomButton label="Reset Password" link="new-password" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword
