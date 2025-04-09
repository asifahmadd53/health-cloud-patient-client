import { Image, Text, TouchableOpacity, View, ScrollView, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment';
import { LocaleConfig, Calendar } from 'react-native-calendars';

import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../../utils/libs/constants/Icons';
import Images from '../../utils/libs/constants/Images';
import CustomButton from '../../components/CustomButton';



const experienceData = [
  { id: 1, icon: Icons.promotion, years: 5, label: "Years of work" },
  { id: 2, icon: Icons.consultation, years: 7, label: "Number of patients" },
  { id: 3, icon: Icons.promotion, years: 3.3, label: "Something else" }
];

// Generate 20 future dates
const generateDates = () => {
  const dates = [];
  for (let i = 0; i < 20; i++) {
    let date = moment().add(i, 'days').format('YYYY-MM-DD');
    dates.push(date);
  }
  return dates;
};

const timeSlots = {
  morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  evening: ["06:00 PM", "07:00 PM", "08:00 PM"],
};

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';
const DrProfile = () => {
  const navigation = useNavigation()
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [openCalendar, setOpenCalendar] = useState(false);
  const datesList = generateDates();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const {height, width} = Dimensions.get('window')



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
            Doctor Details
          </Text>
        </View>
      </View>

      {/* Profile Info */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: height * .11 }} showsVerticalScrollIndicator={false}>

        <View className='flex-row items-center gap-4 mt-6 p-4 rounded-2xl shadow-sm bg-white '>
          <Image className='w-28 lg:w-36 lg:h-36 h-28 rounded-lg' source={Images.d2} />
          <View className="flex-1">
            <Text className='font-bold text-xl text-gray-900 md:text-2xl'>Muhammad Ali</Text>
            <Text className='text-base text-gray-600 lg:text-lg'>
              <Text className='text-black font-medium'>Surgeon</Text> at DHQ Hospital
            </Text>
            <Text className='text-base text-gray-700 mt-1 lg:text-lg'>Associate Professor</Text>
            <Text className='text-sm text-gray-600 mt-1 lg:text-lg'>MBBS, FCPS</Text>
          </View>
        </View>

        {/* Experience Section */}
        <View className='flex-row justify-between lg:justify-around lg:mt-6 p-5'>
          {experienceData.map((item) => (
            <View key={item.id} className='items-center'>
              <View className='flex-row items-center gap-2'>
                <Image className='w-10 lg:w-14 lg:h-14 h-10' source={item.icon} />
                <Text className='font-bold text-xl text-gray-900'>{item.years}</Text>
              </View>
              <Text className='text-gray-500 text-sm text-center mt-1'>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* About Me Section */}
        <View className="py-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4 lg:text-xl">About Me</Text>
          <Text className="text-gray-700 text-base leading-relaxed lg:text-lg">
            Dr. Muhammad Ali is a skilled **Surgeon** at **DHQ Hospital** with **5+ years of experience**.
            Specializing in **general and laparoscopic surgeries**, he is also an **Associate Professor**
            dedicated to medical innovation and patient care.
          </Text>
        </View>

        {/* Consultation Schedule */}
        <View className='flex-row justify-between items-center '>
          <Text className='text-lg font-semibold text-gray-900 mb-4 lg:text-xl'>Consultation Schedule</Text>
          <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
            <Image className='w-8 lg:w-11 lg:h-11 h-8' source={Icons.calendar} />
          </TouchableOpacity>
        </View>

        {/* Horizontal ScrollView for Dates */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 flex-none">
          {datesList.map((date, index) => (
            <TouchableOpacity
              activeOpacity={.90}
              key={index}
              onPress={() => setSelectedDate(date)}
              className={`px-[.75rem] lg:px-5 self-start py-6 lg:py-8 flex-col-reverse rounded-full mx-2 gap-2 ${selectedDate === date ? 'bg-black' : 'bg-[#F5F7FB]'}`}
            >
              <Text className={`text-center lg:text-lg ${selectedDate === date ? 'text-white font-extrabold' : 'text-gray-900 font-extrabold'}`}>
                {moment(date).format('DD')}
              </Text>
              <Text className={`text-center lg:text-lg ${selectedDate === date ? 'text-white ' : 'text-gray-400'}`}>{moment(date).format('MMM')}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">Morning Slot</Text>
        <ScrollView horizontal className="flex-none">
          {timeSlots.morning.map((time, index) => (
            <TouchableOpacity
              activeOpacity={.90}
              key={index}
              onPress={() => setSelectedTime(time)}
              className={`px-5 py-3 lg:px-6 lg:py-4  rounded-full  mr-3 
            ${selectedTime === time ? 'bg-black' : 'bg-[#F5F7FB]'}`}
            >
              <Text className={`${selectedTime === time ? 'text-white lg:text-lg' : 'text-black lg:text-lg'}`}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Evening Slot */}
        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">Evening Slot</Text>
        <ScrollView horizontal className="flex-none ">

          {timeSlots.evening.map((time, index) => (
            <TouchableOpacity
              activeOpacity={.90}
              key={index}
              onPress={() => setSelectedTime(time)}
              className={`px-5 py-3 lg:px-6 lg:py-4  rounded-full  mr-2 
            ${selectedTime === time ? 'bg-black' : 'bg-[#F5F7FB]'}`}
            >
              <Text className={`${selectedTime === time ? 'text-white' : 'text-black'}`}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Selected Time Display */}
        {selectedTime && (
          <Text className="text-lg font-semibold text-green-700 mt-4">
            Selected Time: {selectedTime}
          </Text>
        )}
      </ScrollView>

      <View className=''>
      <View className="w-full absolute bottom-0 my-2 rounded-lg py-3 flex items-center z-50">
  <CustomButton label="Make Appointment" />
</View>
      </View>
      {openCalendar && (
        <View className="rounded-lg p-4 shadow-lg absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center bg-black/30">

          {openCalendar && (
            <View className='absolute inset-0 bg-black/30 justify-center items-center'>
              <View className='bg-white p-5 rounded-lg shadow-lg'>
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                    setOpenCalendar(false);
                  }}
                  markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#2895cb' }
                  }}
                  theme={{
                    selectedDayBackgroundColor: '#2895cb',
                    todayTextColor: '#FF5733',
                    arrowColor: '#4A90E2',
                  }}
                />
                <TouchableOpacity onPress={() => setOpenCalendar(false)} className='mt-3 bg-black px-4 py-2 rounded-lg'>
                  <Text className='text-white text-center'>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}








    </SafeAreaView>
  )
}

export default DrProfile

