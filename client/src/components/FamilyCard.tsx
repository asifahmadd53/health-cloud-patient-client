import { Image, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../utils/libs/constants/Images';

const FamilyCard = ({ name, relation, avatar }) => {
  return (
    <SafeAreaView className="px-1">
      <View className="flex-row items-center bg-white border border-gray-300 rounded-xl shadow-md shadow-gray-400 p-4 mb-3">

        {/* Avatar Section */}
        <View className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100">
          <Image className="w-full h-full" resizeMode="contain" source={avatar || Images.manAvatar} />
        </View>

        {/* Information Section */}
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-gray-900">{name}</Text>
          <Text className="text-sm text-gray-500 font-medium">({relation})</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FamilyCard;
