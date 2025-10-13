import { Image, Text, View } from 'react-native';
import React from 'react';

const FamilyCard = ({ name, relation, avatar }) => {
  return (
    <View className="flex-row items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <Image
        className="w-16 h-16 rounded-full bg-gray-200"
        resizeMode="cover"
        source={avatar}
      />
      <View className="ml-4 flex-1">
        <Text className="text-base font-bold text-gray-900">{name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{relation}</Text>
      </View>
    </View>
  );
};

export default FamilyCard;