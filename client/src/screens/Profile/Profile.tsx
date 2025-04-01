import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '../../utils/libs/constants/Icons'
import Images from '../../utils/libs/constants/Images'


const Profile = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView className='px-4'>
     <View className="flex-row items-center justify-between mt-6 py-3">
                   <TouchableOpacity
                     activeOpacity={0.9}
                     onPress={() => navigation.goBack()}
                     className="w-12 h-12 items-center justify-center bg-gray-200 rounded-full"
                   >
                     <Image className="w-6 h-6" source={Icons.leftIcon} />
                   </TouchableOpacity>
                   <Text className="text-xl font-bold tracking-wide text-gray-900 text-center flex-1">
                     Profile
                   </Text>
                 </View>


            <View className="flex-col items-center my-4 gap-3 ">
            <View className="relative p-2 rounded-full border-gray-300">
  {/* Profile Image */}
  <Image className="w-28 h-28 rounded-full bg-primary" resizeMode="contain" source={Images.manAvatar} />

  {/* Tick Icon Positioned on Bottom-Right of Image */}
  <Image className="w-8 h-8 bg-gray-400 rounded-full absolute bottom-1 right-1" source={Icons.tick} />
</View>

                   <View>
                   <Text className="text-lg font-bold text-gray-900 ">Muhammad Asif</Text>
                   <Text className="text-base text-gray-500 ">colony name Sahiwal</Text>
                   </View>
                 </View>

                <View className='border'>
                <View className='border'>
                    <View className=' flex-row justify-between p-3'>
                      <Text className='text-2xl'>Edit Profile</Text>
                      <Image className='w-8 h-8' source={Icons.right}/>
                    </View>
                    
                    <View>
                      <Text>Change Password</Text>
                    </View>
                    <View>
                      <Text>Settings</Text>
                    </View>
                    <View>
                      <Text>Logout</Text>
                    </View>
                </View>
                </View>



    </SafeAreaView>
  )
}

export default Profile
