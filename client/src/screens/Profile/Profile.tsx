import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '../../utils/libs/constants/Icons'
import Images from '../../utils/libs/constants/Images'
import { Screen } from 'react-native-screens'


const Profile = () => {
  const navigation:any = useNavigation()
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
          <Image className="w-7 h-7  bg-secondary rounded-full absolute bottom-1 right-1" source={Icons.tick} />
        </View>

        <View>
          <Text className="text-lg font-bold text-gray-900 ">Muhammad Asif</Text>
          <Text className="text-base text-gray-500 ">colony name Sahiwal</Text>
        </View>
      </View>

      <View className=''>
        <View className="bg-white border border-transparent rounded-xl py-8 px-5 mx-3 shadow-md shadow-gray-400/50">

          <TouchableOpacity  onPress={() => navigation.navigate('home', { screen: 'ProfileRoutes', params: { screen: 'EditProfile' } })} activeOpacity={.90} className="flex-row items-center justify-between  p-4 rounded-lg">
            <View className="flex-row items-center gap-2">
              <Image className="w-6 h-6" source={Icons.edit_text} />
              <Text className="text-lg font-normal text-gray-700">Edit Profile</Text>
            </View>
            <Image className="w-6 h-6" source={Icons.next} />
          </TouchableOpacity>


          <TouchableOpacity onPress={()=> navigation.navigate('home',{screen:'ProfileRoutes', params:{screen:'AddDocuments'}})} activeOpacity={.90} className="flex-row items-center justify-between  p-4 rounded-lg">
            <View className="flex-row items-center gap-2">
              <Image className="w-6 h-6" source={Icons.add_file} />
              <Text className="text-lg font-normal text-gray-700">Add Document</Text>
            </View>
            <Image className="w-6 h-6" source={Icons.next} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={.90} className="flex-row items-center justify-between  p-4 rounded-lg">
            <View className="flex-row items-center gap-2">
              <Image className="w-6 h-6" source={Icons.setings} />
              <Text className="text-lg font-normal text-gray-700">Setting</Text>
            </View>
            <Image className="w-6 h-6" source={Icons.next} />
          </TouchableOpacity>


          <TouchableOpacity activeOpacity={.90} className="flex-row items-center justify-between  p-4 rounded-lg">
            <View className="flex-row items-center gap-2">
              <Image className="w-6 h-6" source={Icons.logout} />
              <Text className="text-lg font-normal text-gray-700">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>



    </SafeAreaView>
  )
}

export default Profile
