import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '../../utils/libs/constants/Icons'

const Family = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView className='px-3 bg-white h-screen'>
       <TouchableOpacity activeOpacity={.90} onPress={() => navigation.goBack()}
                      className='my-6 w-12 h-12 items-center justify-center bg-[#ECECEC] rounded-full'>
                        <Image className='w-8 h-8 object-cover'source={Icons.leftIcon}/>
                      </TouchableOpacity>

        <View className='border w-40 mx-auto h-40 rounded-full'>
        
        </View>
    </SafeAreaView>
  )
}

export default Family

const styles = StyleSheet.create({})