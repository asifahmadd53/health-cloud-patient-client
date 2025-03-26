import { Dimensions, Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';

interface SheduleCardProp {
  name: string; 
  image: { uri: string }; 
  speciality: string;  
  time: string | number;
}

const {width, height} = Dimensions.get('window')

const isTablet = width > 768


const SheduleCard= ({ name, image, speciality, time }:SheduleCardProp) => {
  return (
    <View className="bg-secondary rounded-3xl p-4 relative">
      <View className="flex-row items-center gap-4">
        <Avatar.Image
          size={isTablet ? 70 : 60} 
          style={{ backgroundColor: '#2C415C' }} 
          source={image}  
        />
        <View className="flex-1">
          <Text className="text-lg text-white font-semibold lg:text-2xl">Dr. {name}</Text>
          <Text className="text-sm text-gray-300 lg:text-xl">{speciality}</Text>
        </View>
      </View>

      {/* Schedule Info */}
      <View className="bg-black/35 backdrop-blur-md rounded-xl h-12 lg:h-[4.3rem] flex items-center justify-center w-[85%] mx-auto mt-4 lg:w-[70%]">
        <Text className="text-white text-base text-center lg:text-xl">{time}</Text>
      </View>
    </View>
  );
};

export default SheduleCard;
