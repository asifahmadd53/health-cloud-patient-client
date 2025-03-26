import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Images from '../../utils/libs/constants/Images';
import Icons from '../../utils/libs/constants/Icons';
import FamilyCard from '../../components/FamilyCard';


const { height } = Dimensions.get('window');

const MyFamily = () => {
  const navigation = useNavigation();
  
  // Sample Data (Replace with actual family data)
  const familyMembers = [
    { id: 1, name: 'Mariyam', relation: 'Sister', avatar: Images.womanAvatar },
    { id: 2, name: 'Rumaisa', relation: 'Sister', avatar: Images.womanAvatar },
    { id: 3, name: 'Ahmed Raza', relation: 'Brother', avatar: Images.manAvatar },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white px-5">

      {/* Header Section */}
      <View className="flex-row items-center justify-between mt-6 py-3">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          className="w-12 h-12 items-center justify-center bg-gray-200 rounded-full"
        >
          <Image className="w-6 h-6" source={Icons.leftIcon} />
        </TouchableOpacity>

        <Text className="text-xl font-bold tracking-wide text-gray-900 text-center flex-1">
          My Family
        </Text>
      </View>

      {/* User Info Section */}
      <View className="items-center my-4">
        <View className=" p-2 rounded-full border-2 border-gray-300">
          <Image className="w-28 h-28 rounded-full bg-primary" resizeMode="contain" source={Images.manAvatar} />
        </View>
        <Text className="text-lg font-semibold text-gray-900 mt-2">Muhammad Asif (Me)</Text>
      </View>

      {/* Family List Section */}
      <FlatList
        style={{ maxHeight: height * 0.50 }}
        data={familyMembers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FamilyCard name={item.name} relation={item.relation} avatar={item.avatar} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <View className='items-center flex-row justify-center gap-1'>
      <Image className='w-5 h-5 underline' source={Icons.add_user}/> 
      <Text onPress={()=> navigation.navigate('AddFamilyLayout')} className='underline'>Add more Family Profiles</Text>
      </View>
        

    </SafeAreaView>
  );
};

export default MyFamily;
