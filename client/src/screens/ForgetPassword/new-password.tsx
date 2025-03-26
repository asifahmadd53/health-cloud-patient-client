import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '../../utils/libs/constants/Icons'
import CustomPasswordInput from '../../components/CustomPasswordInput'
import CustomButton from '../../components/CustomButton'


const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)

  return (
    <SafeAreaView className='px-5 min-h-screen bg-white'>
       <View className="flex-row items-center justify-between mt-6 py-3 lg:px-10">
               <TouchableOpacity
                 activeOpacity={0.9}
                 onPress={() => navigation.goBack()}
                 className="w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-gray-200 rounded-full"
               >
                 <Image className="w-6 h-6 lg:w-9 lg:h-9" source={Icons.leftIcon} />
               </TouchableOpacity>
       
               <Text className="text-xl font-bold tracking-wide text-gray-900 text-center flex-1 lg:text-2xl">
                 Set a new password
               </Text>
             </View>
     
      
      <View className='gap-4 mt-5 lg:w-4/5 lg:mx-auto'>
      <Text className='text-base mt-4 lg:text-xl lg:mb-5'>Create a new password. Ensure it differs from
        previous ones for security</Text>
        <CustomPasswordInput placeholder={'Password'} value={password} onChange={setPassword} />

        <CustomPasswordInput placeholder={'Confirm Password'} value={confirmPassword} onChange={setConfirmPassword} />


        <View className='mt-6'>
          <CustomButton label='Update Password' onPress={() => setShowModal(!showModal)} />
        </View>
        {/* <ReactNativeModal
        onBackdropPress={()=>setShowModal(!showModal) }
          isVisible={showModal}>
          <View className='bg-white items-center rounded-2xl py-10'>
            <Image className='w-40 h-40 lg:w-48 lg:h-48' source={Images.shield} />
            <Text className='text-gray-500 mt-8 lg:text-lg'>Your Password has been reset</Text>
            <View className='mt-5 w-full my-5'>
              <CustomSecondaryButton label='Continue' onPress={()=> setShowModal(!showModal)} />
            </View>
          </View>
        </ReactNativeModal> */}
      </View>
    </SafeAreaView>
  )
}

export default NewPassword

const styles = StyleSheet.create({})