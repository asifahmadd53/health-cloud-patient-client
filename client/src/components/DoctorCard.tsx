import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Images from '../utils/libs/constants/Images';
import Icons from '../utils/libs/constants/Icons';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window'); 

const isTablet  =  width > 768

const DoctorCard = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={1} onPress={() =>navigation.navigate('DrProfileRoutes')
        }
>
            <View className="flex-row items-center bg-white border border-slate-300 shadow-md rounded-2xl p-5 mb-4 shadow-slate-400">
            {/* Doctor Image */}
            <Image 
                className="rounded-full border border-gray-200"
                style={{width: isTablet ? 80 : 60, height: isTablet ? 80 : 60 }}
                source={Images.d3} 
            />

            {/* Doctor Details */}
            <View className="flex-1 ml-4">
                <Text className="text-lg font-extrabold text-gray-900 lg:text-xl">Dr. Ali</Text>
                <Text className="text-sm font-medium text-gray-600 lg:text-lg">
                    MBBS, Dermatologist Specialist
                </Text>
                
                {/* Rating & Location Section */}
                <View className="flex-row justify-between items-end ">
                <Text className="text-sm font-medium text-green-700 lg:text-lg mt-1">
                        Fee: $50 per session
                    </Text>
                    
                    <View className="flex-row items-center gap-1">
                        <Image 
                            className="w-5 lg:w-8 h-5 lg:h-8 opacity-80" 
                            source={Icons.location} 
                        />
                        <Text className="text-sm font-semibold text-gray-700 lg:text-lg">Lahore</Text>
                    </View>
                </View>
            </View>

        </View>
        </TouchableOpacity>
    );
};

export default DoctorCard;
