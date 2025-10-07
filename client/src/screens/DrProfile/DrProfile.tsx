import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../utils/libs/constants/Icons';
import Images from '../../utils/libs/constants/Images';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import DoctorExperienceCard from '../../components/DoctorExperienceCard';



const workingDays = [
  { day: 'Monday', slots: ['10:00 – 5:00'] },
  { day: 'Tuesday', slots: ['10:00 – 5:00'] },
  { day: 'Wednesday', slots: ['10:00 – 5:00'] },
  { day: 'Thursday', slots: ['10:00 – 5:00'] },
  { day: 'Friday', slots: ['10:00 – 5:00'] },
  { day: 'Saturday', slots: ['04:00 – 05:00'] },
  { day: 'Sunday', slots: ['Closed'] },
]




const DrProfile = () => {

  return (
    <SafeAreaView className=" bg-white flex-1 lg:px-10">
      <Header title='Doctor Profile'/>
      <ScrollView
        className="px-5 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}>
       
        <DoctorExperienceCard/>

        <View className="py-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4 lg:text-xl">
            About Me
          </Text>
          <Text className="text-gray-700 text-base leading-relaxed lg:text-lg">
            Dr. Muhammad Ali is a skilled **Surgeon** at **DHQ Hospital** with
            **5+ years of experience**. Specializing in **general and
            laparoscopic surgeries**, he is also an **Associate Professor**
            dedicated to medical innovation and patient care.
          </Text>

          <View className="py-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4 lg:text-xl">Working Slots</Text>
            <View className="border-b border-gray-200 mb-3" />

            {workingDays.map(({ day, slots }) => (
              <View key={day} className="flex-row justify-between items-center py-2">
                <Text className="text-gray-800 font-medium w-24">{day}</Text>
                <View className="flex-1 flex-row flex-wrap gap-x-3 gap-y-1 justify-end">
                  {slots.map((s) => (
                    <Text key={s} className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {s}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
         

        </View>
      </ScrollView>

      <View className="my-2 rounded-lg py-2 flex items-center z-50">
        <CustomButton label="Make Appointment" link='MakeAppointment'/>
      </View>
    </SafeAreaView>
  );
};

export default DrProfile;
