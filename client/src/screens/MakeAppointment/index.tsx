import React, { useEffect, useRef, useState } from 'react';
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
import { getDoctorAvailableSlots, makeAppointment } from '../../services/patientServices';

const getNextNDates = (n = 7) =>
    Array.from({ length: n }).map((_, i) =>
        moment().add(i, "day").format("YYYY-MM-DD")
    );

const MakeAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(getNextNDates(7)[0]);
    const [slots, setSlots] = useState<{ _id: string; slotTime: string }[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<{ _id: string; slotTime: string } | null>(null);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [slotsLoading, setSlotsLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const route = useRoute();
    const doctor = route.params?.doctor;
    const appointmentSheetRef = useRef<BottomSheet>(null);

    const morningSlots = slots.filter(
        (slot) => moment(slot.slotTime.split(' - ')[0], "hh:mm A").hour() < 12
    );
    const eveningSlots = slots.filter(
        (slot) => moment(slot.slotTime.split(' - ')[0], "hh:mm A").hour() >= 12
    );

    const onSelectDate = (dateStr: any) => {
        setSelectedDate(dateStr);
        setSelectedSlot(null);
    };

    const datesList = getNextNDates(7);

    useEffect(() => {
        if (!doctor?._id) return;

        const fetchSlots = async () => {
            try {
                setSlotsLoading(true);
                setSelectedSlot(null);

                const res = await getDoctorAvailableSlots(
                    doctor._id,
                    selectedDate
                );

                if (res.success) {
                    setSlots(res.slots || []);
                } else {
                    setSlots([]);
                }
            } catch (error) {
                console.log('Slot fetch error:', error);
                setSlots([]);
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchSlots();
    }, [selectedDate, doctor?._id]);

    const bookAppointment = async (
        paymentType: 'onSpot' | 'online',
        selectedSlot: any,
        doctor: any,
        selectedDate: string
    ) => {
        if (!selectedSlot) {
            Alert.alert("Error", "Please select a slot");
            return;
        }

        if (bookingLoading) return;

        try {
            setBookingLoading(true);

            // Prepare payload matching backend expectations
            const payload = {
                doctorProfileId: doctor.doctorProfileId,
                day: moment(selectedDate).format('dddd'),
                date: selectedDate,
                slotTime: selectedSlot.slotTime,
                clinicScheduleSlotId: selectedSlot._id,
                paymentStatus: paymentType === 'online' ? 'paid' : 'pending',
            };


            console.log('Booking payload:', payload);

            const res = await makeAppointment(payload);

            if (res.success) {
                Alert.alert(
                    "Success",
                    "Appointment booked successfully!",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                // Refresh slots after booking
                                const fetchSlots = async () => {
                                    try {
                                        const slotsRes = await getDoctorAvailableSlots(
                                            doctor._id,
                                            selectedDate
                                        );
                                        if (slotsRes.success) {
                                            setSlots(slotsRes.slots || []);
                                        }
                                    } catch (error) {
                                        console.log('Refresh slots error:', error);
                                    }
                                };
                                fetchSlots();
                                setSelectedSlot(null);
                            }
                        }
                    ]
                );
            } else {
                Alert.alert("Error", res.message || "Something went wrong while booking appointment");
            }
        } catch (err: any) {
            console.log('Booking error:', err);
            const errorMsg = err.response?.data?.message || err.message || "Error booking appointment";
            Alert.alert("Error", errorMsg);
        } finally {
            setBookingLoading(false);
        }
    };

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
                                        className={`w-14 self-start py-6 lg:py-8 flex-col-reverse rounded-full mx-2 gap-2 ${isSelected ? 'bg-primary' : 'bg-[#F5F7FB]'}`}
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

                        {/* Slots */}
                        {slotsLoading ? (
                            <View className="flex-1 justify-center items-center py-14">
                                <ActivityIndicator size="large" color="#2C415C" />
                            </View>
                        ) : slots.length === 0 ? (
                            <Text className="text-sm text-red-600 mt-4">
                                Doctor is not available on this day.
                            </Text>
                        ) : (
                            <>
                                {morningSlots.length > 0 && (
                                    <>
                                        <Text className="text-lg font-semibold text-gray-900 my-4 lg:text-xl">
                                            Morning Slot
                                        </Text>
                                        <View className="flex-row flex-wrap mb-2 px-2">
                                            {morningSlots.map(slot => (
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    key={slot._id}
                                                    onPress={() => setSelectedSlot(slot)}
                                                    className={`px-4 py-2 lg:px-5 lg:py-3 rounded-full mr-2 mb-2 ${selectedSlot?._id === slot._id ? 'bg-primary' : 'bg-[#F5F7FB]'}`}
                                                >
                                                    <Text className={`text-sm ${selectedSlot?._id === slot._id ? 'text-white' : 'text-black'}`}>
                                                        {slot.slotTime}
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
                                        <View className="flex-row flex-wrap mb-2 px-2">
                                            {eveningSlots.map(slot => (
                                                <TouchableOpacity
                                                    activeOpacity={0.9}
                                                    key={slot._id}
                                                    onPress={() => setSelectedSlot(slot)}
                                                    className={`px-4 py-2 lg:px-5 lg:py-3 rounded-full mr-2 mb-2 ${selectedSlot?._id === slot._id ? 'bg-primary' : 'bg-[#F5F7FB]'}`}
                                                >
                                                    <Text className={`text-sm ${selectedSlot?._id === slot._id ? 'text-white' : 'text-black'}`}>
                                                        {slot.slotTime}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </>
                                )}
                            </>
                        )}
                        {selectedSlot && (
                            <Text className="text-lg font-semibold text-green-700 mt-4">
                                Selected Time: {selectedSlot.slotTime}
                            </Text>
                        )}
                    </View>
                </ScrollView>

                <View className="w-full my-2 rounded-lg py-3 flex items-center bg-white">
                    <CustomButton
                        label={bookingLoading ? "Booking..." : "Make Appointment"}
                        onPress={() => {
                            if (!selectedSlot) {
                                Alert.alert('Error', 'Please select a time slot');
                                return;
                            }
                            appointmentSheetRef.current?.expand();
                        }}
                        disabled={bookingLoading}
                    />
                </View>

                {openCalendar && (
                    <View className="absolute inset-0 justify-center items-center">
                        <View className="absolute inset-0 bg-black/20" />
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

                        <TouchableOpacity
                            className="py-4 border-b border-gray-200"
                            onPress={() => {
                                appointmentSheetRef.current?.close();
                                bookAppointment("onSpot", selectedSlot, doctor, selectedDate);
                            }}
                            disabled={bookingLoading}
                        >
                            <View className='flex flex-row items-center gap-2 px-2'>
                                <Image source={Icons.rupeeIcon} className="w-6 h-6" />
                                <Text className="text-base font-semibold">
                                    Pay at Clinic
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.90}
                            className="py-4"
                            onPress={() => {
                                appointmentSheetRef.current?.close();
                                bookAppointment("online", selectedSlot, doctor, selectedDate);
                            }}
                            disabled={bookingLoading}
                        >
                            <View className='flex flex-row items-center gap-2 px-2'>
                                <Image tintColor={"#43A047"} source={Icons.credit} className="w-6 h-6" />
                                <Text className="text-base text-green-600 font-semibold">
                                    Pay Online (10% Discount)
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {bookingLoading && (
                            <View className="mt-4">
                                <ActivityIndicator size="small" color="#2C415C" />
                            </View>
                        )}
                    </BottomSheetView>
                </BottomSheet>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MakeAppointment;