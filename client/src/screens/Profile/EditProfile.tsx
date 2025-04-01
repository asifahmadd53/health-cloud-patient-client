import {Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useState } from 'react'
import Icons from '../../utils/libs/constants/Icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomSimpleInput from '../../components/CustomSimpleInput'
import CustomButton from '../../components/CustomButton'
import Images from '../../utils/libs/constants/Images'

const EditProfile = () => {
    const navigation = useNavigation()
    const [fullName, setFullName] = useState('Muhammad Asif');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newAddress,setNewAddress] = useState('')
  return (
      <SafeAreaView className='px-5 bg-white flex-1 lg:px-10'>
                  {/* Header */}
                  <View className="flex-row items-center justify-between mt-6 relative">
                      <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => navigation.goBack()}
                          className="w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow-sm"
                      >
                          <Image className="w-6 h-6" source={Icons.leftIcon} />
                      </TouchableOpacity>
      
                      {/* Centered Title */}
                      <View className="absolute left-0 right-0 items-center">
                          <Text className="text-xl font-semibold text-gray-800 tracking-wide">
                              Edit Profile
                          </Text>
                      </View>
                  </View>

                <View className='pt-10 pb-8'>
                    <View className="flex-col items-center my-4 gap-3 ">
                           <View className="relative p-2 rounded-full border-gray-300">
                             {/* Profile Image */}
                             <Image className="w-28 h-28 rounded-full bg-primary" resizeMode="contain" source={Images.manAvatar} />
                   
                             {/* Tick Icon Positioned on Bottom-Right of Image */}
                             <Image className="w-7 h-7  bg-secondary rounded-full absolute bottom-1 right-1" source={Icons.edit_text} />
                           </View>
                         </View>

                         <CustomSimpleInput label={'Full Name'} placeholder={'Enter your full name'} value={fullName} onChange={setFullName} />
                <CustomSimpleInput label={'Current Password'} placeholder={'Enter current password'}  value={currentPassword} onChange={setCurrentPassword} />
                <CustomSimpleInput label={'New Password'} placeholder={'Enter new password'}  value={newPassword} onChange={setNewPassword} />
                <CustomSimpleInput label={'Address'} placeholder={'Enter new Address'}  value={newAddress} onChange={setNewAddress} />
                </View>
                <CustomButton label='Update Profile'/>

      </SafeAreaView>
  )
}

export default EditProfile
