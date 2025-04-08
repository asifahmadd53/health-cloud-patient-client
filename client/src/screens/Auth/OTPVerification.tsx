import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'

const OTPVerification = () => {
  return (
    <SafeAreaView className='px-5 bg-white flex-1 '>
      <Text className='text-2xl text-center mt-20 font-semibold tracking-wider'>Verification</Text>
      <Text className='text-center text-lg text-gray-600 my-5'>Enter the four digit code sent to your phone number +92 43423424</Text>
      <View className="flex-row gap-4 justify-center items-center mt-2">
  {[...Array(4)].map((_, index) => (
    <TextInput
    activeUnderlineColor="#5aa9e6"
    underlineColor=""
      key={index}
      style={{width:50,height:50, fontSize: 20,backgroundColor: '#F5F5F5',borderWidth: 1,
        borderColor: "#5aa9e6",
        borderRadius: 8, color:'black' }}
      
      className=" border-gray-900 rounded-md items-center justify-center"
      keyboardType="numeric"
      maxLength={1}
    />
  ))}
</View>
<Text className='text-base text-primary text-center mt-9'>
    Did't get OTP code?
</Text>
<Text className='text-base text-secondary text-center mt-3'>Resend Code?</Text>
    </SafeAreaView>
  )
}

export default OTPVerification
