import { View, Text, Image } from 'react-native';
import React from 'react';
import Icons from '../utils/constants/Icons';
import Images from '../utils/constants/Images';

const DoctorExperienceCard = ({ doctor }: any) => {
    // Example fallback experience data
    const experienceData = [
        { id: 1, icon: Icons.promotion, years: doctor?.years || 0, label: 'Years of work' },
        { id: 2, icon: Icons.consultation, years: doctor?.schedule?.weeklySchedule?.[0]?.patientPerHour || 0, label: 'Patients per Hour' },
        { id: 3, icon: Icons.promotion, years: doctor?.rating || 4.8, label: 'Rating' },
    ];

    return (
        <View>
            <View className="flex-row items-center gap-4 rounded-2xl shadow-sm bg-white p-3">
                <Image
                    className="w-28 lg:w-36 lg:h-36 h-28 rounded-lg"
                    source={
                        doctor?.doctor?.profileImage
                            ? { uri: doctor.doctor.profileImage }
                            : Images.d2
                    }
                />
                <View className="flex-1">
                    <Text className="font-bold text-xl text-gray-900 md:text-2xl">
                        {doctor?.doctor?.name || 'Unknown Doctor'}
                    </Text>

                    <Text numberOfLines={2} className="text-base text-gray-600 lg:text-lg">
                        <Text className="text-black font-medium text-sm">
                            {doctor?.specialty?.[0] || 'Specialist'}
                        </Text>
                    </Text>

                    <Text className="text-base text-gray-700 lg:text-lg">
                        {doctor?.designation || '—'}
                    </Text>

                    <Text className="text-sm text-gray-600 lg:text-lg">
                        {doctor?.certifications || 'MBBS'}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between lg:justify-around lg:mt-6 pt-4 px-3">
                {experienceData.map(item => (
                    <View key={item.id} className="items-center">
                        <View className="flex-row items-center gap-2">
                            <Image className="w-8 lg:w-12 lg:h-12 h-8" source={item.icon} />
                            <Text className="font-bold text-xl text-gray-900">{item.years}</Text>
                        </View>
                        <Text className="text-gray-500 text-sm text-center mt-1">{item.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default DoctorExperienceCard;
