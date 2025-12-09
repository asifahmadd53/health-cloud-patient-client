import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Calendar from 'react-native-calendars/src/calendar';
import Header from '../../components/Header';
import Icons from '../../utils/constants/Icons';
import CustomButton from '../../components/CustomButton';
import DoctorExperienceCard from '../../components/DoctorExperienceCard';
import { useRoute } from '@react-navigation/native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

// Generate slots for a given period
const generateSlots = (start, end, patientPerHour = 1, breakStart?, breakEnd?) => {
    const slots: string[] = [];
    const startMoment = moment(start, "HH:mm");
    const endMoment = moment(end, "HH:mm");
    const interval = 60 / patientPerHour;

    let current = startMoment.clone();

    while (current.isBefore(endMoment)) {
        // Skip if during break
        if (breakStart && breakEnd) {
            const breakStartMoment = moment(breakStart, "HH:mm");
            const breakEndMoment = moment(breakEnd, "HH:mm");
            if (current.isSameOrAfter(breakStartMoment) && current.isBefore(breakEndMoment)) {
                current = breakEndMoment.clone();
                continue;
            }
        }
        slots.push(current.format("hh:mm A"));
        current.add(interval, "minutes");
    }

    return slots;
};

const getNextNDates = (n = 7) =>
    Array.from({ length: n }).map((_, i) =>
        moment().add(i, "day").format("YYYY-MM-DD")
    );

const MakeAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(getNextNDates(7)[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [slots, setSlots] = useState<string[]>([]);
    const [slotsLoading, setSlotsLoading] = useState(true);
    const route = useRoute();
    const doctor = route.params?.doctor;
    const appointmentSheetRef = useRef<BottomSheet>(null);
    

    const scheduleSource = doctor?.schedule?.weeklySchedule || [];

    const dayName = moment(selectedDate).format("dddd");
    const todaySchedule = scheduleSource.find((d: any) => d.day === dayName);

    useEffect(() => {
        const computeSlots = async () => {
            setSlotsLoading(true);

            // Delay one frame → ensures loader shows
            await new Promise(resolve => setTimeout(resolve, 10));

            let newSlots: string[] = [];
            if (todaySchedule?.isWorking) {
                const generated = generateSlots(
                    todaySchedule.startTime,
                    todaySchedule.endTime,
                    todaySchedule.patientPerHour,
                    todaySchedule.hasBreak ? todaySchedule.breakStart : undefined,
                    todaySchedule.hasBreak ? todaySchedule.breakEnd : undefined
                );

                if (moment(selectedDate).isSame(moment(), "day")) {
                    newSlots = generated.filter(t =>
                        moment(`${selectedDate} ${t}`, "YYYY-MM-DD hh:mm A").isAfter(moment())
                    );
                } else {
                    newSlots = generated;
                }
            }

            setSlots(newSlots);
            setSlotsLoading(false);
        };

        computeSlots();
    }, [selectedDate, todaySchedule]);


    const morningSlots = slots.filter((t) => moment(t, "hh:mm A").hour() < 12);
    const eveningSlots = slots.filter((t) => moment(t, "hh:mm A").hour() >= 12);

    const onSelectDate = (dateStr) => {
        setSelectedDate(dateStr);
        setSelectedTime(null);
    };

    const datesList = getNextNDates(7);

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
                    contentContainerStyle={{ paddingBottom: 140 }}
                >
                    <DoctorExperienceCard doctor={doctor} />

                    <View>
                        <View className="flex-row justify-between items-center mt-4">
                            <Text className="text-lg font-semibold text-gray-900 lg:text-xl">
                                Consultation Schedule
                            </Text>
                            <TouchableOpacity onPress={() => setOpenCalendar(!openCalendar)}>
                                <Image className="w-8 lg:w-11 lg:h-11 h-8" source={Icons.calendar} />
                            </TouchableOpacity>
                        </View>

                        {/* Dates horizontal list */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 flex-none">
                            {datesList.map((date, index) => {
                                const isSelected = selectedDate === date;
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={date + index}
                                        onPress={() => onSelectDate(date)}
                                        className={`w-14 self-start py-6 lg:py-8 flex-col-reverse rounded-full mx-2 gap-2 ${isSelected ? 'bg-primary' : 'bg-[#F5F7FB]'
                                            }`}
                                    >
                                        <Text className={`text-center lg:text-lg ${isSelected ? 'text-white font-extrabold' : 'text-gray-900 font-extrabold'}`}>
                                            {moment(date).format('DD')}
                                        </Text>
                                        <Text className={`text-center lg:text-lg ${isSelected ? 'text-white ' : 'text-gray-400'}`}>
                                            {moment(date).format('ddd')}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>

                        {/* If doctor is off that day */}
                        {!todaySchedule?.isWorking ? (
                            <Text className="text-sm text-red-600 mt-4">
                                Doctor is not available on {dayName}.
                            </Text>
                        ) : slotsLoading ? (
                                <View className="flex-1 justify-center items-center py-14">
                                    <ActivityIndicator size="large" color="#2C415C" />
                                </View>
                        ) : (
                            <>
                                {morningSlots.length > 0 && (
                                    <>
                                        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">
                                            Morning Slot
                                        </Text>
                                                <View className="flex-row flex-wrap mb-2 px-4 justify-between">
                                            {morningSlots.map(time => (
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    key={time}
                                                    onPress={() => setSelectedTime(time)}
                                                    className={`px-4 py-2 lg:px-5 lg:py-3 rounded-full mr-3 mb-2 ${selectedTime === time ? 'bg-primary' : 'bg-[#F5F7FB]'
                                                        }`}
                                                >
                                                    <Text
                                                        className={`${selectedTime === time
                                                                ? 'text-white lg:text-lg'
                                                                : 'text-black lg:text-lg'
                                                            }`}
                                                    >
                                                        {time}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </>
                                )}

                                {eveningSlots.length > 0 && (
                                    <>
                                        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">
                                            Evening Slot
                                        </Text>
                                                <View className="flex-row flex-wrap mb-2 px-4 justify-between">
                                            {eveningSlots.map(time => (
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    key={time + '-e'}
                                                    onPress={() => setSelectedTime(time)}
                                                    className={`px-4 py-2 lg:px-5 lg:py-3 rounded-full mr-2 mb-2 ${selectedTime === time ? 'bg-primary' : 'bg-[#F5F7FB]'
                                                        }`}
                                                >
                                                    <Text
                                                        className={`${selectedTime === time ? 'text-white' : 'text-black'
                                                            }`}
                                                    >
                                                        {time}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </>
                                )}
                            </>
                        )}

                      

                        {selectedTime && (
                            <Text className="text-lg font-semibold text-green-700 mt-4">Selected Time: {selectedTime}</Text>
                        )}
                    </View>
                </ScrollView>

                <View className="w-full my-2 rounded-lg py-3 flex items-center  bg-white">
                    <CustomButton
                        label="Make Appointment"
                        onPress={() => {
                            if (!selectedTime) {
                                Alert.alert('Please select a time');
                                return;
                            }
                            appointmentSheetRef.current?.expand(); // <-- OPEN NEW BOTTOM SHEET
                        }}
                    />

                </View>

                {openCalendar && (
                    <View className="absolute inset-0 justify-center items-center">
                        {/* Slight backdrop */}
                        <View className="absolute inset-0 bg-black/20" />

                        {/* Calendar card */}
                        <View className="bg-white p-5 rounded-lg shadow-md z-10 w-10/12 max-w-md">
                            <Calendar
                                onDayPress={(day) => {
                                    onSelectDate(day.dateString);
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

                            <TouchableOpacity
                                onPress={() => setOpenCalendar(false)}
                                className="mt-4 bg-secondary px-5 py-2 rounded-lg"
                            >
                                <Text className="text-white text-center font-medium">Close</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                )}

                <BottomSheet
                    ref={appointmentSheetRef}
                    snapPoints={['28%']}
                    index={-1}
                    enablePanDownToClose
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            appearsOnIndex={0}
                            disappearsOnIndex={-1}
                            pressBehavior="close"
                        />
                    )}
                >
                    <BottomSheetView style={{ padding: 20 }}>
                        <Text className="text-xl font-semibold mb-5 text-gray-900">
                            Select Appointment Type
                        </Text>

                        {/* On Spot Appointment */}
                       <View>

                            <TouchableOpacity
                                className="py-4 border-b border-gray-200"
                                onPress={() => {
                                    appointmentSheetRef.current?.close();
                                    Alert.alert("On Spot Appointment Selected");
                                    // TODO: API call for appointment
                                }}
                            >
                                <View className='flex flex-row items-center gap-2 px-2'>
                                    <Image source={Icons.rupeeIcon} className="w-6 h-6" />
                                    <Text className="text-base font-semibold">
                                        Pay at Clinic
                                    </Text>
                                    
                                </View>
                            </TouchableOpacity>
                       </View>

                        {/* Online Appointment */}
                        <TouchableOpacity
                        activeOpacity={.90}
                            className="py-4"
                            onPress={() => {
                                appointmentSheetRef.current?.close();
                                Alert.alert("Online Appointment Selected (Discount Applied)");
                                // TODO: API call for appointment
                            }}
                        >

                            <View className='flex flex-row items-center gap-2 px-2'>
                                <Image tintColor={"#43A047"} source={Icons.credit} className="w-6 h-6" />
                                <Text className="text-base text-green-600 font-semibold">
                                    Pay Online (10% Discount)
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheet>



            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MakeAppointment;
