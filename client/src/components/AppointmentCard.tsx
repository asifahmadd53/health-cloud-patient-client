import { Image,  Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../utils/libs/constants/Images'
import Icons from '../utils/libs/constants/Icons'

const AppointmentCard = () => {
  return (
    <SafeAreaView>
      <View className="border flex-row px-4 py-2 md:py-3 gap-3
                      bg-white mb-3 items-center border-slate-200 shadow-md rounded-2xl p-5 shadow-slate-200">
        <Image className="w-16 h-16 md:w-20 md:h-20 rounded-lg" source={Images.d3} />
        <View className="gap-2 flex-1">
          <View className='gap-1'>
            <Text className="text-lg font-semibold text-gray-900">Dr. Arfa</Text>
            <Text className="text-gray-500 text-sm md:text-base">MBBS, Dermatologist Specialist</Text>
            <View className="flex-row gap-2 items-center">
              <Image className="w-4 h-4" source={Icons.clock} />
              <Text className="text-sm text-gray-600">8:00-9:00 AM, 14 March 2025</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AppointmentCard
