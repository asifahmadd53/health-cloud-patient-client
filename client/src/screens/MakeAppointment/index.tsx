import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import moment from 'moment';
import Calendar from 'react-native-calendars/src/calendar';
import Header from '../../components/Header';
import Icons from '../../utils/libs/constants/Icons';
import CustomButton from '../../components/CustomButton';
import DoctorExperienceCard from '../../components/DoctorExperienceCard';

const datesList = [     
    moment().add(0, 'day').format('YYYY-MM-DD'),
    moment().add(1, 'day').format('YYYY-MM-DD'),
    moment().add(2, 'day').format('YYYY-MM-DD'),
];

const timeSlots = {
    morning: ['09:00 AM', '10:00 AM', '11:00 AM', '11:00 AM', '11:00 AM', '11:00 AM', '11:00 AM', '11:00 AM'],
    evening: ['09:00 AM', '10:00 AM', '11:00 AM', '11:00 AM', '11:00 AM', '11:00 AM', '11:00 AM', '11:00 AM'],
};

const MakeAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(datesList[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [openCalendar, setOpenCalendar] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title="Make Appointment" />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    className="px-5 pt-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    <DoctorExperienceCard/>

                    <View>
                        <View className="flex-row justify-between items-center mt-4">
                            <Text className="text-lg font-semibold text-gray-900 lg:text-xl">
                                Consultation Schedule
                            </Text>
                            <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
                                <Image className="w-8 lg:w-11 lg:h-11 h-8" source={Icons.calendar} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 flex-none">
                            {datesList.map((date, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={index}
                                    onPress={() => setSelectedDate(date)}
                                    className={`px-[.75rem] lg:px-5 self-start py-6 lg:py-8 flex-col-reverse rounded-full mx-2 gap-2 ${selectedDate === date ? 'bg-black' : 'bg-[#F5F7FB]'
                                        }`}
                                >
                                    <Text
                                        className={`text-center lg:text-lg ${selectedDate === date ? 'text-white font-extrabold' : 'text-gray-900 font-extrabold'
                                            }`}
                                    >
                                        {moment(date).format('DD')}
                                    </Text>
                                    <Text
                                        className={`text-center lg:text-lg ${selectedDate === date ? 'text-white ' : 'text-gray-400'}`}
                                    >
                                        {moment(date).format('MMM')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">Morning Slot</Text>
                        <ScrollView horizontal className="flex-none">
                            {timeSlots.morning.map((time, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={index}
                                    onPress={() => setSelectedTime(time)}
                                    className={`px-5 py-3 lg:px-6 lg:py-4  rounded-full  mr-3 ${selectedTime === time ? 'bg-black' : 'bg-[#F5F7FB]'
                                        }`}
                                >
                                    <Text className={`${selectedTime === time ? 'text-white lg:text-lg' : 'text-black lg:text-lg'}`}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">Evening Slot</Text>
                        <ScrollView horizontal className="flex-none ">
                            {timeSlots.evening.map((time, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={index}
                                    onPress={() => setSelectedTime(time)}
                                    className={`px-5 py-3 lg:px-6 lg:py-4  rounded-full  mr-2 ${selectedTime === time ? 'bg-black' : 'bg-[#F5F7FB]'
                                        }`}
                                >
                                    <Text className={`${selectedTime === time ? 'text-white' : 'text-black'}`}>{time}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {selectedTime && (
                            <Text className="text-lg font-semibold text-green-700 mt-4">Selected Time: {selectedTime}</Text>
                        )}
                    </View>
                </ScrollView>

                <View className="w-full absolute bottom-0 my-2 rounded-lg py-3 flex items-center z-50">
                    <CustomButton label="Make Appointment" />
                </View>

                {openCalendar && (
                    <View className="rounded-lg p-4 shadow-lg absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center bg-black/30">
                        <View className="absolute inset-0 bg-black/30 justify-center items-center">
                            <View className="bg-white p-5 rounded-lg shadow-lg">
                                <Calendar
                                    onDayPress={(day) => {
                                        setSelectedDate(day.dateString);
                                        setOpenCalendar(false);
                                    }}
                                    markedDates={{
                                        [selectedDate]: { selected: true, selectedColor: '#2895cb' },
                                    }}
                                    theme={{
                                        selectedDayBackgroundColor: '#2895cb',
                                        todayTextColor: '#FF5733',
                                        arrowColor: '#4A90E2',
                                    }}
                                />
                                <TouchableOpacity onPress={() => setOpenCalendar(false)} className="mt-3 bg-black px-4 py-2 rounded-lg">
                                    <Text className="text-white text-center">Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MakeAppointment;