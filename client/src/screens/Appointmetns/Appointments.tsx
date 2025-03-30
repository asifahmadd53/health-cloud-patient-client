import {
    Dimensions, Pressable, TouchableOpacity, View, Text
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import Animated, {
    useSharedValue, useAnimatedStyle, withSpring, withTiming, delay
} from 'react-native-reanimated';
import Icons from '../../utils/libs/constants/Icons';
import AppointmentCard from '../../components/AppointmentCard';

const Appointments = () => {
    const navigation = useNavigation();
    const { height } = Dimensions.get('window');

    // State to track selected tab
    const [selectedTab, setSelectedTab] = useState('Upcoming');

    // Shared values for animation
    const translateY = useSharedValue(30); // Start off-screen (bottom)
    const opacity = useSharedValue(0); // Start invisible
    const scale = useSharedValue(0.9); // Slightly scaled down

    // Data for upcoming & recent appointments
    const UPCOMING_DATA = [1, 2, 3, 4, 5];
    const RECENT_DATA = [6, 7, 8, 9, 10];

    // Function to switch tabs with animation
    const switchTab = (tab) => {
        if (tab !== selectedTab) {
            opacity.value = withTiming(0, { duration: 150 }); // Fade out first

            setTimeout(() => {
                setSelectedTab(tab);
                translateY.value = 30; // Reset position to bottom
                scale.value = 0.9; // Reset scale
                opacity.value = 0; // Reset opacity

                opacity.value = withTiming(1, { duration: 500 }); // Fade in
                translateY.value = withSpring(0, { damping: 14, stiffness: 90 }); // Smooth bounce-up
                scale.value = withSpring(1, { damping: 12, stiffness: 90 }); // Scale to normal
            }, 150);
        }
    };

    // Animated style for cards (staggered effect)
    const animatedCardStyle = (index) =>
        useAnimatedStyle(() => ({
            opacity: withTiming(opacity.value, { duration: 500, delay: index * 100 }),
            transform: [
                { translateY: withSpring(translateY.value - index * 5, { damping: 12 }) },
                { scale: scale.value }
            ]
        }));
        useEffect(() => {
            // Animate the initial load
            opacity.value = withTiming(1, { duration: 500 });
            translateY.value = withSpring(0, { damping: 14, stiffness: 90 });
            scale.value = withSpring(1, { damping: 12, stiffness: 90 });
        }, []);

    return (
        <SafeAreaView className='px-3 bg-white'>
            {/* Header */}
             <View className="flex-row items-center justify-between mt-6 py-3 lg:px-10">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => navigation.goBack()}
                      className="w-12 h-12 lg:w-14 lg:h-14 items-center justify-center bg-gray-200 rounded-full"
                    >
                      <Image className="w-6 h-6 lg:w-9 lg:h-9" source={Icons.leftIcon} />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold tracking-wide text-gray-900 text-center flex-1 lg:text-2xl">
                      Upcoming Appointments
                    </Text>
                  </View>

            {/* Tab Buttons */}
            <View className="flex-row items-center justify-evenly lg:w-4/5 lg:mx-auto">
                <Pressable
                    onPress={() => switchTab('Upcoming')}
                    className={`min-w-52 lg:min-w-64 py-5 lg:py-7 rounded-xl shadow-lg backdrop-blur-2xl 
                        ${selectedTab === 'Upcoming' ? 'bg-secondary shadow-secondary bg-opacity-80' : 'bg-white shadow-gray-500'}`}
                >
                    <Text className={`text-lg font-semibold text-center lg:text-xl 
                        ${selectedTab === 'Upcoming' ? 'text-white' : 'text-black'}`}>
                        Upcoming
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => switchTab('Recent')}
                    className={`min-w-52 lg:min-w-64 py-5 lg:py-7 rounded-xl shadow-lg backdrop-blur-2xl 
                        ${selectedTab === 'Recent' ? 'bg-secondary shadow-secondary bg-opacity-80' : 'bg-white shadow-gray-500'}`}
                >
                    <Text className={`text-lg font-semibold text-center lg:text-xl
                        ${selectedTab === 'Recent' ? 'text-white' : 'text-black'}`}>
                        Recent
                    </Text>
                </Pressable>
            </View>

            {/* Animated List */}
            <View className='lg:px-14 lg:mt-4' style={{ marginTop: 25 }}>
                {(selectedTab === 'Upcoming' ? UPCOMING_DATA : RECENT_DATA).map((item, index) => (
                    <Animated.View key={item} style={animatedCardStyle(index)}>
                        <AppointmentCard />
                    </Animated.View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default Appointments;
