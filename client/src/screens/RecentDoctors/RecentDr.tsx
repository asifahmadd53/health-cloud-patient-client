import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icons from '@/src/utils/libs/constants/Icons'
import DoctorCard from '@/src/components/DoctorCard'


const { height } = Dimensions.get('window')

const RecentDr = () => {
    const navigation = useNavigation()
    const DATA = [23, 2, 35, 23, 52, 35, 2, , 24, 5, 245]
  return (
    <SafeAreaView className='px-3 bg-white flex-1'>
      <View className="flex-row items-center justify-between mt-6 py-3">
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
                className="w-12 h-12 items-center justify-center bg-gray-200 rounded-full"
              >
                <Image className="w-6 h-6" source={Icons.leftIcon} />
              </TouchableOpacity>
              <Text className="text-xl font-bold tracking-wide text-gray-900 text-center flex-1">
                All Recent Doctors
              </Text>
            </View>
     <FlatList
                showsVerticalScrollIndicator={false}
                style={{ height: height * .75 }}
                className='px-2 mt-5 '
                data={DATA}
                renderItem={()=><DoctorCard/>}
            >
            </FlatList>
    </SafeAreaView>
  )
}

export default RecentDr

const styles = StyleSheet.create({})