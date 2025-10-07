import { View, Text, Image } from 'react-native';
import React from 'react';
import Icons from '../utils/libs/constants/Icons';
import Images from '../utils/libs/constants/Images';

const DoctorExperienceCard = () => {
    const experienceData = [
        { id: 1, icon: Icons.promotion, years: 5, label: 'Years of work' },
        { id: 2, icon: Icons.consultation, years: 7, label: 'Number of patients' },
        { id: 3, icon: Icons.promotion, years: 3.3, label: 'Something else' },
    ];

    return (
        <View>
            <View className="flex-row items-center gap-4 mt-6 rounded-2xl shadow-sm bg-white">
                <Image className="w-28 lg:w-36 lg:h-36 h-28 rounded-lg" source={Images.d2} />
                <View className="flex-1">
                    <Text className="font-bold text-xl text-gray-900 md:text-2xl">Mariyam</Text>
                    <Text className="text-base text-gray-600 lg:text-lg">
                        <Text className="text-black font-medium">Surgeon</Text> at DHQ Hospital
                    </Text>
                    <Text className="text-base text-gray-700 mt-1 lg:text-lg">Associate Professor</Text>
                    <Text className="text-sm text-gray-600 mt-1 lg:text-lg">MBBS, FCPS</Text>
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