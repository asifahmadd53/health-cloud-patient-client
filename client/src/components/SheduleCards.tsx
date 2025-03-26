import { Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';

interface ScheduleCardsProp {
    name: string;
    image: { uri: string };
    speciality: string;
    time: string | number;
}

const ScheduleCards: React.FC<ScheduleCardsProp> = ({ name, image, speciality, time }) => {
    return (
        <View className="bg-white rounded-2xl border border-slate-300 shadow-lg p-5 mb-4 shadow-slate-500">

            {/* Doctor Info */}
            <View className="flex-row items-center gap-4">
                <Avatar.Image
                    size={60}
                    style={{ backgroundColor: '#2C415C' }}
                    source={image}
                    accessibilityLabel={`Doctor ${name}'s avatar`}
                />
                <View className="flex-1">
                    <Text className="text-lg text-black font-semibold">Dr. {name}</Text>
                    <Text className="text-sm text-gray-800">{speciality}</Text>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: 'rgba(40, 149, 203, 0.80)',
                }}
                className="backdrop-blur-md rounded-xl h-12 flex items-center justify-center w-[85%] mx-auto mt-4"
            >
                <Text className="text-white text-base text-center font-medium">{time}</Text>
            </View>
        </View>
    );
};

export default ScheduleCards;
