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


            <View className="flex-row my-4 gap-3">
                   <View className=" p-2 rounded-full border-2 border-gray-300">
                     <Image className="w-28 h-28 rounded-full bg-primary" resizeMode="contain" source={Images.manAvatar} />
                   </View>
                   <View>
                   <Text className="text-lg font-semibold text-gray-900 mt-5">Muhammad Asif</Text>
                   <Text className="text-base text-gray-500 ">colony name Sahiwal</Text>
                   </View>
                 </View>

                <View className='border'>
                <View>
                    <Text>10</Text>
                </View>
                </View>



    </SafeAreaView>
  )
}

export default Profile
