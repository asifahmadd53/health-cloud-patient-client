import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header';
import DoctorExperienceCard from '../../components/DoctorExperienceCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDoctorById } from '../../services/doctorsServices';


const DrProfile = () => {
  const route = useRoute();
  const { id }:any = route.params;
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation:any = useNavigation()
  const [schedule, setSchedule] = useState<any>(null);
  type RootStackParamList = { DrProfile: { id: string } };
  // const route = useRoute<RouteProp<RootStackParamList, 'DrProfile'>>();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorById(id);
        setDoctor({ ...res.data.doctor, ...res.data.doctor.doctor });
        setSchedule(res.data.doctor?.schedule?.weeklySchedule || []);
      } catch (err:any) {
        console.log("Doctor fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);
  if (!id) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-700 text-lg">No doctor selected.</Text>
      </SafeAreaView>
    );
  }
  
  

  return (
    <SafeAreaView className=" bg-white flex-1 lg:px-10">
      <Header title="Doctor Profile" />

      {loading ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <ActivityIndicator size="large" color="#2C415C" />
          <Text className="text-gray-700 mt-3">Loading doctor details...</Text>
        </ScrollView>
      ) : (
        <>
        <ScrollView
        className="px-5 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}>

        <DoctorExperienceCard doctor={doctor} />

        <View className="py-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4 lg:text-xl">
            About Me
          </Text>
          <Text className="text-gray-700 text-base leading-relaxed lg:text-lg">
            {doctor?.professionalBio ||
              'No description available for this doctor at the moment.'}
          </Text>

          <View className="py-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4 lg:text-xl">
              Working Slots
            </Text>
            <View className="border-b border-gray-200 mb-3" />

                  {schedule.length ? (
                    schedule.map((dayItem: any) => {
                      const formatTime = (time: string) => {
                        if (!time) return '';
                        const [hour, minute] = time.split(':').map(Number);
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                        return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
                      };

                      return (
                        <View key={dayItem.day} className="flex-row justify-between items-center py-2">
                          <Text className="text-gray-800 font-medium w-24">{dayItem.day}</Text>
                          <Text className="text-gray-800 px-2">
                            {dayItem.isWorking
                              ? `${formatTime(dayItem.startTime)} - ${formatTime(dayItem.endTime)}`
                              : 'Closed'}
                          </Text>
                        </View>
                      );
                    })
                  ) : (
                    <Text className="text-gray-700">No schedule available for this doctor.</Text>
                  )}

          </View>
        </View>

        
      </ScrollView>
          </>
      )}

      <View className="my-2 rounded-lg py-2 flex items-center z-50">
        <CustomButton label="Make Appointment" onPress={()=>{
          navigation.navigate('MakeAppointment' , {doctor});
        }} />
      </View>
    </SafeAreaView>
  );
};

export default DrProfile;
